import { createArticleDetail } from '@/lib/article-detail'

export type SeriesAudience = 'new-believer' | 'growing-believer' | 'mature-believer' | 'leader'
export type SeriesTopic = 'pastoral-theology' | 'christian-life' | 'marriage' | 'ethics'

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

const seriesItems: SeriesItem[] = [
  {
    articleSlugs: ['scripture-shapes-christian-growth', 'how-to-read-the-bible-when-stuck', 'the-slow-work-of-grace'],
    audience: 'new-believer',
    description: 'A guided set of foundations for new and growing believers.',
    longDescription:
      'Foundations is built for readers who need language for the basic shape of Christian growth. It starts with Scripture, then moves toward daily habits, patience, and steady formation.',
    seoDescription: 'Foundations for new and growing believers.',
    seoTitle: 'Foundations',
    slug: 'foundations',
    status: 'published',
    title: 'Foundations',
    topic: 'christian-life',
  },
  {
    articleSlugs: ['daily-rhythm-for-spiritual-growth'],
    audience: 'growing-believer',
    description: 'Daily patterns for ordinary believers who want to keep walking faithfully.',
    longDescription:
      'Daily Rhythm is a short path for readers who want practical habits that preserve attention to Scripture, prayer, and daily obedience.',
    seoDescription: 'Daily patterns for ordinary believers.',
    seoTitle: 'Daily Rhythm',
    slug: 'daily-rhythm',
    status: 'published',
    title: 'Daily Rhythm',
    topic: 'christian-life',
  },
  {
    articleSlugs: ['marriage-family-and-patient-love', 'teaching-children-the-gospel-at-home'],
    audience: 'growing-believer',
    description: 'Guided reflections on home, covenant, and family discipleship.',
    longDescription:
      'Home and Covenant focuses on the ordinary shape of Christian family life: patience, covenant love, discipleship at home, and the way Scripture holds the household together.',
    seoDescription: 'Reflections on home, covenant, and family discipleship.',
    seoTitle: 'Home and Covenant',
    slug: 'home-and-covenant',
    status: 'published',
    title: 'Home and Covenant',
    topic: 'marriage',
  },
  {
    articleSlugs: ['leaders-need-more-than-charisma'],
    audience: 'leader',
    description: 'A series for those who lead or shape the health of the church.',
    longDescription:
      'Shepherding the Church is aimed at leaders and those who want to understand pastoral responsibility with more biblical depth and less performance.',
    seoDescription: 'A series for church leaders and those who shepherd others.',
    seoTitle: 'Shepherding the Church',
    slug: 'shepherding-the-church',
    status: 'published',
    title: 'Shepherding the Church',
    topic: 'pastoral-theology',
  },
]

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

  const articles = series.articleSlugs
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

