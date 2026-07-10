import { getCmsPayload } from '@/lib/server/payload'
import { editorialArticles, type EditorialArticleSeed } from '@/lib/editorial-articles'

type RelationDoc = {
  description?: string | null
  id?: number | string
  label?: string | null
  name?: string | null
  slug?: string | null
  title?: string | null
}

type CmsArticleDoc = {
  author?: RelationDoc | number | string | null
  audiences?: Array<RelationDoc | number | string> | null
  body?: unknown
  excerpt?: string | null
  format?: string | null
  id?: number | string
  mainScripture?: string | null
  publishedAt?: string | null
  pullQuote?: string | null
  relatedBooks?: unknown
  relatedResources?: Array<RelationDoc | number | string> | null
  scriptureText?: string | null
  seriesMemberships?: Array<{
    order?: number | null
    series?: RelationDoc | number | string | null
  }> | null
  slug?: string | null
  sourceNote?: string | null
  status?: string | null
  studyQuestions?: unknown
  subtitle?: string | null
  tags?: unknown
  title?: string | null
  topics?: Array<RelationDoc | number | string> | null
}

export type CmsSeriesDoc = {
  articleSlugs?: unknown
  audience?: Array<RelationDoc | number | string> | null
  description?: string | null
  id?: number | string
  longDescription?: string | null
  orderedArticles?: Array<{
    article?: CmsArticleDoc | RelationDoc | number | string | null
    order?: number | null
  }> | null
  seoDescription?: string | null
  seoTitle?: string | null
  slug?: string | null
  status?: string | null
  title?: string | null
  topic?: Array<RelationDoc | number | string> | null
}

