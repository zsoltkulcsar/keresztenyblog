import { createArchiveContent } from '@/lib/article-archive'
import { editorialArticles } from '@/lib/editorial-articles'

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

const articleDetails: ArticleDetail[] = editorialArticles.map((article) => ({
  author: article.author,
  category: article.category,
  coverAlt: `${article.title} editorial cover`,
  coverSrc: '/home-hero.png',
  excerpt: article.excerpt,
  format: article.format,
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
    title: article.format === 'devotion' ? 'Reflection questions' : 'Study questions',
  },
  tags: [...article.tags, ...article.topic, ...article.audience],
  title: article.title,
  pullQuote: article.pullQuote,
}))

const articleDetailMap = new Map(articleDetails.map((article) => [article.slug, article]))

export function buildArticleUrl(slug: string) {
  return `/articles/${slug}`
}

export function listArticleDetailSlugs() {
  return articleDetails.map((article) => article.slug)
}

export function createArticleDetail(slug: string) {
  const detail = articleDetailMap.get(slug)
  if (!detail) return null

  const archive = createArchiveContent()
  const archiveArticle = archive.allArticles.find((article) => article.slug === slug)
  const seriesPeers = detail.series
    ? articleDetails
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
