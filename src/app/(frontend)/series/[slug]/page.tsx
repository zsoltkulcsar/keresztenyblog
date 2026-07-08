import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buildArticleUrl } from '@/lib/article-detail'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildResourceUrl, loadResourceItems } from '@/lib/resources'
import { buildSeriesUrl, createSeriesOverview, listSeries } from '@/lib/series'

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function labelFromValue(value: string) {
  const labels: Record<string, string> = {
    'christian-life': 'Christian Life',
    ethics: 'Ethics',
    'all-believers': 'All believers',
    families: 'Families',
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
  params?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
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
  params?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = getSingleValue(resolvedParams.slug) ?? ''
  const series = createSeriesOverview(slug)

  if (!series) {
    notFound()
  }

  const relatedSeries = listSeries()
    .filter(
      (item) =>
        item.slug !== slug && (item.topic === series.topic || item.audience === series.audience),
    )
    .slice(0, 3)
  const relatedResources = (await loadResourceItems())
    .filter((resource) => resource.relatedSeriesSlugs.includes(series.slug))
    .slice(0, 4)
  const firstArticle = series.articles[0]?.article

  return (
    <main className="discipleship-path-page">
      <header className="discipleship-path-hero">
        <div className="discipleship-path-title">
          <Link className="discipleship-back-link" href="/series">
            Series
          </Link>
          <p className="eyebrow">Discipleship path</p>
          <h1>{series.title}</h1>
          <p>{series.longDescription || series.description}</p>
          {firstArticle ? (
            <Link className="discipleship-primary-link" href={buildArticleUrl(firstArticle.slug)}>
              Start first lesson
            </Link>
          ) : null}
        </div>

        <aside className="discipleship-purpose-card">
          <span>Purpose</span>
          <h2>{series.description}</h2>
          <dl>
            <div>
              <dt>Topic</dt>
              <dd>{labelFromValue(series.topic)}</dd>
            </div>
            <div>
              <dt>Audience</dt>
              <dd>{labelFromValue(series.audience)}</dd>
            </div>
            <div>
              <dt>Parts</dt>
              <dd>{series.articles.length}</dd>
            </div>
          </dl>
        </aside>
      </header>

      <section className="discipleship-path-layout">
        <div className="discipleship-path-main">
          <section className="discipleship-path-overview" aria-label="Path overview">
            <div>
              <p className="eyebrow">Path at a glance</p>
              <h2>Study rhythm</h2>
            </div>
            <dl>
              <div>
                <dt>For</dt>
                <dd>{labelFromValue(series.audience)}</dd>
              </div>
              <div>
                <dt>Main theme</dt>
                <dd>{labelFromValue(series.topic)}</dd>
              </div>
              <div>
                <dt>Rhythm</dt>
                <dd>{series.articles.length > 2 ? 'Multi-part study' : 'Short study path'}</dd>
              </div>
            </dl>
            {firstArticle ? (
              <Link
                className="discipleship-secondary-link"
                href={buildArticleUrl(firstArticle.slug)}
              >
                Begin path
              </Link>
            ) : null}
          </section>

          <section className="discipleship-path-section">
            <div>
              <p className="eyebrow">Ordered parts</p>
              <h2>Follow the lessons in order</h2>
            </div>
            <ol className="discipleship-lesson-list">
              {series.articles.map(({ article, order }) => (
                <li key={article.slug}>
                  <span>{String(order).padStart(2, '0')}</span>
                  <div>
                    <p>
                      {article.category} · {article.readingMinutes} min
                    </p>
                    <h3>{article.title}</h3>
                    <small>{article.excerpt}</small>
                  </div>
                  <Link href={buildArticleUrl(article.slug)}>Read lesson</Link>
                </li>
              ))}
            </ol>
          </section>

          {relatedResources.length ? (
            <section className="discipleship-path-section">
              <div>
                <p className="eyebrow">Study support</p>
                <h2>Resources for this path</h2>
              </div>
              <div className="discipleship-resource-list">
                {relatedResources.map((resource) => (
                  <Link href={buildResourceUrl(resource.slug)} key={resource.slug}>
                    <span>{resource.format ?? resource.type}</span>
                    <strong>{resource.title}</strong>
                    <small>{resource.usefulness}</small>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relatedSeries.length ? (
            <section className="discipleship-path-section">
              <div>
                <p className="eyebrow">Next path</p>
                <h2>Continue with another series</h2>
              </div>
              <div className="discipleship-next-list">
                {relatedSeries.map((item) => (
                  <Link href={buildSeriesUrl(item.slug)} key={item.slug}>
                    <span>{labelFromValue(item.topic)}</span>
                    <strong>{item.title}</strong>
                    <small>
                      {labelFromValue(item.audience)} · {item.articleSlugs.length} parts
                    </small>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  )
}
