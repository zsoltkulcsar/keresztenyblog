import Image from 'next/image'
import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildAuthorUrl, loadAuthorProfiles } from '@/lib/authors'

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Szerzői profilok a Kovász íróiról és szerkesztőiről.',
    path: '/authors',
    title: 'Szerzők',
  })
}

export default async function AuthorsPage() {
  const authors = await loadAuthorProfiles()

  return (
    <main className="archive-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Szerzők</p>
          <h1>Akik az írások mögött állnak</h1>
          <p className="archive-intro">
            Ismerd meg a szerkesztőket és közreműködőket, akik formálják a kiadványt.
          </p>
        </div>
        <div className="archive-header-meta">
          <span>{authors.length} profil</span>
          <Link className="archive-reset-link" href="/about">
            A Kovászról
          </Link>
        </div>
      </header>

      <section className="author-grid" aria-label="Szerzői profilok">
        {authors.map((author) => (
          <article className="author-card" key={author.slug}>
            <Image
              alt={author.photoAlt}
              className="author-photo"
              height={480}
              src={author.photoSrc}
              width={360}
            />
            <p className="card-meta">
              <span>{author.role}</span>
              <span>{author.articleSlugs.length} cikk</span>
            </p>
            <h2>{author.name}</h2>
            <p>{author.bio}</p>
            <Link className="archive-open-link" href={buildAuthorUrl(author.slug)}>
              Profil megnyitása
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
