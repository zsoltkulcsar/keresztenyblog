import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'

const resources = [
  {
    description: 'Curated books and essays that help readers understand Scripture with more depth.',
    href: '/articles/how-to-read-the-bible-when-stuck',
    title: 'Bible study aids',
    type: 'Study guide',
  },
  {
    description: 'A practical path for readers who want to move through a topic with a steady sequence.',
    href: '/series/foundations',
    title: 'Foundations series',
    type: 'Series',
  },
  {
    description: 'Short Scripture readings for the day with archive access and stable links.',
    href: '/napi-ige',
    title: 'Daily Verse archive',
    type: 'Daily Scripture',
  },
]

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Study aids, books, and other practical resources for readers of Kovasz.',
    path: '/resources',
    title: 'Resources',
  })
}

export default function ResourcesPage() {
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
          <article className="archive-item" key={resource.title}>
            <p className="card-meta">
              <span>{resource.type}</span>
              <span>Curated</span>
            </p>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <Link className="archive-open-link" href={resource.href}>
              Open resource
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
