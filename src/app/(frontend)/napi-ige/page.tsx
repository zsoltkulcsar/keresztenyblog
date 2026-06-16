import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildDailyVerseUrl, listDailyVerseEntries } from '@/lib/daily-verse'

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function pageLabel(total: number, page: number) {
  return `Page ${page} of ${Math.max(1, Math.ceil(total / 4))}`
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Browse the Daily Verse archive on Kovasz.',
    path: '/napi-ige',
    title: 'Daily Verse',
  })
}

export default async function DailyVerseArchive({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
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
          <p className="eyebrow">Daily Verse</p>
          <h1>Archive of Scripture for the day</h1>
          <p className="archive-intro">
            Browse short daily Scripture readings with stable date-based links.
          </p>
        </div>

        <div className="archive-header-meta">
          <span>{pageLabel(entries.length, safePage)}</span>
          <Link className="archive-reset-link" href="/napi-ige">
            Reset archive
          </Link>
        </div>
      </header>

      <section className="archive-grid" aria-label="Daily Verse archive">
        {slice.map((entry) => (
          <article className="archive-item" key={entry.slug}>
            <p className="card-meta">
              <span>{entry.reference}</span>
              <span>{entry.date}</span>
            </p>
            <h2>{entry.text}</h2>
            <p>{entry.note}</p>
            <Link className="archive-open-link" href={buildDailyVerseUrl(entry.slug)}>
              Open verse
            </Link>
          </article>
        ))}
      </section>

      {totalPages > 1 ? (
        <nav className="archive-pagination" aria-label="Daily Verse pagination">
          <Link
            aria-disabled={safePage === 1}
            className="pagination-link"
            href={safePage === 1 ? '/napi-ige' : `/napi-ige?page=${safePage - 1}`}
            tabIndex={safePage === 1 ? -1 : 0}
          >
            Previous
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
            href={safePage === totalPages ? `/napi-ige?page=${totalPages}` : `/napi-ige?page=${safePage + 1}`}
            tabIndex={safePage === totalPages ? -1 : 0}
          >
            Next
          </Link>
        </nav>
      ) : null}
    </main>
  )
}

