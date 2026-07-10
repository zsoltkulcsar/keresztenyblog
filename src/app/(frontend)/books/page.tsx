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
    description: 'Recommended Christian books and reading paths for Kovasz readers.',
    path: '/books',
    title: 'Books',
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
          <p className="eyebrow">Books</p>
          <h1>Books</h1>
          <p>
            A browseable shelf of recommended Christian books, reading guides, and study companions
            for Scripture, daily faith, family life, doctrine, and leadership.
          </p>
        </div>
      </header>

      <section className="books-library" aria-label="Book recommendations">
        <aside className="books-catalog-rail">
          <nav aria-label="Book views" className="books-resource-tabs">
            <Link aria-current="page" href="/books">
              All Books
            </Link>
            <Link href={buildBooksUrl({ audience: 'new-believer', sort })}>New believers</Link>
            <Link href={buildBooksUrl({ audience: 'leader', sort })}>Leaders</Link>
            <Link href={buildBooksUrl({ level: 'beginner', sort })}>Beginner</Link>
          </nav>

          <form action="/books" className="books-filter-form" method="get">
            <label>
              <span>Sort</span>
              <select name="sort" defaultValue={sort}>
                <option value="alphabetical">Alphabetical</option>
                <option value="topic">Topic</option>
                <option value="depth">Depth</option>
              </select>
            </label>
            <label>
              <span>Topic</span>
              <select name="topic" defaultValue={topic ?? ''}>
                <option value="">All topics</option>
                {listBookTopics().map((value) => (
                  <option key={value} value={value}>
                    {bookTopicLabels[value]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Audience</span>
              <select name="audience" defaultValue={audience ?? ''}>
                <option value="">All readers</option>
                {listBookAudiences().map((value) => (
                  <option key={value} value={value}>
                    {bookAudienceLabels[value]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Depth</span>
              <select name="level" defaultValue={level ?? ''}>
                <option value="">All depths</option>
                {listBookLevels().map((value) => (
                  <option key={value} value={value}>
                    {bookLevelLabels[value]}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Apply filters</button>
            <Link href="/books">Reset filters</Link>
          </form>
        </aside>

        <div className="books-catalog">
          <div className="books-catalog-heading">
            <p>{books.length} recommendations</p>
            <strong>
              {topic ? bookTopicLabels[topic as keyof typeof bookTopicLabels] : 'All books'}
            </strong>
          </div>

          {books.length ? (
            <ol className="books-list">
              {books.map((book) => (
                <li className="book-list-item" key={book.slug}>
                  <Link
                    className={`book-cover book-cover-${book.coverTone}`}
                    href={buildBookUrl(book.slug)}
                    aria-label={`Open ${book.title}`}
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
                <p className="eyebrow">No books found</p>
                <h2>No recommendations match these filters.</h2>
                <p>Reset the filters to see the whole reading shelf again.</p>
              </div>
              <Link href={buildBooksUrl({})}>Clear filters</Link>
            </section>
          )}
        </div>
      </section>
    </main>
  )
}
