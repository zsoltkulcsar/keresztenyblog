import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildTaxonomyUrl, loadTaxonomyIndex } from '@/lib/taxonomy'

export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description:
      'Böngészd a Kovász cikkeit, sorozatait és forrásait teológiai és mindennapi témák szerint.',
    path: '/topics',
    title: 'Témák',
  })
}

export default async function TopicsPage() {
  const topics = await loadTaxonomyIndex('topic')

  return (
    <main className="taxonomy-page">
      <header className="taxonomy-header">
        <p className="eyebrow">Témák</p>
        <h1>Böngészés témák szerint</h1>
        <p>
          Ige-központú tanítások tanítás, keresztény élet, család, etika, vezetés és más visszatérő
          kérdések szerint rendezve.
        </p>
      </header>

      <section className="taxonomy-grid" aria-label="Témák listája">
        {topics.map((topic) => (
          <Link
            className="taxonomy-card"
            href={buildTaxonomyUrl('topic', topic.value)}
            key={topic.value}
          >
            <span>{topic.label}</span>
            <small>
              {topic.articleCount} cikk / {topic.seriesCount} sorozat / {topic.resourceCount}{' '}
              forrás
            </small>
          </Link>
        ))}
      </section>
    </main>
  )
}
