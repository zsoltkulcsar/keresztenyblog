import type { ArchiveArticle, ArchiveFacet } from '@/lib/article-archive'
import { loadArchiveContent } from '@/lib/article-archive'
import type { ResourceItem } from '@/lib/resources'
import { loadResourceItems } from '@/lib/resources'
import type { SeriesItem } from '@/lib/series'
import { loadSeries } from '@/lib/series'

export type TaxonomyKind = 'audience' | 'topic'

export type TaxonomySummary = ArchiveFacet & {
  articleCount: number
  resourceCount: number
  seriesCount: number
}

export type TaxonomyDetail = TaxonomySummary & {
  articles: ArchiveArticle[]
  resources: ResourceItem[]
  series: SeriesItem[]
}

function slugifyLabel(label: string) {
  return label
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const audienceAliases: Record<string, ArchiveFacet> = {
  'all-believers': { label: 'All believers', value: 'all-believers' },
  families: { label: 'Families', value: 'families' },
  'growing-believer': { label: 'Growing believers', value: 'growing-believers' },
  'growing-believers': { label: 'Growing believers', value: 'growing-believers' },
  leader: { label: 'Leaders', value: 'leaders' },
  leaders: { label: 'Leaders', value: 'leaders' },
  'mature-believer': { label: 'Mature believers', value: 'mature-believers' },
  'mature-believers': { label: 'Mature believers', value: 'mature-believers' },
  'new-believer': { label: 'New believers', value: 'new-believers' },
  'new-believers': { label: 'New believers', value: 'new-believers' },
}

function normalizeFacet(kind: TaxonomyKind, facet: ArchiveFacet): ArchiveFacet {
  if (kind !== 'audience') return facet

  return audienceAliases[facet.value] ?? facet
}

function toFacet(kind: TaxonomyKind, label: string): ArchiveFacet {
  const facet = {
    label,
    value: slugifyLabel(label),
  }

  return normalizeFacet(kind, facet)
}

function toComparableSlug(kind: TaxonomyKind, value: string) {
  return toFacet(kind, value).value
}

function topicFacetFromArticle(kind: TaxonomyKind, facet: ArchiveFacet) {
  return normalizeFacet(kind, facet)
}

function taxonomyLabel(kind: TaxonomyKind, value: string) {
  const facet = toFacet(kind, value)

  return {
    label: facet.label,
    value: facet.value,
  }
}

function seriesMatches(kind: TaxonomyKind, item: SeriesItem, slug: string) {
  return kind === 'topic'
    ? toComparableSlug(kind, item.topic) === slug
    : toComparableSlug(kind, item.audience) === slug
}

function resourceMatches(kind: TaxonomyKind, item: ResourceItem, slug: string) {
  const value = kind === 'topic' ? item.topic : item.audience
  return value ? toComparableSlug(kind, value) === slug : false
}

function articleFacets(kind: TaxonomyKind, article: ArchiveArticle) {
  const facets = kind === 'topic' ? article.topics : article.audiences
  return facets.map((facet) => topicFacetFromArticle(kind, facet))
}

function addSummary(map: Map<string, TaxonomySummary>, facet: ArchiveFacet) {
  const existing = map.get(facet.value)
  if (existing) return existing

  const summary = {
    ...facet,
    articleCount: 0,
    resourceCount: 0,
    seriesCount: 0,
  }

  map.set(facet.value, summary)
  return summary
}

function buildSummaries(
  kind: TaxonomyKind,
  articles: ArchiveArticle[],
  series: SeriesItem[],
  resources: ResourceItem[],
) {
  const map = new Map<string, TaxonomySummary>()

  for (const article of articles) {
    for (const facet of articleFacets(kind, article)) {
      addSummary(map, facet).articleCount += 1
    }
  }

  for (const item of series) {
    const facet =
      kind === 'topic' ? taxonomyLabel(kind, item.topic) : taxonomyLabel(kind, item.audience)
    addSummary(map, facet).seriesCount += 1
  }

  for (const resource of resources) {
    const value = kind === 'topic' ? resource.topic : resource.audience
    if (!value) continue

    addSummary(map, toFacet(kind, value)).resourceCount += 1
  }

  return Array.from(map.values()).sort((left, right) => {
    const byTotal =
      right.articleCount +
      right.seriesCount +
      right.resourceCount -
      (left.articleCount + left.seriesCount + left.resourceCount)

    return byTotal || left.label.localeCompare(right.label)
  })
}

async function loadTaxonomySources() {
  const [archive, series, resources] = await Promise.all([
    loadArchiveContent(),
    loadSeries(),
    loadResourceItems(),
  ])

  return {
    articles: archive.allArticles,
    resources,
    series,
  }
}

export async function loadTaxonomyIndex(kind: TaxonomyKind) {
  const sources = await loadTaxonomySources()
  return buildSummaries(kind, sources.articles, sources.series, sources.resources)
}

export async function loadTaxonomyDetail(kind: TaxonomyKind, slug: string) {
  const sources = await loadTaxonomySources()
  const summaries = buildSummaries(kind, sources.articles, sources.series, sources.resources)
  const summary = summaries.find((item) => item.value === slug)

  if (!summary) return null

  return {
    ...summary,
    articles: sources.articles.filter((article) =>
      articleFacets(kind, article).some((facet) => facet.value === slug),
    ),
    resources: sources.resources.filter((resource) => resourceMatches(kind, resource, slug)),
    series: sources.series.filter((item) => seriesMatches(kind, item, slug)),
  } satisfies TaxonomyDetail
}

export function buildTaxonomyUrl(kind: TaxonomyKind, slug?: string) {
  const base = kind === 'topic' ? '/topics' : '/audiences'
  return slug ? `${base}/${slug}` : base
}
