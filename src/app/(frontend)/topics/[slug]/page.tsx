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
  const topic = await loadTaxonomyDetail('topic', slug)

  if (!topic) {
    return buildDiscoveryMetadata({
      description: 'A téma nem található',
      noIndex: true,
      path: buildTaxonomyUrl('topic', slug),
      title: 'A téma nem található',
    })
  }

  return buildDiscoveryMetadata({
    description: `Cikkek, sorozatok és források erről a témáról: ${topic.label}.`,
    path: buildTaxonomyUrl('topic', topic.value),
    title: topic.label,
  })
}

export default async function TopicDetailPage({ params }: TaxonomyPageProps) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = getSingleValue(resolvedParams.slug) ?? ''
  const topic = await loadTaxonomyDetail('topic', slug)

  if (!topic) {
    notFound()
  }

  return (
    <main className="taxonomy-page">
      <header className="taxonomy-header taxonomy-detail-header">
        <Link href="/topics">Minden téma</Link>
        <p className="eyebrow">Téma</p>
        <h1>{topic.label}</h1>
        <p>
          {topic.articleCount} cikk, {topic.seriesCount} sorozat és {topic.resourceCount}{' '}
          forrás kapcsolódik ehhez a témához.
        </p>
      </header>

      <TaxonomyDetailContent detail={topic} />
    </main>
  )
}

function TaxonomyDetailContent({
  detail,
}: {
  detail: NonNullable<Awaited<ReturnType<typeof loadTaxonomyDetail>>>
}) {
  return (
    <div className="taxonomy-detail-layout">
      <section className="taxonomy-detail-section" aria-labelledby="taxonomy-articles">
        <h2 id="taxonomy-articles">Cikkek</h2>
        <div className="taxonomy-result-list">
          {detail.articles.map((article) => (
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
          {detail.series.length > 0 ? (
            detail.series.map((series) => (
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
          {detail.resources.length > 0 ? (
            detail.resources.map((resource) => (
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
  )
}
