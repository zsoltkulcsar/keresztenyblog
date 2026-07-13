import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildSeriesUrl, loadSeries, loadSeriesAudiences, loadSeriesTopics } from '@/lib/series'

export const dynamic = 'force-dynamic'

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

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function filterHref(params: { audience?: string; topic?: string }) {
  const searchParams = new URLSearchParams()
  if (params.topic) searchParams.set('topic', params.topic)
  if (params.audience) searchParams.set('audience', params.audience)

  const query = searchParams.toString()
  return query ? `/series?${query}` : '/series'
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Böngészd a Kovász témaalapú sorozatait és tanulási útjait.',
    path: '/series',
    title: 'Sorozatok',
  })
}

export default async function SeriesPage({
  searchParams,
}: {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const topic = getSingleValue(resolvedSearchParams.topic)
  const audience = getSingleValue(resolvedSearchParams.audience)

  const allSeries = await loadSeries()
  const seriesTopics = await loadSeriesTopics()
  const seriesAudiences = await loadSeriesAudiences()
  const items = allSeries.filter((series) => {
    const topicMatch = !topic || series.topic === topic
    const audienceMatch = !audience || series.audience === audience
    return topicMatch && audienceMatch
  })
  return (
    <main className="study-path-page">
      <header className="study-path-header">
        <div>
          <p className="eyebrow">Sorozatok</p>
          <h1>Vezetett tanulmányi utak</h1>
          <p>
            A sorozatok rendezett tanulási utak azoknak az olvasóknak, akik szerkezetet keresnek,
            nem szétszórt cikkeket. Kezdj egy úttal, kövesd a részeket, és térj vissza, amikor
            ismétlésre van szükséged.
          </p>
        </div>

        <aside className="study-path-summary">
          <span>{items.length} látható út</span>
          <strong>{topic ? labelFromValue(topic) : 'Minden téma'}</strong>
          <p>{audience ? labelFromValue(audience) : 'Minden célcsoport'}</p>
        </aside>
      </header>

      <section className="study-path-router" aria-label="Sorozatszűrők">
        <div>
          <p className="eyebrow">Irány kiválasztása</p>
          <h2>Szűrés téma vagy olvasói szakasz szerint</h2>
        </div>
        <form className="study-path-form" method="get">
          <label>
            <span>Téma</span>
            <select name="topic" defaultValue={topic ?? ''}>
              <option value="">Minden téma</option>
              {seriesTopics.map((value) => (
                <option key={value} value={value}>
                  {labelFromValue(value)}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Célcsoport</span>
            <select name="audience" defaultValue={audience ?? ''}>
              <option value="">Minden célcsoport</option>
              {seriesAudiences.map((value) => (
                <option key={value} value={value}>
                  {labelFromValue(value)}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Alkalmazás</button>
          <Link href="/series">Visszaállítás</Link>
        </form>
      </section>

      {items.length > 0 ? (
        <section className="study-path-feature" aria-label="Hogyan válassz sorozatot">
          <div className="study-path-feature-heading">
            <p className="eyebrow">Hogyan válassz</p>
            <h2>Minden sorozat rendezett részekből álló út</h2>
            <p>
              A fenti szűrőkkel szűkítsd az utakat, majd válassz egy sorozatot lent. A lista az
              útmutató: minden sor megmutatja a célcsoportot, témát, részek számát és a következő
              lépést.
            </p>
          </div>

          <div className="study-path-feature-steps">
            <div>
              <span>01</span>
              <strong>Válaszd ki az olvasót</strong>
              <p>Új hívő, növekedő hívő, érett hívő vagy vezető.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Válaszd ki a témát</strong>
              <p>Keresztény élet, pásztori teológia, házasság vagy etika.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Kezdd el az utat</strong>
              <p>Nyiss meg egy sorozatot, és kövesd sorrendben a tanításokat.</p>
            </div>
          </div>
        </section>
      ) : null}

      {items.length > 0 ? (
        <section className="study-path-list" aria-label="Sorozatos tanulási utak">
          {items.map((series, index) => (
            <article className="study-path-card" key={series.slug}>
              <div className="study-path-number">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="study-path-card-main">
                <p className="study-path-meta">
                  <span>{labelFromValue(series.topic)}</span>
                  <span>{labelFromValue(series.audience)}</span>
                  <span>{series.articleSlugs.length} rész</span>
                </p>
                <h2>{series.title}</h2>
                <p>{series.description}</p>
              </div>
              <div className="study-path-card-action">
                <span>{series.articleSlugs.length > 1 ? 'Rendezett út' : 'Rövid út'}</span>
                <Link href={buildSeriesUrl(series.slug)}>Út elkezdése</Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="study-path-empty" aria-live="polite">
          <div>
            <p className="eyebrow">Nincs út</p>
            <h2>Nincs sorozat ezekkel a szűrőkkel.</h2>
            <p>Állítsd vissza a szűrőket, hogy újra lásd az összes elérhető tanulmányi utat.</p>
          </div>
          <Link href="/series">Szűrők törlése</Link>
        </section>
      )}
    </main>
  )
}
