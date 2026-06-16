import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'

const sections = [
  {
    body: 'Kovasz exists to deepen understanding of the Bible, guide spiritual life, and support daily Christian growth for new and mature believers alike.',
    title: 'Mission',
  },
  {
    body: 'The publication keeps Scripture at the center of every article, series, testimony, and daily verse. Translation work from trusted partners is allowed and clearly labeled.',
    title: 'Editorial posture',
  },
  {
    body: 'The site should remain calm, serious, and readable: a dark editorial frame, strong hierarchy, and no decorative noise that competes with the text.',
    title: 'Visual identity',
  },
]

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Mission, doctrine, and editorial posture for Kovasz.',
    path: '/about',
    title: 'About',
  })
}

export default function AboutPage() {
  return (
    <main className="archive-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">About</p>
          <h1>Mission, doctrine, and editorial posture</h1>
          <p className="archive-intro">
            Kovasz is a Hungarian Christian journal for articles, series, daily Scripture, and practical resources.
          </p>
        </div>
        <div className="archive-header-meta">
          <span>Trust page</span>
          <Link className="archive-reset-link" href="/resources">
            Resources
          </Link>
        </div>
      </header>

      <section className="archive-grid" aria-label="About sections">
        {sections.map((section) => (
          <article className="archive-item" key={section.title}>
            <p className="card-meta">
              <span>About</span>
              <span>Kovasz</span>
            </p>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
