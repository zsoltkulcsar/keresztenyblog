import { createArchiveContent, loadArchiveContent } from '@/lib/article-archive'
import { loadCmsEditorialArticles } from '@/lib/cms-content'
import { editorialArticles, type EditorialArticleSeed } from '@/lib/editorial-articles'
import { translateArticleLabel } from '@/lib/i18n'

export type ArticleSeriesContext = {
  description: string
  label: string
  slug: string
}

export type ArticleDetail = {
  author: string
  category: string
  coverAlt: string
  coverSrc: string
  excerpt: string
  format: string
  publishedAt: string
  readingMinutes: number
  relatedBook?: string
  relatedResource?: string
  scriptureBlock: {
    reference: string
    text: string
  }
  sections: Array<{
    body: string[]
    heading: string
  }>
  series?: ArticleSeriesContext
  seriesOrder?: number
  slug: string
  subtitle: string
  studyPanel: {
    items: string[]
    title: string
  }
  tags: string[]
  title: string
  pullQuote: string
}

export type ArticleSeriesNavigation = {
  next?: ArticleDetail
  previous?: ArticleDetail
}

type ArticleArchiveContent = ReturnType<typeof createArchiveContent>

function toArticleDetail(article: EditorialArticleSeed): ArticleDetail {
  return {
    author: article.author,
    category: translateArticleLabel(article.category),
    coverAlt: `${article.title} szerkesztőségi borító`,
    coverSrc: '/home-hero.png',
    excerpt: article.excerpt,
    format: translateArticleLabel(article.format),
    publishedAt: article.publishedAt,
    readingMinutes: article.readingMinutes,
    relatedBook: article.relatedBook,
    relatedResource: article.relatedResource,
    scriptureBlock: {
      reference: article.mainScripture,
      text: article.scriptureText,
    },
    sections: article.body,
    series: article.series[0]
      ? {
          description: article.series[0].description,
          label: article.series[0].label,
          slug: article.series[0].slug,
        }
      : undefined,
    seriesOrder: article.series[0]?.order,
    slug: article.slug,
    subtitle: article.subtitle,
    studyPanel: {
      items: article.studyQuestions,
      title: article.format === 'devotion' ? 'Elmélkedési kérdések' : 'Tanulmányozási kérdések',
    },
    tags: [...article.tags, ...article.topic, ...article.audience].map((label) =>
      translateArticleLabel(label),
    ),
    title: article.title,
    pullQuote: article.pullQuote,
  }
}

const articleDetails: ArticleDetail[] = editorialArticles.map(toArticleDetail)

function resolveArticleDetail(
  slug: string,
  details: ArticleDetail[],
  archive: ArticleArchiveContent,
) {
  const detail = details.find((article) => article.slug === slug)
  if (!detail) return null

  const archiveArticle = archive.allArticles.find((article) => article.slug === slug)
  const seriesPeers = detail.series
    ? details
        .filter((article) => article.series?.slug === detail.series?.slug)
        .sort((left, right) => (left.seriesOrder ?? 0) - (right.seriesOrder ?? 0))
    : []
  const currentIndex = seriesPeers.findIndex((article) => article.slug === slug)

  return {
    ...detail,
    archiveArticle,
    seriesNavigation: {
      next: currentIndex >= 0 ? seriesPeers[currentIndex + 1] : undefined,
      previous: currentIndex >= 0 ? seriesPeers[currentIndex - 1] : undefined,
    } satisfies ArticleSeriesNavigation,
  }
}

export function buildArticleUrl(slug: string) {
  return `/articles/${slug}`
}

export function listArticleDetailSlugs() {
  return articleDetails.map((article) => article.slug)
}

export async function listPublicArticleDetailSlugs() {
  const cmsArticles = await loadCmsEditorialArticles()
  return cmsArticles ? cmsArticles.map((article) => article.slug) : listArticleDetailSlugs()
}

export function createArticleDetail(slug: string) {
  return resolveArticleDetail(slug, articleDetails, createArchiveContent())
}

export async function loadArticleDetail(slug: string) {
  const cmsArticles = await loadCmsEditorialArticles()
  if (!cmsArticles) return createArticleDetail(slug)

  const details = cmsArticles.map(toArticleDetail)
  return resolveArticleDetail(slug, details, await loadArchiveContent())
}

export async function loadArticleDetails() {
  const cmsArticles = await loadCmsEditorialArticles()
  return cmsArticles ? cmsArticles.map(toArticleDetail) : articleDetails
}
