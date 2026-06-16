import Link from 'next/link'

export default function DailyVerseNotFound() {
  return (
    <main className="archive-page">
      <section className="archive-empty" aria-live="polite">
        <div>
          <p className="eyebrow">Daily Verse not found</p>
          <h2>This verse is not available.</h2>
          <p>Return to the archive to browse other Scripture entries.</p>
        </div>
        <Link className="archive-reset-link" href="/napi-ige">
          Back to archive
        </Link>
      </section>
    </main>
  )
}