type CmsArticleResult = {
  articles: CmsArticleDoc[]
  series: CmsSeriesDoc[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object')
}

export function slugifyLabel(label: string) {
  return label
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function relationSlug(value: RelationDoc | number | string | null | undefined) {
  if (!isRecord(value)) return ''
  return String(value.slug ?? '')
}

export function relationTitle(value: RelationDoc | number | string | null | undefined) {
  if (!isRecord(value)) return ''
  return String(value.title ?? value.label ?? value.name ?? value.slug ?? '')
}

function relationDescription(value: RelationDoc | number | string | null | undefined) {
  if (!isRecord(value)) return ''
  return String(value.description ?? '')
}

function relationTitles(values: Array<RelationDoc | number | string> | null | undefined) {
  return (values ?? []).map(relationTitle).filter(Boolean)
}

function relationSlugs(values: Array<RelationDoc | number | string> | null | undefined) {
  return (values ?? []).map(relationSlug).filter(Boolean)
}

function arrayOfStrings(value: unknown) {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : []
}

function articleSlugFromSeriesItem(item: NonNullable<CmsSeriesDoc['orderedArticles']>[number]) {
  const article = item.article
  return isRecord(article) ? String(article.slug ?? '') : ''
}

function buildSeriesMembershipMap(seriesDocs: CmsSeriesDoc[]) {
  const membershipMap = new Map<string, NonNullable<CmsArticleDoc['seriesMemberships']>>()

  for (const series of seriesDocs) {
    const orderedArticles = (series.orderedArticles ?? []).slice().sort((left, right) => {
      return Number(left.order ?? 0) - Number(right.order ?? 0)
    })

    orderedArticles.forEach((item, index) => {
      const articleSlug = articleSlugFromSeriesItem(item)
      if (!articleSlug) return

      const memberships = membershipMap.get(articleSlug) ?? []
      memberships.push({
        order: Number(item.order ?? index + 1),
        series,
      })
      membershipMap.set(articleSlug, memberships)
    })
  }

  return membershipMap
}

function applySeriesOwnedMemberships(articles: CmsArticleDoc[], series: CmsSeriesDoc[]) {
  const membershipMap = buildSeriesMembershipMap(series)

  return articles.map((article) => {
    const slug = String(article.slug ?? '')
    const seriesMemberships = membershipMap.get(slug)

    return seriesMemberships?.length ? { ...article, seriesMemberships } : article
  })
}

function paragraphText(node: Record<string, unknown>) {
  const children = Array.isArray(node.children) ? node.children : []
  return children
    .map((child) => (isRecord(child) && typeof child.text === 'string' ? child.text : ''))
    .join('')
    .trim()
}

function lexicalToSections(body: unknown) {
  if (!isRecord(body) || !isRecord(body.root) || !Array.isArray(body.root.children)) {
    return []
  }

  const sections: Array<{ body: string[]; heading: string }> = []
  let current: { body: string[]; heading: string } | null = null

  for (const child of body.root.children) {
    if (!isRecord(child)) continue

    const text = paragraphText(child)
    if (!text) continue

    if (child.type === 'heading') {
      current = { body: [], heading: text }
      sections.push(current)
      continue
    }

    if (!current) {
      current = { body: [], heading: 'Article' }
      sections.push(current)
    }

    current.body.push(text)
  }

  return sections.filter((section) => section.body.length > 0)
}

function estimateReadingMinutes(article: Pick<EditorialArticleSeed, 'body'>) {
  const words = article.body
    .flatMap((section) => section.body)
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(words / 220))
}

export function normalizeCmsArticle(doc: CmsArticleDoc): EditorialArticleSeed | null {
  const slug = String(doc.slug ?? '')
  const title = String(doc.title ?? '')
  const body = lexicalToSections(doc.body)

  if (!slug || !title || body.length === 0) return null

  const firstSeries = doc.seriesMemberships?.[0]
  const seriesDoc = firstSeries?.series
  const relatedResources = (doc.relatedResources ?? [])
    .map((resource) => relationTitle(resource))
    .filter(Boolean)

  const normalized: EditorialArticleSeed = {
    audience: relationTitles(doc.audiences),
    author: relationTitle(doc.author) || 'Editorial Team',
    body,
    category: relationTitles(doc.topics)[0] || 'General',
    excerpt: String(doc.excerpt ?? ''),
    format:
      doc.format === 'devotion' ||
      doc.format === 'reflection' ||
      doc.format === 'testimony' ||
      doc.format === 'teaching'
        ? doc.format
        : 'teaching',
    mainScripture: String(doc.mainScripture ?? ''),
    publishedAt: String(doc.publishedAt ?? ''),
    pullQuote: String(doc.pullQuote ?? ''),
    readingMinutes: estimateReadingMinutes({ body }),
    relatedBook: arrayOfStrings(doc.relatedBooks)[0],
    relatedResource: relatedResources[0],
    scriptureText: String(doc.scriptureText ?? ''),
    series: seriesDoc
      ? [
          {
            description: relationDescription(seriesDoc),
            label: relationTitle(seriesDoc),
            order: Number(firstSeries?.order ?? 1),
            slug: relationSlug(seriesDoc),
          },
        ].filter((series) => series.slug)
      : [],
    slug,
    studyQuestions: arrayOfStrings(doc.studyQuestions),
    subtitle: String(doc.subtitle ?? ''),
    tags: [
      ...arrayOfStrings(doc.tags),
      ...relationTitles(doc.topics),
      ...relationTitles(doc.audiences),
    ],
    title,
    topic: relationTitles(doc.topics),
  }

  return normalized
}

export function normalizeCmsSeries(doc: CmsSeriesDoc) {
  const slug = String(doc.slug ?? '')
  const title = String(doc.title ?? '')
  if (!slug || !title) return null

  const articleSlugsFromRelations = (doc.orderedArticles ?? [])
    .slice()
    .sort((left, right) => Number(left.order ?? 0) - Number(right.order ?? 0))
    .map((item) => {
      const article = item.article
      return isRecord(article) ? String(article.slug ?? '') : ''
    })
    .filter(Boolean)

  const topicSlug = relationSlugs(doc.topic)[0] || 'christian-life'
  const audienceSlug = relationSlugs(doc.audience)[0] || 'all-believers'

  return {
    articleSlugs:
      articleSlugsFromRelations.length > 0
        ? articleSlugsFromRelations
        : arrayOfStrings(doc.articleSlugs),
    audience: audienceSlug,
    description: String(doc.description ?? ''),
    longDescription: String(doc.longDescription ?? doc.description ?? ''),
    seoDescription: String(doc.seoDescription ?? doc.description ?? ''),
    seoTitle: String(doc.seoTitle ?? title),
    slug,
    status: doc.status === 'published' ? ('published' as const) : ('draft' as const),
    title,
    topic: topicSlug,
  }
}

export async function loadCmsArticlesAndSeries(): Promise<CmsArticleResult | null> {
  const payload = await getCmsPayload()
  if (!payload) return null

  try {
    const [articles, series] = await Promise.all([
      (payload as any).find({
        collection: 'articles',
        depth: 2,
        limit: 100,
        sort: '-publishedAt',
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
      (payload as any).find({
        collection: 'series',
        depth: 2,
        limit: 100,
        sort: 'title',
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
    ])

    const docs = {
      articles: Array.isArray(articles?.docs) ? articles.docs : [],
      series: Array.isArray(series?.docs) ? series.docs : [],
    }

    return docs.articles.length || docs.series.length ? docs : null
  } catch {
    return null
  }
}

export async function loadCmsEditorialArticles() {
  const cms = await loadCmsArticlesAndSeries()
  if (!cms?.articles.length) return null

  const articles = applySeriesOwnedMemberships(cms.articles, cms.series)
    .map(normalizeCmsArticle)
    .filter(Boolean) as EditorialArticleSeed[]
  return articles.length > 0 ? articles : null
}

export async function loadCmsSeriesItems() {
  const cms = await loadCmsArticlesAndSeries()
  if (!cms?.series.length) return null

  const items = cms.series.map(normalizeCmsSeries).filter(Boolean)
  return items.length > 0 ? items : null
}
