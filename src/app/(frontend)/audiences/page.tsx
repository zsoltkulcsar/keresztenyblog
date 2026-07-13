import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildTaxonomyUrl, loadTaxonomyIndex } from '@/lib/taxonomy'

export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Böngészd a Kovász tartalmait olvasói szakasz és pásztori szükség szerint.',
    path: '/audiences',
    title: 'Célcsoportok',
  })
}

export default async function AudiencesPage() {
  const audiences = await loadTaxonomyIndex('audience')

  return (
    <main className="taxonomy-page">
      <header className="taxonomy-header">
        <p className="eyebrow">Célcsoportok</p>
        <h1>Böngészés olvasó szerint</h1>
        <p>
          Indulj abból, kinek szól a kérdés: új hívőknek, érett olvasóknak, családoknak,
          vezetőknek vagy másoknak, akik gyakorlati bibliai útmutatást keresnek.
        </p>
      </header>

      <section className="taxonomy-grid" aria-label="Célcsoportok listája">
        {audiences.map((audience) => (
          <Link
            className="taxonomy-card"
            href={buildTaxonomyUrl('audience', audience.value)}
            key={audience.value}
          >
            <span>{audience.label}</span>
            <small>
              {audience.articleCount} cikk / {audience.seriesCount} sorozat /{' '}
              {audience.resourceCount} forrás
            </small>
          </Link>
        ))}
      </section>
    </main>
  )
}
