import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildTaxonomyUrl, loadTaxonomyIndex } from '@/lib/taxonomy'

export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Browse Kovasz content by reader stage and pastoral need.',
    path: '/audiences',
    title: 'Audiences',
  })
}

export default async function AudiencesPage() {
  const audiences = await loadTaxonomyIndex('audience')

  return (
    <main className="taxonomy-page">
      <header className="taxonomy-header">
        <p className="eyebrow">Audiences</p>
        <h1>Browse by reader</h1>
        <p>
          Start with the reader in front of the question: new believers, mature readers, families,
          leaders, and others who need practical biblical guidance.
        </p>
      </header>

      <section className="taxonomy-grid" aria-label="Audience list">
        {audiences.map((audience) => (
          <Link
            className="taxonomy-card"
            href={buildTaxonomyUrl('audience', audience.value)}
            key={audience.value}
          >
            <span>{audience.label}</span>
            <small>
              {audience.articleCount} articles / {audience.seriesCount} series /{' '}
              {audience.resourceCount} resources
            </small>
          </Link>
        ))}
      </section>
    </main>
  )
}
