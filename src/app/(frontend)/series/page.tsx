import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildSeriesUrl, loadSeries, loadSeriesAudiences, loadSeriesTopics } from '@/lib/series'

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
    description: 'Browse the topic-based series and learning paths on Kovasz.',
    path: '/series',
    title: 'Series',
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
          <p className="eyebrow">Series</p>
          <h1>Guided study paths</h1>
          <p>
            Series are ordered learning journeys for readers who want structure, not scattered
            articles. Start with a path, follow the parts, and return when you need review.
          </p>
        </div>

        <aside className="study-path-summary">
          <span>{items.length} visible paths</span>
          <strong>{topic ? labelFromValue(topic) : 'All topics'}</strong>
          <p>{audience ? labelFromValue(audience) : 'All audiences'}</p>
        </aside>
      </header>

      <section className="study-path-router" aria-label="Series filters">
        <div>
          <p className="eyebrow">Choose direction</p>
          <h2>Filter by topic or reader stage</h2>
        </div>
        <form className="study-path-form" method="get">
          <label>
            <span>Topic</span>
            <select name="topic" defaultValue={topic ?? ''}>
              <option value="">All topics</option>
              {seriesTopics.map((value) => (
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
              {seriesAudiences.map((value) => (
                <option key={value} value={value}>
                  {labelFromValue(value)}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Apply</button>
          <Link href="/series">Reset</Link>
        </form>
      </section>

      {items.length > 0 ? (
        <section className="study-path-feature" aria-label="How to choose a series path">
          <div className="study-path-feature-heading">
            <p className="eyebrow">How to choose</p>
            <h2>Every series is a path with ordered parts</h2>
            <p>
              Use the filters above to narrow the paths, then choose one series below. The list is
              the path index: each row shows the audience, topic, number of parts, and next action.
            </p>
          </div>

          <div className="study-path-feature-steps">
            <div>
              <span>01</span>
              <strong>Pick the reader</strong>
              <p>New believer, growing believer, mature believer, or leader.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Pick the topic</strong>
              <p>Christian life, pastoral theology, marriage, or ethics.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Start the path</strong>
              <p>Open one series and follow the lessons in order.</p>
            </div>
          </div>
        </section>
      ) : null}

      {items.length > 0 ? (
        <section className="study-path-list" aria-label="Series learning paths">
          {items.map((series, index) => (
            <article className="study-path-card" key={series.slug}>
              <div className="study-path-number">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="study-path-card-main">
                <p className="study-path-meta">
                  <span>{labelFromValue(series.topic)}</span>
                  <span>{labelFromValue(series.audience)}</span>
                  <span>{series.articleSlugs.length} parts</span>
                </p>
                <h2>{series.title}</h2>
                <p>{series.description}</p>
              </div>
              <div className="study-path-card-action">
                <span>{series.articleSlugs.length > 1 ? 'Ordered path' : 'Short path'}</span>
                <Link href={buildSeriesUrl(series.slug)}>Start path</Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="study-path-empty" aria-live="polite">
          <div>
            <p className="eyebrow">No path found</p>
            <h2>No series match these filters.</h2>
            <p>Reset the filters to see all available study paths again.</p>
          </div>
          <Link href="/series">Clear filters</Link>
        </section>
      )}
    </main>
  )
}
