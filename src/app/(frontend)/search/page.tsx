import Link from 'next/link'

import { buildSearchUrl, createEditorialSearch } from '@/lib/editorial-search'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'

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
      return 'Cikk'
    case 'author':
      return 'Szerző'
    case 'dailyVerse':
      return 'Napi ige'
    case 'resource':
      return 'Forrás'
    case 'series':
      return 'Sorozat'
    default:
      return type
  }
}

export function generateMetadata({
  searchParams,
}: {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  return Promise.resolve(searchParams ?? {}).then((resolvedSearchParams) => {
    const q = getSingleValue(resolvedSearchParams.q)?.trim() ?? ''
    const path = q ? `/search?q=${encodeURIComponent(q)}` : '/search'

    return buildDiscoveryMetadata({
      description: 'Keresés cikkek, sorozatok, szerzők, források és napi igék között.',
      path,
      title: q ? `Keresési találatok erre: ${q}` : 'Keresés a kiadványban',
      type: 'website',
    })
  })
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const search = createEditorialSearch(resolveSearchParams(resolvedSearchParams))

  return (
    <main className="search-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Keresés</p>
          <h1>Keresés a kiadványban</h1>
          <p className="archive-intro">
            Keress cikkek, sorozatok, szerzők, források és napi igék között. A keresés az URL-ben
            marad, így az eredmény később megosztható vagy újra megnyitható.
          </p>
        </div>

        <div className="archive-header-meta">
          <span>
            {search.hasQuery
              ? `${search.totalResults} találat`
              : 'Nincsenek legutóbbi keresések'}
          </span>
          <Link className="archive-reset-link" href="/search">
            Keresés visszaállítása
          </Link>
        </div>
      </header>

      <section className="archive-toolbar" aria-label="Keresőmező">
        <form action="/search" className="search-form" method="get">
          <label className="search-field">
            <span>Keresési kifejezés</span>
            <input
              autoComplete="off"
              defaultValue={search.query}
              name="q"
              placeholder="Szentírás, sorozat, szerző, forrás..."
              type="search"
            />
          </label>

          <button type="submit">Keresés</button>
        </form>

        {!search.hasQuery ? (
          <p className="archive-summary">
            Kezdj egy címmel, témával, szerzővel vagy Szentíráshoz kapcsolódó kifejezéssel.
          </p>
        ) : (
          <p className="archive-summary">
            Találatok erre: <strong>{search.query}</strong>.
          </p>
        )}
      </section>

      {!search.hasQuery ? (
        <section className="archive-empty" aria-live="polite">
          <div>
            <p className="eyebrow">Legutóbbi keresések</p>
            <h2>Még nincsenek elmentett legutóbbi keresések.</h2>
            <p>
              A keresés szerkesztőségi felfedezésre van hangolva, ezért általában egy rövid téma
              vagy bibliai kifejezés működik legjobban.
            </p>
          </div>
          <Link className="archive-reset-link" href={buildSearchUrl('scripture')}>
            Próbáld: &quot;Szentírás&quot;
          </Link>
        </section>
      ) : search.results.length > 0 ? (
        <section className="archive-grid" aria-label="Search results">
          {search.results.map((result) => (
            <article className="archive-item" key={`${result.type}-${result.title}`}>
              <p className="card-meta">
                <span>{typeLabel(result.type)}</span>
                <span>{result.tags[0] ?? 'Szerkesztőség'}</span>
              </p>
              <h2>{result.title}</h2>
              <p>{result.excerpt}</p>
              <div className="lead-links">
                <Link href={result.href}>Találat megnyitása</Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="archive-empty" aria-live="polite">
          <div>
            <p className="eyebrow">Nincs találat</p>
            <h2>Nincs egyezés erre: &quot;{search.query}&quot;.</h2>
            <p>
              Próbálj tágabb témát, rövidebb kifejezést vagy más kategóriát, például Szentírás,
              család vagy vezetés.
            </p>
          </div>
          <Link className="archive-reset-link" href="/search">
            Keresés törlése
          </Link>
        </section>
      )}
    </main>
  )
}
