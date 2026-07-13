import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildDailyVerseUrl, createDailyVerseEntry } from '@/lib/daily-verse'

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
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
    const entry = createDailyVerseEntry(slug)

    if (!entry) {
      return buildDiscoveryMetadata({
        description: 'A napi ige nem található',
        noIndex: true,
        path: buildDailyVerseUrl(slug),
        title: 'A napi ige nem található',
      })
    }

    return buildDiscoveryMetadata({
      description: entry.note,
      path: buildDailyVerseUrl(slug),
      title: entry.reference,
    })
  })
}

export default async function DailyVerseDetail({
  params,
}: {
  params?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = getSingleValue(resolvedParams.slug) ?? ''
  const entry = createDailyVerseEntry(slug)

  if (!entry) {
    notFound()
  }

  return (
    <main className="archive-page">
      <article className="article-header">
        <div className="article-kicker-row">
          <p className="eyebrow">Napi ige</p>
          <p className="article-meta-inline">
            <span>{entry.reference}</span>
            <span>{entry.date}</span>
          </p>
        </div>
        <h1>{entry.reference}</h1>
        <p className="article-subtitle">{entry.note}</p>
      </article>

      <section className="scripture-block">
        <div>
          <p className="eyebrow">Ige</p>
          <h2>{entry.reference}</h2>
        </div>
        <blockquote>{entry.text}</blockquote>
      </section>

      <section className="archive-empty">
        <div>
          <p className="eyebrow">Archívum</p>
          <h2>További napi olvasmányok</h2>
          <p>Térj vissza az archívumba, és folytasd a napi igei ritmust.</p>
        </div>
        <Link className="archive-reset-link" href="/napi-ige">
          Vissza az archívumba
        </Link>
      </section>

      <section className="page-links" aria-label="Napi ige útvonalak">
        <Link className="page-link" href="/articles">
          Cikkek
        </Link>
        <Link className="page-link" href="/series">
          Sorozatok
        </Link>
        <Link className="page-link" href="/resources">
          Források
        </Link>
        <Link className="page-link" href="/about">
          A Kovászról
        </Link>
      </section>
    </main>
  )
}
