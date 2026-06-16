import Link from 'next/link'

export default function ArticleNotFound() {
  return (
    <main className="archive-page">
      <section className="archive-empty" aria-live="polite">
        <div>
          <p className="eyebrow">Article not found</p>
          <h2>This article is not available.</h2>
          <p>Return to the archive or search the publication for another route into the content.</p>
        </div>
        <Link className="archive-reset-link" href="/articles">
          Back to archive
        </Link>
      </section>
    </main>
  )
}

