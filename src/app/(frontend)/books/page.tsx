import Link from 'next/link'

import {
  bookAudienceLabels,
  bookLevelLabels,
  bookTopicLabels,
  buildBookUrl,
  type BookRecommendation,
  listBookAudiences,
  listBookLevels,
  listBooks,
  listBookTopics,
} from '@/lib/books'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function buildBooksUrl(filters: {
  audience?: string
  level?: string
  sort?: string
  topic?: string
}) {
  const params = new URLSearchParams()
  if (filters.topic) params.set('topic', filters.topic)
  if (filters.audience) params.set('audience', filters.audience)
  if (filters.level) params.set('level', filters.level)
  if (filters.sort) params.set('sort', filters.sort)
  const query = params.toString()
  return query ? `/books?${query}` : '/books'
}

function sortBooks(books: BookRecommendation[], sort: string | undefined) {
  const sortedBooks = [...books]

  if (sort === 'topic') {
    return sortedBooks.sort((first, second) => {
      const topicCompare = bookTopicLabels[first.topic].localeCompare(bookTopicLabels[second.topic])
      return topicCompare || first.title.localeCompare(second.title)
    })
  }

  if (sort === 'depth') {
    const depthOrder: Record<BookRecommendation['level'], number> = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
    }
    return sortedBooks.sort((first, second) => {
      const depthCompare = depthOrder[first.level] - depthOrder[second.level]
      return depthCompare || first.title.localeCompare(second.title)
    })
  }

  return sortedBooks.sort((first, second) => first.title.localeCompare(second.title))
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Ajánlott keresztény könyvek és olvasási utak Kovász olvasóknak.',
    path: '/books',
    title: 'Könyvek',
  })
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const topic = getSingleValue(resolvedSearchParams.topic)
  const audience = getSingleValue(resolvedSearchParams.audience)
  const level = getSingleValue(resolvedSearchParams.level)
  const sort = getSingleValue(resolvedSearchParams.sort) ?? 'alphabetical'

  const books = sortBooks(
    listBooks().filter((book) => {
      const topicMatch = !topic || book.topic === topic
      const audienceMatch = !audience || book.audience === audience
      const levelMatch = !level || book.level === level
      return topicMatch && audienceMatch && levelMatch
    }),
    sort,
  )

  return (
    <main className="books-page">
      <header className="books-header">
        <div>
          <p className="eyebrow">Könyvek</p>
          <h1>Ajánlott olvasmányok</h1>
          <p>
            Áttekinthető polc ajánlott keresztény könyvekkel, olvasási útmutatókkal és tanulmányi
            kísérőkkel Szentíráshoz, mindennapi hithez, családi élethez, tanításhoz és vezetéshez.
          </p>
        </div>
      </header>

      <section className="books-library" aria-label="Könyvajánlók">
        <aside className="books-catalog-rail">
          <nav aria-label="Könyv nézetek" className="books-resource-tabs">
            <Link aria-current="page" href="/books">
              Minden könyv
            </Link>
            <Link href={buildBooksUrl({ audience: 'new-believer', sort })}>Új hívők</Link>
            <Link href={buildBooksUrl({ audience: 'leader', sort })}>Vezetők</Link>
            <Link href={buildBooksUrl({ level: 'beginner', sort })}>Kezdők</Link>
          </nav>

          <form action="/books" className="books-filter-form" method="get">
            <label>
              <span>Rendezés</span>
              <select name="sort" defaultValue={sort}>
                <option value="alphabetical">Ábécé szerint</option>
                <option value="topic">Téma szerint</option>
                <option value="depth">Mélység szerint</option>
              </select>
            </label>
            <label>
              <span>Téma</span>
              <select name="topic" defaultValue={topic ?? ''}>
                <option value="">Minden téma</option>
                {listBookTopics().map((value) => (
                  <option key={value} value={value}>
                    {bookTopicLabels[value]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Célcsoport</span>
              <select name="audience" defaultValue={audience ?? ''}>
                <option value="">Minden olvasó</option>
                {listBookAudiences().map((value) => (
                  <option key={value} value={value}>
                    {bookAudienceLabels[value]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Mélység</span>
              <select name="level" defaultValue={level ?? ''}>
                <option value="">Minden mélység</option>
                {listBookLevels().map((value) => (
                  <option key={value} value={value}>
                    {bookLevelLabels[value]}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Szűrők alkalmazása</button>
            <Link href="/books">Szűrők visszaállítása</Link>
          </form>
        </aside>

        <div className="books-catalog">
          <div className="books-catalog-heading">
            <p>{books.length} ajánlás</p>
            <strong>
              {topic ? bookTopicLabels[topic as keyof typeof bookTopicLabels] : 'Minden könyv'}
            </strong>
          </div>

          {books.length ? (
            <ol className="books-list">
              {books.map((book) => (
                <li className="book-list-item" key={book.slug}>
                  <Link
                    className={`book-cover book-cover-${book.coverTone}`}
                    href={buildBookUrl(book.slug)}
                    aria-label={`${book.title} megnyitása`}
                  >
                    <span>{bookTopicLabels[book.topic]}</span>
                    <strong>{book.title}</strong>
                    <small>{book.author}</small>
                  </Link>
                  <div className="book-list-copy">
                    <p className="book-meta">
                      <span>{bookTopicLabels[book.topic]}</span>
                      <span>{bookAudienceLabels[book.audience]}</span>
                      <span>{bookLevelLabels[book.level]}</span>
                    </p>
                    <h2>
                      <Link href={buildBookUrl(book.slug)}>{book.title}</Link>
                    </h2>
                    <p>{book.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <section className="books-empty" aria-live="polite">
              <div>
                <p className="eyebrow">Nincs könyv</p>
                <h2>Nincs ajánlás ezekkel a szűrőkkel.</h2>
                <p>Állítsd vissza a szűrőket, hogy újra lásd a teljes olvasási polcot.</p>
              </div>
              <Link href={buildBooksUrl({})}>Szűrők törlése</Link>
            </section>
          )}
        </div>
      </section>
    </main>
  )
}
