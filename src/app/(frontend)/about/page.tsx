import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { loadAboutPageContent } from '@/lib/about'

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Mission, doctrine, and editorial posture for Kovasz.',
    path: '/about',
    title: 'About',
  })
}

export default async function AboutPage() {
  const about = await loadAboutPageContent()

  const sections = [
    { body: about.manifesto, title: 'Manifesto' },
    { body: about.mission, title: 'Mission' },
    { body: about.doctrine, title: 'Faith and doctrine' },
    { body: about.editorialPosture, title: 'Editorial posture' },
    { body: about.visualIdentity, title: 'Visual identity' },
  ]

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
          <Link className="archive-reset-link" href="/authors">
            Authors
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

      <section className="about-grid" aria-label="Team and contact">
        <article className="about-panel">
          <p className="eyebrow">Team</p>
          <h2>Who shapes the publication</h2>
          <div className="about-list">
            {about.teamMembers.map((member) => (
              <div className="about-list-item" key={member.name}>
                <h3>{member.name}</h3>
                <p className="about-role">{member.role}</p>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="about-panel">
          <p className="eyebrow">Contact</p>
          <h2>How to reach Kovasz</h2>
          <div className="about-links">
            {about.contactLinks.map((link) => (
              <Link href={link.url} key={link.url}>
                {link.label}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}
