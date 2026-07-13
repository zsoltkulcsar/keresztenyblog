import Link from 'next/link'

export default function ArticleNotFound() {
  return (
    <main className="archive-page">
      <section className="archive-empty" aria-live="polite">
        <div>
          <p className="eyebrow">A cikk nem található</p>
          <h2>Ez a cikk jelenleg nem elérhető.</h2>
          <p>Térj vissza az archívumba, vagy keress másik útvonalat a tartalomhoz.</p>
        </div>
        <Link className="archive-reset-link" href="/articles">
          Vissza az archívumba
        </Link>
      </section>
    </main>
  )
}
