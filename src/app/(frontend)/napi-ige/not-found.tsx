import Link from 'next/link'

export default function DailyVerseNotFound() {
  return (
    <main className="archive-page">
      <section className="archive-empty" aria-live="polite">
        <div>
          <p className="eyebrow">A napi ige nem található</p>
          <h2>Ez az ige jelenleg nem elérhető.</h2>
          <p>Térj vissza az archívumba, és böngéssz más igei bejegyzéseket.</p>
        </div>
        <Link className="archive-reset-link" href="/napi-ige">
          Vissza az archívumba
        </Link>
      </section>
    </main>
  )
}
