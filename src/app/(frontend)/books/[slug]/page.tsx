import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  bookAudienceLabels,
  bookLevelLabels,
  bookTopicLabels,
  buildBookUrl,
  getBookBySlug,
  listBooks,
} from '@/lib/books'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'

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
    const book = getBookBySlug(slug)

    if (!book) {
      return buildDiscoveryMetadata({
        description: 'Book recommendation not found',
        noIndex: true,
        path: buildBookUrl(slug),
        title: 'Book not found',
      })
    }

    return buildDiscoveryMetadata({
      description: book.description,
      path: buildBookUrl(book.slug),
      title: book.title,
    })
  })
}

export default async function BookDetailPage({
  params,
}: {
  params?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = getSingleValue(resolvedParams.slug) ?? ''
  const book = getBookBySlug(slug)

  if (!book) {
    notFound()
  }

  const relatedBooks = listBooks()
    .filter(
      (item) =>
        item.slug !== book.slug && (item.topic === book.topic || item.audience === book.audience),
    )
    .slice(0, 3)

  return (
    <main className="book-detail-page">
      <header className="book-detail-header">
        <div>
          <Link className="book-back-link" href="/books">
            Books
          </Link>
          <p className="eyebrow">{bookTopicLabels[book.topic]}</p>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
        </div>
        <aside className="book-detail-side">
          <div
            className={`book-cover book-cover-large book-cover-${book.coverTone}`}
            aria-hidden="true"
          >
            <span>{bookTopicLabels[book.topic]}</span>
            <strong>{book.title}</strong>
            <small>{book.author}</small>
          </div>
          <div className="book-recommendation-card">
            <span>{bookLevelLabels[book.level]}</span>
            <h2>Why we recommend it</h2>
            <p>{book.recommendation}</p>
          </div>
        </aside>
      </header>

      <section className="book-detail-layout">
        <section className="book-detail-section book-detail-intro">
          <div>
            <p className="eyebrow">What it is about</p>
            <h2>A recommendation for careful reading</h2>
          </div>
          <div>
            <p>{book.whyRead}</p>
            <div className="book-highlight-list">
              {book.highlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="book-detail-section">
          <div>
            <p className="eyebrow">Who it helps</p>
            <h2>Reader fit</h2>
          </div>
          <dl className="book-facts">
            <div>
              <dt>Audience</dt>
              <dd>{bookAudienceLabels[book.audience]}</dd>
            </div>
            <div>
              <dt>Depth</dt>
              <dd>{bookLevelLabels[book.level]}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{book.format.replace('-', ' ')}</dd>
            </div>
            <div>
              <dt>Author</dt>
              <dd>{book.author}</dd>
            </div>
          </dl>
        </section>

        <section className="book-detail-section">
          <div>
            <p className="eyebrow">How to read it</p>
            <h2>Suggested reading rhythm</h2>
          </div>
          <ol className="book-reading-plan">
            {book.readingPlan.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="book-comments-section">
          <div className="book-comments-heading">
            <div>
              <p className="eyebrow">Reader responses</p>
              <h2>Review or respond to the recommendation</h2>
            </div>
            <p>
              Comments should help other readers decide whether this recommendation fits their
              question, season, or group.
            </p>
          </div>

          <div className="book-comments-layout">
            <div className="book-comment-list">
              {book.comments.length ? (
                book.comments.map((comment) => (
                  <article className="book-comment" key={`${comment.name}-${comment.body}`}>
                    <strong>{comment.name}</strong>
                    <p>{comment.body}</p>
                    {comment.response ? (
                      <div>
                        <span>Editorial response</span>
                        <p>{comment.response}</p>
                      </div>
                    ) : null}
                  </article>
                ))
              ) : (
                <article className="book-comment">
                  <strong>No reader reviews yet</strong>
                  <p>Be the first to explain how this recommendation helped your reading.</p>
                </article>
              )}
            </div>

            <form className="book-comment-form">
              <label>
                <span>Name</span>
                <input name="name" placeholder="Your name" type="text" />
              </label>
              <label>
                <span>Your review</span>
                <textarea name="comment" placeholder="How did this recommendation help?" rows={5} />
              </label>
              <button type="button">Submit for review</button>
              <p>Prototype only: comments will need moderation and persistence before launch.</p>
            </form>
          </div>
        </section>

        {relatedBooks.length ? (
          <section className="book-detail-section">
            <div>
              <p className="eyebrow">Related books</p>
              <h2>Continue the shelf</h2>
            </div>
            <div className="book-related-list">
              {relatedBooks.map((item) => (
                <Link href={buildBookUrl(item.slug)} key={item.slug}>
                  <span>{bookTopicLabels[item.topic]}</span>
                  <strong>{item.title}</strong>
                  <small>{bookAudienceLabels[item.audience]}</small>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  )
}
