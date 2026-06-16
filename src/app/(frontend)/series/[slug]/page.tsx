import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildSeriesUrl, createSeriesOverview, listSeries } from '@/lib/series'
import { buildArticleUrl } from '@/lib/article-detail'

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function labelFromValue(value: string) {
  const labels: Record<string, string> = {
    'christian-life': 'Christian Life',
    ethics: 'Ethics',
    'growing-believer': 'Growing believer',
    leader: 'Leader',
    marriage: 'Marriage',
    'mature-believer': 'Mature believer',
    'new-believer': 'New believer',
    'pastoral-theology': 'Pastoral Theology',
  }

  return labels[value] ?? value
}

export function generateMetadata({
  params,
}: {
  params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}) {
  return Promise.resolve(params ?? {}).then((resolvedParams) => {
    const slug = getSingleValue(resolvedParams.slug) ?? ''
    const series = createSeriesOverview(slug)

    if (!series) {
      return buildDiscoveryMetadata({
        description: 'Series not found',
        noIndex: true,
        path: buildSeriesUrl(slug),
        title: 'Series not found',
      })
    }

    return buildDiscoveryMetadata({
      description: series.longDescription || series.description,
      path: buildSeriesUrl(slug),
      title: series.seoTitle || series.title,
    })
  })
}

export default async function SeriesDetailPage({
  params,
}: {
  params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = getSingleValue(resolvedParams.slug) ?? ''
  const series = createSeriesOverview(slug)

  if (!series) {
    notFound()
  }

  const relatedSeries = listSeries().filter((item) => item.slug !== slug).slice(0, 3)

  return (
    <main className="series-page">
      <header className="article-header">
        <div className="article-kicker-row">
          <p className="eyebrow">Series</p>
          <p className="article-meta-inline">
            <span>{labelFromValue(series.topic)}</span>
            <span>{labelFromValue(series.audience)}</span>
            <span>{series.articles.length} parts</span>
          </p>
        </div>
        <h1>{series.title}</h1>
        <p className="article-subtitle">{series.description}</p>
        <p className="archive-summary">{series.longDescription}</p>
      </header>

      <section className="series-detail-grid" aria-label="Series parts">
        {series.articles.map(({ article, order }) => (
          <article className="archive-item" key={article.slug}>
            <p className="card-meta">
              <span>Part {order}</span>
              <span>{article.category}</span>
            </p>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <Link className="archive-open-link" href={buildArticleUrl(article.slug)}>
              Open article
            </Link>
          </article>
        ))}
      </section>

      <section className="page-links" aria-label="Series routes">
        <Link className="page-link" href="/articles">
          Browse archive
        </Link>
        <Link className="page-link" href="/napi-ige">
          Daily Verse
        </Link>
        <Link className="page-link" href="/resources">
          Resources
        </Link>
        <Link className="page-link" href="/about">
          About Kovasz
        </Link>
      </section>

      <section className="related-section" aria-label="Related series">
        <div className="section-heading">
          <p className="eyebrow">More series</p>
          <h2>Continue with another learning path</h2>
        </div>
        <div className="related-grid">
          {relatedSeries.map((item) => (
            <article className="related-item" key={item.slug}>
              <p className="card-meta">
                <span>{item.topic}</span>
                <span>{item.audience}</span>
              </p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={buildSeriesUrl(item.slug)}>Open series</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
