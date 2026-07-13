import { createArticleDetail, loadArticleDetail } from '@/lib/article-detail'
import { loadCmsSeriesItems } from '@/lib/cms-content'
import { editorialArticles } from '@/lib/editorial-articles'

export type SeriesAudience =
  | 'all-believers'
  | 'families'
  | 'growing-believer'
  | 'leader'
  | 'mature-believer'
  | 'new-believer'
  | string
export type SeriesTopic = 'christian-life' | 'ethics' | 'marriage' | 'pastoral-theology' | string

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
    description: 'Első út azoknak az olvasóknak, akik a keresztény hit alapformáját tanulják.',
    longDescription:
      'Az Alapok új hívőknek sorozat az üdvösséget, a Szentírást és a helyi gyülekezetet mutatja be mint az új keresztény első stabil talaját.',
    seoDescription: 'Első tanítványi út új keresztényeknek.',
    seoTitle: 'Alapok új hívőknek',
    slug: 'foundations-for-new-believers',
    status: 'published',
    title: 'Alapok új hívőknek',
    topic: 'christian-life',
  },
  {
    articleSlugs: [
      'the-elders-first-qualification-is-character-not-skill',
      'how-to-preach-when-you-feel-unqualified',
    ],
    audience: 'leader',
    description: 'Út pásztoroknak, véneknek, tanítóknak és mindazoknak, akik másokat tanulnak pásztorolni.',
    longDescription:
      'A Gyülekezet pásztorlása a lelki vezetés jellemére, gyengeségére és felelősségére figyel.',
    seoDescription: 'Pásztori teológiai út gyülekezeti vezetőknek.',
    seoTitle: 'A gyülekezet pásztorlása',
    slug: 'shepherding-the-church',
    status: 'published',
    title: 'A gyülekezet pásztorlása',
    topic: 'pastoral-theology',
  },
]

const futureSeries: SeriesItem[] = [
  {
    articleSlugs: ['what-to-do-when-you-dont-want-to-pray'],
    audience: 'all-believers',
    description: 'Jövőbeli út az imádság, a Szentírás és a hétköznapi lelki szokások körül.',
    longDescription:
      'A Napi ritmus áhítatokat és gyakorlati tanítást gyűjthet az imádságról, a Biblia olvasásáról és az ismételt engedelmességről.',
    seoDescription: 'Jövőbeli út hétköznapi lelki ritmusokhoz.',
    seoTitle: 'Napi ritmus',
    slug: 'daily-rhythm',
    status: 'published',
    title: 'Napi ritmus',
    topic: 'christian-life',
  },
  {
    articleSlugs: ['what-submit-to-one-another-actually-means', 'parenting-without-perfection'],
    audience: 'families',
    description: 'Jövőbeli út házassághoz, gyermekneveléshez és családi tanítványsághoz.',
    longDescription:
      'A Házasság és család olyan írásokat gyűjthet, amelyek segítik a háztartásokat a bűnbánat, türelem, tanítványság és hűséges szeretet gyakorlásában.',
    seoDescription: 'Jövőbeli út keresztény házassághoz és családi élethez.',
    seoTitle: 'Házasság és család',
    slug: 'marriage-and-family',
    status: 'published',
    title: 'Házasság és család',
    topic: 'marriage',
  },
]

const seriesItems: SeriesItem[] = [...explicitSeries, ...futureSeries]

function sortSeries(items: SeriesItem[]) {
  return [...items].sort((left, right) => left.title.localeCompare(right.title))
}

function uniqueSeriesValues(items: SeriesItem[], select: (series: SeriesItem) => string) {
  return [...new Map(items.map((series) => [select(series), select(series)])).values()]
}

function getOrderedFallbackSlugs(series: SeriesItem) {
  return series.articleSlugs.length > 0
    ? series.articleSlugs
    : editorialArticles
        .filter((article) => article.series.some((membership) => membership.slug === series.slug))
        .sort((left, right) => {
          const leftOrder =
            left.series.find((membership) => membership.slug === series.slug)?.order ?? 0
          const rightOrder =
            right.series.find((membership) => membership.slug === series.slug)?.order ?? 0
          return leftOrder - rightOrder
        })
        .map((article) => article.slug)
}

export function listSeries() {
  return sortSeries(seriesItems)
}

export async function loadSeries() {
  const cmsSeries = (await loadCmsSeriesItems())?.filter((item): item is SeriesItem =>
    Boolean(item),
  )
  return cmsSeries ? sortSeries(cmsSeries) : listSeries()
}

export function listSeriesTopics() {
  return uniqueSeriesValues(seriesItems, (series) => series.topic)
}

export async function loadSeriesTopics() {
  return uniqueSeriesValues(await loadSeries(), (series) => series.topic)
}

export function listSeriesAudiences() {
  return uniqueSeriesValues(seriesItems, (series) => series.audience)
}

export async function loadSeriesAudiences() {
  return uniqueSeriesValues(await loadSeries(), (series) => series.audience)
}

export function buildSeriesUrl(slug: string) {
  return `/series/${slug}`
}

export function createSeriesOverview(slug: string) {
  const series = seriesItems.find((item) => item.slug === slug)
  if (!series) return null

  const articles = getOrderedFallbackSlugs(series)
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

export async function loadSeriesOverview(slug: string) {
  const cmsSeries = (await loadCmsSeriesItems())?.filter((item): item is SeriesItem =>
    Boolean(item),
  )
  if (!cmsSeries) return createSeriesOverview(slug)

  const series = cmsSeries.find((item) => item.slug === slug)
  if (!series) return null

  const articles = (
    await Promise.all(
      getOrderedFallbackSlugs(series).map(async (articleSlug, index) => {
        const article = await loadArticleDetail(articleSlug)
        if (!article) return null

        return {
          article,
          order: index + 1,
        }
      }),
    )
  ).filter(Boolean) as Array<{
    article: NonNullable<Awaited<ReturnType<typeof loadArticleDetail>>>
    order: number
  }>

  return {
    ...series,
    articles,
  }
}
