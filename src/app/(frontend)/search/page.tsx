import Link from 'next/link'

import { buildSearchUrl, createEditorialSearch } from '@/lib/editorial-search'

type SearchPageProps = {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function resolveSearchParams(searchParams: Record<string, string | string[] | undefined>) {
  return {
    q: getSingleValue(searchParams.q),
  }
}

function typeLabel(type: string) {
  switch (type) {
    case 'article':
      return 'Article'
    case 'author':
      return 'Author'
    case 'dailyVerse':
      return 'Daily Verse'
    case 'resource':
      return 'Resource'
    case 'series':
      return 'Series'
    default:
      return type
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const search = createEditorialSearch(resolveSearchParams(resolvedSearchParams))

  return (
    <main className="search-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Search</p>
          <h1>Search the publication</h1>
          <p className="archive-intro">
            Search across articles, series, authors, resources, and Daily Verse. The query stays
            in the URL so the result can be shared or reopened later.
          </p>
        </div>

        <div className="archive-header-meta">
          <span>{search.hasQuery ? `${search.totalResults} result${search.totalResults === 1 ? '' : 's'}` : 'No recent searches'}</span>
          <Link className="archive-reset-link" href="/search">
            Reset search
          </Link>
        </div>
      </header>

      <section className="archive-toolbar" aria-label="Search input">
        <form action="/search" className="search-form" method="get">
          <label className="search-field">
            <span>Search term</span>
            <input
              autoComplete="off"
              defaultValue={search.query}
              name="q"
              placeholder="Scripture, series, author, resource..."
              type="search"
            />
          </label>

          <button type="submit">Search</button>
        </form>

        {!search.hasQuery ? (
          <p className="archive-summary">
            Start with a title, topic, author, or Scripture-related term.
          </p>
        ) : (
          <p className="archive-summary">
            Showing results for <strong>{search.query}</strong>.
          </p>
        )}
      </section>

      {!search.hasQuery ? (
        <section className="archive-empty" aria-live="polite">
          <div>
            <p className="eyebrow">Recent searches</p>
            <h2>No recent searches are stored yet.</h2>
            <p>
              Search is tuned for editorial discovery, so a short topic or biblical phrase usually works best.
            </p>
          </div>
          <Link className="archive-reset-link" href={buildSearchUrl('scripture')}>
            Try &quot;scripture&quot;
          </Link>
        </section>
      ) : search.results.length > 0 ? (
        <section className="archive-grid" aria-label="Search results">
          {search.results.map((result) => (
            <article className="archive-item" key={`${result.type}-${result.title}`}>
              <p className="card-meta">
                <span>{typeLabel(result.type)}</span>
                <span>{result.tags[0] ?? 'Editorial'}</span>
              </p>
              <h2>{result.title}</h2>
              <p>{result.excerpt}</p>
              <div className="lead-links">
                <Link href={result.href}>Open result</Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="archive-empty" aria-live="polite">
          <div>
            <p className="eyebrow">No results</p>
            <h2>No matches found for &quot;{search.query}&quot;.</h2>
            <p>
              Try a broader topic, a shorter phrase, or a different category like Scripture, family, or leadership.
            </p>
          </div>
          <Link className="archive-reset-link" href="/search">
            Clear search
          </Link>
        </section>
      )}
    </main>
  )
}
