import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buildArticleUrl } from '@/lib/article-detail'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildResourceUrl } from '@/lib/resources'
import { buildSeriesUrl } from '@/lib/series'
import { buildTaxonomyUrl, loadTaxonomyDetail } from '@/lib/taxonomy'

export const dynamic = 'force-dynamic'

type TaxonomyPageProps = {
  params?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export async function generateMetadata({ params }: TaxonomyPageProps) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = getSingleValue(resolvedParams.slug) ?? ''
  const audience = await loadTaxonomyDetail('audience', slug)

  if (!audience) {
    return buildDiscoveryMetadata({
      description: 'A célcsoport nem található',
      noIndex: true,
      path: buildTaxonomyUrl('audience', slug),
      title: 'A célcsoport nem található',
    })
  }

  return buildDiscoveryMetadata({
    description: `Cikkek, sorozatok és források ennek a célcsoportnak: ${audience.label}.`,
    path: buildTaxonomyUrl('audience', audience.value),
    title: audience.label,
  })
}

export default async function AudienceDetailPage({ params }: TaxonomyPageProps) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = getSingleValue(resolvedParams.slug) ?? ''
  const audience = await loadTaxonomyDetail('audience', slug)

  if (!audience) {
    notFound()
  }

  return (
    <main className="taxonomy-page">
      <header className="taxonomy-header taxonomy-detail-header">
        <Link href="/audiences">Minden célcsoport</Link>
        <p className="eyebrow">Célcsoport</p>
        <h1>{audience.label}</h1>
        <p>
          {audience.articleCount} cikk, {audience.seriesCount} sorozat és{' '}
          {audience.resourceCount} forrás készült ehhez az olvasóhoz.
        </p>
      </header>

      <div className="taxonomy-detail-layout">
        <section className="taxonomy-detail-section" aria-labelledby="taxonomy-articles">
          <h2 id="taxonomy-articles">Cikkek</h2>
          <div className="taxonomy-result-list">
            {audience.articles.map((article) => (
              <article key={article.slug}>
                <p className="archive-card-meta">
                  <span>{article.category.label}</span>
                  <span>{article.readingMinutes} perc olvasás</span>
                </p>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link href={buildArticleUrl(article.slug)}>Cikk olvasása</Link>
              </article>
            ))}
          </div>
        </section>

        <aside className="taxonomy-side-panel">
          <section aria-labelledby="taxonomy-series">
            <h2 id="taxonomy-series">Sorozatok</h2>
            {audience.series.length > 0 ? (
              audience.series.map((series) => (
                <Link href={buildSeriesUrl(series.slug)} key={series.slug}>
                  <span>{series.title}</span>
                  <small>{series.description}</small>
                </Link>
              ))
            ) : (
              <p>Még nincs kapcsolódó sorozat.</p>
            )}
          </section>

          <section aria-labelledby="taxonomy-resources">
            <h2 id="taxonomy-resources">Források</h2>
            {audience.resources.length > 0 ? (
              audience.resources.map((resource) => (
                <Link href={buildResourceUrl(resource.slug)} key={resource.slug}>
                  <span>{resource.title}</span>
                  <small>{resource.usefulness}</small>
                </Link>
              ))
            ) : (
              <p>Még nincs kapcsolódó forrás.</p>
            )}
          </section>
        </aside>
      </div>
    </main>
  )
}
