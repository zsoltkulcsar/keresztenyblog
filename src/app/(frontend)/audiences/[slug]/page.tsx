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
      description: 'Audience not found',
      noIndex: true,
      path: buildTaxonomyUrl('audience', slug),
      title: 'Audience not found',
    })
  }

  return buildDiscoveryMetadata({
    description: `Articles, series, and resources for ${audience.label}.`,
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
        <Link href="/audiences">All audiences</Link>
        <p className="eyebrow">Audience</p>
        <h1>{audience.label}</h1>
        <p>
          {audience.articleCount} articles, {audience.seriesCount} series, and{' '}
          {audience.resourceCount} resources prepared for this reader.
        </p>
      </header>

      <div className="taxonomy-detail-layout">
        <section className="taxonomy-detail-section" aria-labelledby="taxonomy-articles">
          <h2 id="taxonomy-articles">Articles</h2>
          <div className="taxonomy-result-list">
            {audience.articles.map((article) => (
              <article key={article.slug}>
                <p className="archive-card-meta">
                  <span>{article.category.label}</span>
                  <span>{article.readingMinutes} min read</span>
                </p>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link href={buildArticleUrl(article.slug)}>Read article</Link>
              </article>
            ))}
          </div>
        </section>

        <aside className="taxonomy-side-panel">
          <section aria-labelledby="taxonomy-series">
            <h2 id="taxonomy-series">Series</h2>
            {audience.series.length > 0 ? (
              audience.series.map((series) => (
                <Link href={buildSeriesUrl(series.slug)} key={series.slug}>
                  <span>{series.title}</span>
                  <small>{series.description}</small>
                </Link>
              ))
            ) : (
              <p>No series yet.</p>
            )}
          </section>

          <section aria-labelledby="taxonomy-resources">
            <h2 id="taxonomy-resources">Resources</h2>
            {audience.resources.length > 0 ? (
              audience.resources.map((resource) => (
                <Link href={buildResourceUrl(resource.slug)} key={resource.slug}>
                  <span>{resource.title}</span>
                  <small>{resource.usefulness}</small>
                </Link>
              ))
            ) : (
              <p>No resources yet.</p>
            )}
          </section>
        </aside>
      </div>
    </main>
  )
}
