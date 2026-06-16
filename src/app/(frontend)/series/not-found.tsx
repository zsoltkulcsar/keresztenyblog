import Link from 'next/link'

export default function SeriesNotFound() {
  return (
    <main className="archive-page">
      <section className="archive-empty" aria-live="polite">
        <div>
          <p className="eyebrow">Series not found</p>
          <h2>This series is not available.</h2>
          <p>Return to the series index to find another learning path.</p>
        </div>
        <Link className="archive-reset-link" href="/series">
          Back to series
        </Link>
      </section>
    </main>
  )
}

