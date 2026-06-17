import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildArticleUrl, createArticleDetail } from '@/lib/article-detail'
import { buildSeriesUrl } from '@/lib/series'
import { buildResourceUrl, loadResourceItem } from '@/lib/resources'

function typeLabel(value: string) {
  const labels: Record<string, string> = {
    article: 'Article',
    book: 'Book',
    file: 'File',
    link: 'Link',
    series: 'Series',
    'study-guide': 'Study guide',
  }

  return labels[value] ?? value
}

export function generateMetadata({
  params,
}: {
  params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}) {
  return Promise.resolve(params ?? {}).then(async (resolvedParams) => {
    const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug
    const resource = slug ? await loadResourceItem(slug) : null

    if (!resource) {
      return buildDiscoveryMetadata({
        description: 'Resource detail',
        noIndex: true,
        path: buildResourceUrl(slug ?? ''),
        title: 'Resource not found',
      })
    }

    return buildDiscoveryMetadata({
      description: resource.usefulness,
      path: buildResourceUrl(resource.slug),
      title: resource.title,
    })
  })
}

export default async function ResourceDetailPage({
  params,
}: {
  params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug
  const resource = slug ? await loadResourceItem(slug) : null

  if (!resource) {
    notFound()
  }

  const articleLinks = resource.relatedArticleSlugs
    .map((articleSlug) => createArticleDetail(articleSlug))
    .filter(Boolean)
    .map((article) => article!)

  return (
    <main className="archive-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Resources</p>
          <h1>{resource.title}</h1>
          <p className="archive-intro">{resource.description}</p>
        </div>
        <div className="archive-header-meta">
          <span>{typeLabel(resource.type)}</span>
          <Link className="archive-reset-link" href="/resources">
            Back to resources
          </Link>
        </div>
      </header>

      <section className="resource-detail-panel">
        <div>
          <p className="eyebrow">Usefulness</p>
          <h2>Why this resource is here</h2>
          <p>{resource.usefulness}</p>
        </div>
        <div className="resource-detail-links">
          {resource.externalUrl ? (
            <Link className="page-link" href={resource.externalUrl} target="_blank" rel="noreferrer">
              Open external link
            </Link>
          ) : null}
          {resource.fileHref ? (
            <Link className="page-link" href={resource.fileHref} target="_blank" rel="noreferrer">
              Open file
            </Link>
          ) : null}
          {resource.relatedSeriesSlugs.map((seriesSlug) => (
            <Link className="page-link" href={buildSeriesUrl(seriesSlug)} key={seriesSlug}>
              Related series
            </Link>
          ))}
        </div>
      </section>

      <section className="related-section" aria-label="Related articles">
        <div className="section-heading">
          <p className="eyebrow">Related</p>
          <h2>Related reading</h2>
        </div>

        <div className="related-grid">
          {articleLinks.map((article) => (
            <article className="related-item" key={article.slug}>
              <p className="card-meta">
                <span>{article.category}</span>
                <span>{article.readingMinutes} min</span>
              </p>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <Link href={buildArticleUrl(article.slug)}>Open article</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
