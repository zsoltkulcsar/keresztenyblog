import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buildArticleUrl } from '@/lib/article-detail'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { translateResourceLabel } from '@/lib/i18n'
import { buildResourceUrl, loadResourceItems } from '@/lib/resources'
import { buildSeriesUrl, loadSeries, loadSeriesOverview } from '@/lib/series'

export const dynamic = 'force-dynamic'

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function labelFromValue(value: string) {
  const labels: Record<string, string> = {
    'christian-life': 'Keresztény élet',
    ethics: 'Etika',
    'all-believers': 'Minden hívő',
    families: 'Családok',
    'growing-believer': 'Növekedő hívő',
    leader: 'Vezető',
    marriage: 'Házasság',
    'mature-believer': 'Érett hívő',
    'new-believer': 'Új hívő',
    'pastoral-theology': 'Pásztori teológia',
  }

  return labels[value] ?? value
}

export async function generateMetadata({
  params,
}: {
  params?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = getSingleValue(resolvedParams.slug) ?? ''
  const series = await loadSeriesOverview(slug)

  if (!series) {
    return buildDiscoveryMetadata({
      description: 'A sorozat nem található',
      noIndex: true,
      path: buildSeriesUrl(slug),
      title: 'A sorozat nem található',
    })
  }

  return buildDiscoveryMetadata({
    description: series.longDescription || series.description,
    path: buildSeriesUrl(slug),
    title: series.seoTitle || series.title,
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
  const series = await loadSeriesOverview(slug)

  if (!series) {
    notFound()
  }

  const relatedSeries = (await loadSeries())
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
            Sorozatok
          </Link>
          <p className="eyebrow">Tanítványi út</p>
          <h1>{series.title}</h1>
          <p>{series.longDescription || series.description}</p>
          {firstArticle ? (
            <Link className="discipleship-primary-link" href={buildArticleUrl(firstArticle.slug)}>
              Első tanítás elkezdése
            </Link>
          ) : null}
        </div>

        <aside className="discipleship-purpose-card">
          <span>Cél</span>
          <h2>{series.description}</h2>
          <dl>
            <div>
              <dt>Téma</dt>
              <dd>{labelFromValue(series.topic)}</dd>
            </div>
            <div>
              <dt>Célcsoport</dt>
              <dd>{labelFromValue(series.audience)}</dd>
            </div>
            <div>
              <dt>Részek</dt>
              <dd>{series.articles.length}</dd>
            </div>
          </dl>
        </aside>
      </header>

      <section className="discipleship-path-layout">
        <div className="discipleship-path-main">
          <section className="discipleship-path-overview" aria-label="Út áttekintése">
            <div>
              <p className="eyebrow">Az út röviden</p>
              <h2>Tanulmányi ritmus</h2>
            </div>
            <dl>
              <div>
                <dt>Kinek</dt>
                <dd>{labelFromValue(series.audience)}</dd>
              </div>
              <div>
                <dt>Fő téma</dt>
                <dd>{labelFromValue(series.topic)}</dd>
              </div>
              <div>
                <dt>Ritmus</dt>
                <dd>{series.articles.length > 2 ? 'Többrészes tanulmány' : 'Rövid tanulmányi út'}</dd>
              </div>
            </dl>
            {firstArticle ? (
              <Link
                className="discipleship-secondary-link"
                href={buildArticleUrl(firstArticle.slug)}
              >
                Út elkezdése
              </Link>
            ) : null}
          </section>

          <section className="discipleship-path-section">
            <div>
              <p className="eyebrow">Rendezett részek</p>
              <h2>Kövesd sorrendben a tanításokat</h2>
            </div>
            <ol className="discipleship-lesson-list">
              {series.articles.map(({ article, order }) => (
                <li key={article.slug}>
                  <span>{String(order).padStart(2, '0')}</span>
                  <div>
                    <p>
                      {article.category} / {article.readingMinutes} perc
                    </p>
                    <h3>{article.title}</h3>
                    <small>{article.excerpt}</small>
                  </div>
                  <Link href={buildArticleUrl(article.slug)}>Tanítás olvasása</Link>
                </li>
              ))}
            </ol>
          </section>

          {relatedResources.length ? (
            <section className="discipleship-path-section">
              <div>
                <p className="eyebrow">Tanulmányi segítség</p>
                <h2>Források ehhez az úthoz</h2>
              </div>
              <div className="discipleship-resource-list">
                {relatedResources.map((resource) => (
                  <Link href={buildResourceUrl(resource.slug)} key={resource.slug}>
                    <span>
                      {resource.format ? translateResourceLabel(resource.format) : resource.type}
                    </span>
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
                <p className="eyebrow">Következő út</p>
                <h2>Folytasd egy másik sorozattal</h2>
              </div>
              <div className="discipleship-next-list">
                {relatedSeries.map((item) => (
                  <Link href={buildSeriesUrl(item.slug)} key={item.slug}>
                    <span>{labelFromValue(item.topic)}</span>
                    <strong>{item.title}</strong>
                    <small>
                      {labelFromValue(item.audience)} / {item.articleSlugs.length} rész
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
