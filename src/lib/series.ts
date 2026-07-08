import { createArticleDetail } from '@/lib/article-detail'
import { editorialArticles } from '@/lib/editorial-articles'

export type SeriesAudience = 'all-believers' | 'families' | 'leader' | 'new-believer'
export type SeriesTopic = 'christian-life' | 'marriage' | 'pastoral-theology'

export type SeriesItem = {
  articleSlugs: string[]
  audience: SeriesAudience
  description: string
  longDescription: string
  seoDescription: string
  seoTitle: string
  slug: string
  status: 'draft' | 'published'
  title: string
  topic: SeriesTopic
}

const explicitSeries: SeriesItem[] = [
  {
    articleSlugs: [
      'what-happened-when-you-believed',
      'how-to-read-the-bible-for-the-first-time',
      'why-the-church-is-not-optional',
    ],
    audience: 'new-believer',
    description: 'A first path for readers who are learning the basic shape of Christian faith.',
    longDescription:
      'Foundations for New Believers introduces salvation, Scripture, and the local church as the first stable ground for a new Christian.',
    seoDescription: 'A first discipleship path for new Christians.',
    seoTitle: 'Foundations for New Believers',
    slug: 'foundations-for-new-believers',
    status: 'published',
    title: 'Foundations for New Believers',
    topic: 'christian-life',
  },
  {
    articleSlugs: [
      'the-elders-first-qualification-is-character-not-skill',
      'how-to-preach-when-you-feel-unqualified',
    ],
    audience: 'leader',
    description: 'A path for pastors, elders, teachers, and those learning to shepherd others.',
    longDescription:
      'Shepherding the Church focuses on the character, weakness, and responsibility of spiritual leadership.',
    seoDescription: 'A pastoral theology path for church leaders.',
    seoTitle: 'Shepherding the Church',
    slug: 'shepherding-the-church',
    status: 'published',
    title: 'Shepherding the Church',
    topic: 'pastoral-theology',
  },
]

const futureSeries: SeriesItem[] = [
  {
    articleSlugs: ['what-to-do-when-you-dont-want-to-pray'],
    audience: 'all-believers',
    description: 'A future path around prayer, Scripture, and ordinary spiritual habits.',
    longDescription:
      'Daily Rhythm can collect devotions and practical teaching on prayer, Bible reading, and repeated obedience.',
    seoDescription: 'A future path for ordinary spiritual rhythms.',
    seoTitle: 'Daily Rhythm',
    slug: 'daily-rhythm',
    status: 'published',
    title: 'Daily Rhythm',
    topic: 'christian-life',
  },
  {
    articleSlugs: ['what-submit-to-one-another-actually-means', 'parenting-without-perfection'],
    audience: 'families',
    description: 'A future path for marriage, parenting, and family discipleship.',
    longDescription:
      'Marriage and Family can gather articles that help households practice repentance, patience, discipleship, and faithful love.',
    seoDescription: 'A future path for Christian marriage and family life.',
    seoTitle: 'Marriage and Family',
    slug: 'marriage-and-family',
    status: 'published',
    title: 'Marriage and Family',
    topic: 'marriage',
  },
]

const seriesItems: SeriesItem[] = [...explicitSeries, ...futureSeries]
const seriesMap = new Map(seriesItems.map((series) => [series.slug, series]))

export function listSeries() {
  return [...seriesItems].sort((left, right) => left.title.localeCompare(right.title))
}

export function listSeriesTopics() {
  return [...new Map(seriesItems.map((series) => [series.topic, series.topic])).values()]
}

export function listSeriesAudiences() {
  return [...new Map(seriesItems.map((series) => [series.audience, series.audience])).values()]
}

export function buildSeriesUrl(slug: string) {
  return `/series/${slug}`
}

export function createSeriesOverview(slug: string) {
  const series = seriesMap.get(slug)
  if (!series) return null

  const orderedArticleSlugs =
    series.articleSlugs.length > 0
      ? series.articleSlugs
      : editorialArticles
          .filter((article) => article.series.some((membership) => membership.slug === series.slug))
          .sort((left, right) => {
            const leftOrder = left.series.find((membership) => membership.slug === series.slug)?.order ?? 0
            const rightOrder = right.series.find((membership) => membership.slug === series.slug)?.order ?? 0
            return leftOrder - rightOrder
          })
          .map((article) => article.slug)

  const articles = orderedArticleSlugs
    .map((articleSlug, index) => {
      const article = createArticleDetail(articleSlug)
      if (!article) return null

      return {
        article,
        order: index + 1,
      }
    })
    .filter(Boolean) as Array<{
    article: NonNullable<ReturnType<typeof createArticleDetail>>
    order: number
  }>

  return {
    ...series,
    articles,
  }
}
