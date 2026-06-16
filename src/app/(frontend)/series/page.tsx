import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildSeriesUrl, listSeries, listSeriesAudiences, listSeriesTopics } from '@/lib/series'

function labelFromValue(value: string) {
  const labels: Record<string, string> = {
    'christian-life': 'Christian Life',
    'ethics': 'Ethics',
    'growing-believer': 'Growing believer',
    'leader': 'Leader',
    'marriage': 'Marriage',
    'mature-believer': 'Mature believer',
    'new-believer': 'New believer',
    'pastoral-theology': 'Pastoral Theology',
  }

  return labels[value] ?? value
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Browse the topic-based series and learning paths on Kovasz.',
    path: '/series',
    title: 'Series',
  })
}

export default async function SeriesPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const topic = getSingleValue(resolvedSearchParams.topic)
  const audience = getSingleValue(resolvedSearchParams.audience)

  const items = listSeries().filter((series) => {
    const topicMatch = !topic || series.topic === topic
    const audienceMatch = !audience || series.audience === audience
    return topicMatch && audienceMatch
  })

  return (
    <main className="series-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Series</p>
          <h1>Topic-based learning paths</h1>
          <p className="archive-intro">
            Series are the main routing layer for new believers, growing believers, mature readers, and leaders.
          </p>
        </div>

        <div className="archive-header-meta">
          <span>{items.length} series</span>
          <Link className="archive-reset-link" href="/series">
            Reset filters
          </Link>
        </div>
      </header>

      <section className="archive-toolbar" aria-label="Series filters">
        <form className="series-filter-bar" method="get">
          <label>
            <span>Topic</span>
            <select name="topic" defaultValue={topic ?? ''}>
              <option value="">All topics</option>
              {listSeriesTopics().map((value) => (
                <option key={value} value={value}>
                  {labelFromValue(value)}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Audience</span>
            <select name="audience" defaultValue={audience ?? ''}>
              <option value="">All audiences</option>
              {listSeriesAudiences().map((value) => (
                <option key={value} value={value}>
                  {labelFromValue(value)}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Filter series</button>
        </form>

        <p className="archive-summary">
          Topic stays primary; audience routing remains a secondary lens.
        </p>
      </section>

      {items.length > 0 ? (
        <section className="series-grid" aria-label="Series list">
          {items.map((series) => (
            <article className="archive-item" key={series.slug}>
              <p className="card-meta">
                <span>{labelFromValue(series.topic)}</span>
                <span>{labelFromValue(series.audience)}</span>
              </p>
              <h2>{series.title}</h2>
              <p>{series.description}</p>
              <Link className="archive-open-link" href={buildSeriesUrl(series.slug)}>
                Open series
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="archive-empty" aria-live="polite">
          <div>
            <p className="eyebrow">No series found</p>
            <h2>No series match these filters.</h2>
            <p>Reset the filters to see the available learning paths again.</p>
          </div>
          <Link className="archive-reset-link" href="/series">
            Clear filters
          </Link>
        </section>
      )}
    </main>
  )
}

