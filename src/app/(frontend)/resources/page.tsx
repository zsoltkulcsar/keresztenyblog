import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildResourceUrl, loadResourceItems } from '@/lib/resources'

function typeLabel(value: string) {
  const labels: Record<string, string> = {
    article: 'Article',
    book: 'Book',
    file: 'File',
    link: 'Link',
    series: 'Series',
    'study-guide': 'Study guide',
  }

  return labels[value] ?? value
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Study aids, books, and other practical resources for readers of Kovasz.',
    path: '/resources',
    title: 'Resources',
  })
}

export default async function ResourcesPage() {
  const resources = await loadResourceItems()

  return (
    <main className="archive-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Resources</p>
          <h1>Practical study tools</h1>
          <p className="archive-intro">
            Study aids, curated reading, and useful links for readers who want to keep learning.
          </p>
        </div>
        <div className="archive-header-meta">
          <span>Curated tools</span>
          <Link className="archive-reset-link" href="/about">
            Editorial posture
          </Link>
        </div>
      </header>

      <section className="archive-grid" aria-label="Resources list">
        {resources.map((resource) => (
          <article className="archive-item" key={resource.slug}>
            <p className="card-meta">
              <span>{typeLabel(resource.type)}</span>
              <span>{resource.usefulness}</span>
            </p>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <Link className="archive-open-link" href={buildResourceUrl(resource.slug)}>
              Open resource
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
