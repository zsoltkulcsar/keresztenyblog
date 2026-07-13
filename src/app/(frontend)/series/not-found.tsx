import Link from 'next/link'

export default function SeriesNotFound() {
  return (
    <main className="archive-page">
      <section className="archive-empty" aria-live="polite">
        <div>
          <p className="eyebrow">A sorozat nem található</p>
          <h2>Ez a sorozat jelenleg nem elérhető.</h2>
          <p>Térj vissza a sorozatokhoz, és válassz másik tanulási utat.</p>
        </div>
        <Link className="archive-reset-link" href="/series">
          Vissza a sorozatokhoz
        </Link>
      </section>
    </main>
  )
}
