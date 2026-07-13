import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildDailyVerseUrl, listDailyVerseEntries } from '@/lib/daily-verse'

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function pageLabel(total: number, page: number) {
  return `${page}. oldal / ${Math.max(1, Math.ceil(total / 4))}`
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Böngészd a Kovász napi ige archívumát.',
    path: '/napi-ige',
    title: 'Napi ige',
  })
}

export default async function DailyVerseArchive({
  searchParams,
}: {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const page = Number.parseInt(getSingleValue(resolvedSearchParams.page) ?? '1', 10)
  const currentPage = Number.isFinite(page) && page > 0 ? page : 1
  const entries = listDailyVerseEntries()
  const pageSize = 4
  const totalPages = Math.max(1, Math.ceil(entries.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const slice = entries.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <main className="archive-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Napi ige</p>
          <h1>Napi igék archívuma</h1>
          <p className="archive-intro">
            Rövid napi igeolvasások stabil, dátum szerinti hivatkozásokkal.
          </p>
        </div>

        <div className="archive-header-meta">
          <span>{pageLabel(entries.length, safePage)}</span>
          <Link className="archive-reset-link" href="/napi-ige">
            Archívum visszaállítása
          </Link>
        </div>
      </header>

      <section className="archive-grid" aria-label="Napi ige archívum">
        {slice.map((entry) => (
          <article className="archive-item" key={entry.slug}>
            <p className="card-meta">
              <span>{entry.reference}</span>
              <span>{entry.date}</span>
            </p>
            <h2>{entry.text}</h2>
            <p>{entry.note}</p>
            <Link className="archive-open-link" href={buildDailyVerseUrl(entry.slug)}>
              Ige megnyitása
            </Link>
          </article>
        ))}
      </section>

      {totalPages > 1 ? (
        <nav className="archive-pagination" aria-label="Napi ige lapozás">
          <Link
            aria-disabled={safePage === 1}
            className="pagination-link"
            href={safePage === 1 ? '/napi-ige' : `/napi-ige?page=${safePage - 1}`}
            tabIndex={safePage === 1 ? -1 : 0}
          >
            Előző
          </Link>
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, index) => {
              const itemPage = index + 1
              return (
                <Link
                  aria-current={itemPage === safePage ? 'page' : undefined}
                  className="pagination-link"
                  href={`/napi-ige?page=${itemPage}`}
                  key={itemPage}
                >
                  {itemPage}
                </Link>
              )
            })}
          </div>
          <Link
            aria-disabled={safePage === totalPages}
            className="pagination-link"
            href={
              safePage === totalPages
                ? `/napi-ige?page=${totalPages}`
                : `/napi-ige?page=${safePage + 1}`
            }
            tabIndex={safePage === totalPages ? -1 : 0}
          >
            Következő
          </Link>
        </nav>
      ) : null}
    </main>
  )
}
