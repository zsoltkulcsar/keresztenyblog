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

function bookFormatLabel(format: string) {
  const labels: Record<string, string> = {
    book: 'Könyv',
    'reading-list': 'Olvasási lista',
    'study-companion': 'Tanulmányi kísérő',
  }

  return labels[format] ?? format
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
        description: 'A könyvajánló nem található',
        noIndex: true,
        path: buildBookUrl(slug),
        title: 'A könyv nem található',
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
        <div className="book-detail-copy">
          <Link className="book-back-link" href="/books">
            Könyvek
          </Link>
          <p className="eyebrow">{bookTopicLabels[book.topic]}</p>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
          <dl className="book-detail-meta-row">
            <div>
              <dt>Célcsoport</dt>
              <dd>{bookAudienceLabels[book.audience]}</dd>
            </div>
            <div>
              <dt>Mélység</dt>
              <dd>{bookLevelLabels[book.level]}</dd>
            </div>
            <div>
              <dt>Forma</dt>
              <dd>{bookFormatLabel(book.format)}</dd>
            </div>
            <div>
              <dt>Szerző</dt>
              <dd>{book.author}</dd>
            </div>
          </dl>
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
            <h2>Miért ajánljuk?</h2>
            <p>{book.recommendation}</p>
          </div>
        </aside>
      </header>

      <section className="book-detail-layout">
        <section className="book-detail-section book-detail-intro">
          <div>
            <p className="eyebrow">Miről szól?</p>
            <h2>Miért érdemes kézbe venni?</h2>
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
            <p className="eyebrow">Hogyan olvasd?</p>
            <h2>Javasolt olvasási ritmus</h2>
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
              <p className="eyebrow">Olvasói visszajelzések</p>
              <h2>Értékeld vagy egészítsd ki az ajánlást</h2>
            </div>
            <p>
              A hozzászólások abban segítsenek, hogy más olvasók eldönthessék, illik-e ez az
              ajánlás a kérdésükhöz, életszakaszukhoz vagy csoportjukhoz.
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
                        <span>Szerkesztőségi válasz</span>
                        <p>{comment.response}</p>
                      </div>
                    ) : null}
                  </article>
                ))
              ) : (
                <article className="book-comment">
                  <strong>Még nincs olvasói visszajelzés</strong>
                  <p>Írd le elsőként, hogyan segítette ez az ajánlás az olvasásodat.</p>
                </article>
              )}
            </div>

            <form className="book-comment-form">
              <label>
                <span>Név</span>
                <input name="name" placeholder="Neved" type="text" />
              </label>
              <label>
                <span>Visszajelzésed</span>
                <textarea name="comment" placeholder="Miben segített ez az ajánlás?" rows={5} />
              </label>
              <button type="button">Beküldés átnézésre</button>
              <p>A hozzászólások élesítés előtt moderálást és mentést kapnak.</p>
            </form>
          </div>
        </section>

        {relatedBooks.length ? (
          <section className="book-detail-section">
            <div>
              <p className="eyebrow">Kapcsolódó könyvek</p>
              <h2>Folytasd az olvasási polcot</h2>
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
