export type ArchiveFacet = {
  label: string
  value: string
}

export type ArchiveArticle = {
  author: ArchiveFacet
  category: ArchiveFacet
  excerpt: string
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
  page?: string
  series?: string
  sort?: string
  tag?: string
}

export type ArchiveFilters = {
  author: string
  category: string
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
  articles: ArchiveArticle[]
  filters: ArchiveFilters
  options: {
    authors: ArchiveFacet[]
    categories: ArchiveFacet[]
    series: ArchiveFacet[]
    sortOptions: Array<{ label: string; value: ArchiveSort }>
    tags: ArchiveFacet[]
  }
  pagination: ArchivePagination
  totalFilteredArticles: number
}

const PAGE_SIZE = 4

const archiveArticles: ArchiveArticle[] = [
  {
    author: { label: 'Editorial Team', value: 'editorial-team' },
    category: { label: 'Pastoral Theology', value: 'pastoral-theology' },
    excerpt: 'How shepherding, doctrine, and presence shape healthy church life.',
    publishedAt: '2026-06-14',
    readingMinutes: 8,
    series: { label: 'Foundations', value: 'foundations' },
    slug: 'scripture-shapes-christian-growth',
    tags: [
      { label: 'Scripture', value: 'scripture' },
      { label: 'Discipleship', value: 'discipleship' },
    ],
    title: 'Why Scripture must shape every part of Christian growth',
  },
  {
    author: { label: 'Editorial Team', value: 'editorial-team' },
    category: { label: 'Christian Life', value: 'christian-life' },
    excerpt: 'A grounded pattern for prayer, Scripture, and habits that last.',
    publishedAt: '2026-06-10',
    readingMinutes: 6,
    series: { label: 'Daily Rhythm', value: 'daily-rhythm' },
    slug: 'daily-rhythm-for-spiritual-growth',
    tags: [
      { label: 'Prayer', value: 'prayer' },
      { label: 'Habits', value: 'habits' },
    ],
    title: 'A daily rhythm for spiritual growth',
  },
  {
    author: { label: 'Guest Contributor', value: 'guest-contributor' },
    category: { label: 'Marriage', value: 'marriage' },
    excerpt: 'What covenant love looks like when the week is busy and the heart is tired.',
    publishedAt: '2026-06-08',
    readingMinutes: 10,
    series: { label: 'Home and Covenant', value: 'home-and-covenant' },
    slug: 'marriage-family-and-patient-love',
    tags: [
      { label: 'Marriage', value: 'marriage' },
      { label: 'Family', value: 'family' },
    ],
    title: 'Marriage, family, and patient love',
  },
  {
    author: { label: 'Pastoral Desk', value: 'pastoral-desk' },
    category: { label: 'Ethics', value: 'ethics' },
    excerpt: 'When Christian conviction meets work, speech, and public life.',
    publishedAt: '2026-06-06',
    readingMinutes: 7,
    series: { label: 'Living Before God', value: 'living-before-god' },
    slug: 'ethics-in-everyday-decisions',
    tags: [
      { label: 'Ethics', value: 'ethics' },
      { label: 'Work', value: 'work' },
    ],
    title: 'Ethics in everyday decisions',
  },
  {
    author: { label: 'Editorial Team', value: 'editorial-team' },
    category: { label: 'Christian Life', value: 'christian-life' },
    excerpt: 'What to do when you know the passage but still feel stuck.',
    publishedAt: '2026-06-03',
    readingMinutes: 9,
    series: { label: 'Foundations', value: 'foundations' },
    slug: 'how-to-read-the-bible-when-stuck',
    tags: [
      { label: 'Scripture', value: 'scripture' },
      { label: 'Study', value: 'study' },
    ],
    title: 'How to read the Bible when you feel stuck',
  },
  {
    author: { label: 'Pastoral Desk', value: 'pastoral-desk' },
    category: { label: 'Pastoral Theology', value: 'pastoral-theology' },
    excerpt: 'Why faithful leadership depends on steadiness more than charisma.',
    publishedAt: '2026-06-01',
    readingMinutes: 11,
    series: { label: 'Shepherding the Church', value: 'shepherding-the-church' },
    slug: 'leaders-need-more-than-charisma',
    tags: [
      { label: 'Leadership', value: 'leadership' },
      { label: 'Church', value: 'church' },
    ],
    title: 'When leaders need more than charisma',
  },
  {
    author: { label: 'Guest Contributor', value: 'guest-contributor' },
    category: { label: 'Christian Life', value: 'christian-life' },
    excerpt: 'Teaching children the gospel is ordinary work that still matters deeply.',
    publishedAt: '2026-05-28',
    readingMinutes: 7,
    series: { label: 'Home and Covenant', value: 'home-and-covenant' },
    slug: 'teaching-children-the-gospel-at-home',
    tags: [
      { label: 'Family', value: 'family' },
      { label: 'Discipleship', value: 'discipleship' },
    ],
    title: 'Teaching children the gospel at home',
  },
  {
    author: { label: 'Editorial Team', value: 'editorial-team' },
    category: { label: 'Pastoral Theology', value: 'pastoral-theology' },
    excerpt: 'A testimony to patience, repentance, and the slow work of grace.',
    publishedAt: '2026-05-24',
    readingMinutes: 12,
    series: { label: 'Foundations', value: 'foundations' },
    slug: 'the-slow-work-of-grace',
    tags: [
      { label: 'Testimony', value: 'testimony' },
      { label: 'Grace', value: 'grace' },
    ],
    title: 'A testimony to the slow work of grace',
  },
]

const sortOptions: Array<{ label: string; value: ArchiveSort }> = [
  { label: 'Latest first', value: 'latest' },
  { label: 'Oldest first', value: 'oldest' },
  { label: 'Shortest reads', value: 'reading-time' },
  { label: 'Title A to Z', value: 'title' },
]

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
    const tagMatch =
      !filters.tag || article.tags.some((tag) => normalizeValue(tag.value) === filters.tag)

    return categoryMatch && seriesMatch && authorMatch && tagMatch
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
    articles,
    filters: {
      ...filters,
      page: currentPage,
    },
    options: {
      authors: uniqueFacets(archiveArticles, (article) => article.author),
      categories: uniqueFacets(archiveArticles, (article) => article.category),
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
  if (filters.series) params.set('series', filters.series)
  if (filters.sort && filters.sort !== 'latest') params.set('sort', filters.sort)
  if (filters.tag) params.set('tag', filters.tag)
  if (filters.page && filters.page > 1) params.set('page', String(filters.page))

  const query = params.toString()
  return query ? `/articles?${query}` : '/articles'
}

