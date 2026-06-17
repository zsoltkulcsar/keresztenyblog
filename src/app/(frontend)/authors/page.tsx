import Image from 'next/image'
import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildAuthorUrl, loadAuthorProfiles } from '@/lib/authors'

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Author profiles for the writers and editors behind Kovasz.',
    path: '/authors',
    title: 'Authors',
  })
}

export default async function AuthorsPage() {
  const authors = await loadAuthorProfiles()

  return (
    <main className="archive-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Authors</p>
          <h1>People behind the writing</h1>
          <p className="archive-intro">
            Meet the editors and contributors shaping the publication.
          </p>
        </div>
        <div className="archive-header-meta">
          <span>{authors.length} profiles</span>
          <Link className="archive-reset-link" href="/about">
            About Kovasz
          </Link>
        </div>
      </header>

      <section className="author-grid" aria-label="Author profiles">
        {authors.map((author) => (
          <article className="author-card" key={author.slug}>
            <Image alt={author.photoAlt} className="author-photo" height={480} src={author.photoSrc} width={360} />
            <p className="card-meta">
              <span>{author.role}</span>
              <span>{author.articleSlugs.length} articles</span>
            </p>
            <h2>{author.name}</h2>
            <p>{author.bio}</p>
            <Link className="archive-open-link" href={buildAuthorUrl(author.slug)}>
              Open profile
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
