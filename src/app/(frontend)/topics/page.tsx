import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildTaxonomyUrl, loadTaxonomyIndex } from '@/lib/taxonomy'

export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description:
      'Browse Kovasz articles, series, and resources by theological and daily-life topic.',
    path: '/topics',
    title: 'Topics',
  })
}

export default async function TopicsPage() {
  const topics = await loadTaxonomyIndex('topic')

  return (
    <main className="taxonomy-page">
      <header className="taxonomy-header">
        <p className="eyebrow">Topics</p>
        <h1>Browse by topic</h1>
        <p>
          Find Scripture-first teaching grouped by doctrine, Christian life, family, ethics,
          leadership, and other recurring questions.
        </p>
      </header>

      <section className="taxonomy-grid" aria-label="Topic list">
        {topics.map((topic) => (
          <Link
            className="taxonomy-card"
            href={buildTaxonomyUrl('topic', topic.value)}
            key={topic.value}
          >
            <span>{topic.label}</span>
            <small>
              {topic.articleCount} articles / {topic.seriesCount} series / {topic.resourceCount}{' '}
              resources
            </small>
          </Link>
        ))}
      </section>
    </main>
  )
}
