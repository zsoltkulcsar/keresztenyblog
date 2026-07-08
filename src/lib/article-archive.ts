import { editorialArticles } from '@/lib/editorial-articles'

export type ArchiveFacet = {
  label: string
  value: string
}

export type ArchiveArticle = {
  author: ArchiveFacet
  category: ArchiveFacet
  excerpt: string
  format: ArchiveFacet
  publishedAt: string
  readingMinutes: number
  series: ArchiveFacet
  slug: string
  tags: ArchiveFacet[]
  title: string
}

export type ArchiveSort = 'latest' | 'oldest' | 'reading-time' | 'title'

export type ArchiveSearchParams = {
  author?: string
  category?: string
  format?: string
  page?: string
  series?: string
  sort?: string
  tag?: string
}

export type ArchiveFilters = {
  author: string
  category: string
  format: string
  page: number
  series: string
  sort: ArchiveSort
  tag: string
}

export type ArchivePagination = {
  currentPage: number
  pageSize: number
  totalArticles: number
  totalPages: number
}

export type ArchiveContent = {
  allArticles: ArchiveArticle[]
  articles: ArchiveArticle[]
  filters: ArchiveFilters
  options: {
    authors: ArchiveFacet[]
    categories: ArchiveFacet[]
    formats: ArchiveFacet[]
    series: ArchiveFacet[]
    sortOptions: Array<{ label: string; value: ArchiveSort }>
    tags: ArchiveFacet[]
  }
  pagination: ArchivePagination
  totalFilteredArticles: number
}

const PAGE_SIZE = 4

const formatLabels = {
  devotion: 'Devotion',
  reflection: 'Reflection',
  teaching: 'Teaching',
  testimony: 'Testimony',
} as const

const archiveArticles: ArchiveArticle[] = editorialArticles.map((article) => ({
  author: toFacet(article.author),
  category: toFacet(article.category),
  excerpt: article.excerpt,
  format: {
    label: formatLabels[article.format],
    value: article.format,
  },
  publishedAt: article.publishedAt,
  readingMinutes: article.readingMinutes,
  series: article.series[0] ? toFacet(article.series[0].label, article.series[0].slug) : toFacet('Standalone'),
  slug: article.slug,
  tags: [...article.tags, ...article.topic, ...article.audience].map((tag) => toFacet(tag)),
  title: article.title,
}))

const sortOptions: Array<{ label: string; value: ArchiveSort }> = [
  { label: 'Latest first', value: 'latest' },
  { label: 'Oldest first', value: 'oldest' },
  { label: 'Shortest reads', value: 'reading-time' },
  { label: 'Title A to Z', value: 'title' },
]

function toFacet(label: string, value = label): ArchiveFacet {
  return {
    label,
    value: value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
  }
}

function normalizeValue(value: string | undefined) {
  return value?.trim().toLowerCase() ?? ''
}

function uniqueFacets(items: ArchiveArticle[], select: (article: ArchiveArticle) => ArchiveFacet | ArchiveFacet[]) {
  const map = new Map<string, ArchiveFacet>()

  for (const article of items) {
    const selected = select(article)
    const facets = Array.isArray(selected) ? selected : [selected]

    for (const facet of facets) {
      if (!map.has(facet.value)) {
        map.set(facet.value, facet)
      }
    }
  }

  return Array.from(map.values()).sort((left, right) => left.label.localeCompare(right.label))
}

function filterArticles(articles: ArchiveArticle[], filters: ArchiveFilters) {
  return articles.filter((article) => {
    const categoryMatch = !filters.category || normalizeValue(article.category.value) === filters.category
    const seriesMatch = !filters.series || normalizeValue(article.series.value) === filters.series
    const authorMatch = !filters.author || normalizeValue(article.author.value) === filters.author
    const formatMatch = !filters.format || normalizeValue(article.format.value) === filters.format
    const tagMatch =
      !filters.tag || article.tags.some((tag) => normalizeValue(tag.value) === filters.tag)

    return categoryMatch && seriesMatch && authorMatch && formatMatch && tagMatch
  })
}

function sortArticles(articles: ArchiveArticle[], sort: ArchiveSort) {
  const sorted = [...articles]

  switch (sort) {
    case 'oldest':
      return sorted.sort((left, right) => left.publishedAt.localeCompare(right.publishedAt))
    case 'reading-time':
      return sorted.sort((left, right) => {
        const byReadingTime = left.readingMinutes - right.readingMinutes
        return byReadingTime !== 0 ? byReadingTime : right.publishedAt.localeCompare(left.publishedAt)
      })
    case 'title':
      return sorted.sort((left, right) => left.title.localeCompare(right.title))
    case 'latest':
    default:
      return sorted.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
  }
}

function parsePage(page: string | undefined) {
  const parsed = Number.parseInt(page ?? '1', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function resolveSort(sort: string | undefined): ArchiveSort {
  return sortOptions.some((option) => option.value === sort) ? (sort as ArchiveSort) : 'latest'
}

export function createArchiveContent(input: ArchiveSearchParams = {}): ArchiveContent {
  const filters: ArchiveFilters = {
    author: normalizeValue(input.author),
    category: normalizeValue(input.category),
    format: normalizeValue(input.format),
    page: parsePage(input.page),
    series: normalizeValue(input.series),
    sort: resolveSort(input.sort),
    tag: normalizeValue(input.tag),
  }

  const filtered = filterArticles(archiveArticles, filters)
  const sorted = sortArticles(filtered, filters.sort)
  const totalArticles = sorted.length
  const totalPages = Math.max(1, Math.ceil(totalArticles / PAGE_SIZE))
  const currentPage = Math.min(filters.page, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const articles = totalArticles > 0 ? sorted.slice(start, start + PAGE_SIZE) : []

  return {
    allArticles: sorted,
    articles,
    filters: {
      ...filters,
      page: currentPage,
    },
    options: {
      authors: uniqueFacets(archiveArticles, (article) => article.author),
      categories: uniqueFacets(archiveArticles, (article) => article.category),
      formats: uniqueFacets(archiveArticles, (article) => article.format),
      series: uniqueFacets(archiveArticles, (article) => article.series),
      sortOptions,
      tags: uniqueFacets(archiveArticles, (article) => article.tags),
    },
    pagination: {
      currentPage,
      pageSize: PAGE_SIZE,
      totalArticles,
      totalPages,
    },
    totalFilteredArticles: totalArticles,
  }
}

export function buildArchiveUrl(filters: Partial<ArchiveFilters> = {}) {
  const params = new URLSearchParams()

  if (filters.author) params.set('author', filters.author)
  if (filters.category) params.set('category', filters.category)
  if (filters.format) params.set('format', filters.format)
  if (filters.series) params.set('series', filters.series)
  if (filters.sort && filters.sort !== 'latest') params.set('sort', filters.sort)
  if (filters.tag) params.set('tag', filters.tag)
  if (filters.page && filters.page > 1) params.set('page', String(filters.page))

  const query = params.toString()
  return query ? `/articles?${query}` : '/articles'
}
