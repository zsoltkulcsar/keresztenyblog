import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buildArticleUrl, createArticleDetail } from '@/lib/article-detail'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import {
  buildResourceUrl,
  loadResourceItem,
  loadResourceItems,
  type ResourceItem,
  type ResourceType,
} from '@/lib/resources'
import { buildSeriesUrl } from '@/lib/series'

const typeLabels: Record<ResourceType, string> = {
  article: 'Article',
  book: 'Book',
  file: 'File',
  'leader-tool': 'Leader tool',
  link: 'Link',
  'reading-plan': 'Reading plan',
  series: 'Series',
  'study-guide': 'Study guide',
}

function typeLabel(value: string) {
  return typeLabels[value as ResourceType] ?? value
}

function resourceAction(resource: ResourceItem) {
  if (resource.externalUrl) {
    return {
      href: resource.externalUrl,
      label: resource.ctaLabel ?? 'Open external resource',
      external: true,
      note: 'External link',
    }
  }

  if (resource.fileHref) {
    return {
      href: resource.fileHref,
      label: resource.ctaLabel ?? 'Open file',
      external: true,
      note: 'Download or file',
    }
  }

  const firstSeries = resource.relatedSeriesSlugs[0]
  if (firstSeries) {
    return {
      href: buildSeriesUrl(firstSeries),
      label: resource.ctaLabel ?? 'Open related series',
      external: false,
      note: 'Series path',
    }
  }

  const firstArticle = resource.relatedArticleSlugs[0]
  if (firstArticle) {
    return {
      href: buildArticleUrl(firstArticle),
      label: resource.ctaLabel ?? 'Open related article',
      external: false,
      note: 'Related article',
    }
  }

  return null
}

export function generateMetadata({
  params,
}: {
  params?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
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
  params?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug
  const resource = slug ? await loadResourceItem(slug) : null

  if (!resource) {
    notFound()
  }

  const action = resourceAction(resource)
  const articleLinks = resource.relatedArticleSlugs
    .map((articleSlug) => createArticleDetail(articleSlug))
    .filter(Boolean)
    .map((article) => article!)
  const relatedResources = (await loadResourceItems())
    .filter(
      (item) =>
        item.slug !== resource.slug &&
        (item.topic === resource.topic || item.type === resource.type),
    )
    .slice(0, 4)
  const usageSteps = resource.steps.length
    ? resource.steps
    : [
        'Read the related passage first.',
        'Use the resource as support, not replacement.',
        'Write one concrete next step.',
      ]

  return (
    <main className="resource-guide-page">
      <header className="resource-guide-header">
        <div className="resource-guide-title">
          <Link className="resource-guide-back" href="/resources">
            Resources
          </Link>
          <p className="eyebrow">{typeLabel(resource.type)}</p>
          <h1>{resource.title}</h1>
          <p>{resource.description}</p>
        </div>

        <aside className="resource-action-card" aria-label="Resource action">
          <span>{action?.note ?? resource.format ?? 'Resource'}</span>
          <h2>{resource.ctaLabel ?? 'Use this resource'}</h2>
          <p>{resource.usefulness}</p>
          {action ? (
            <Link
              className="resource-primary-link"
              href={action.href}
              rel={action.external ? 'noreferrer' : undefined}
              target={action.external ? '_blank' : undefined}
            >
              {action.label}
            </Link>
          ) : null}
        </aside>
      </header>

      <section className="resource-guide-layout">
        <div className="resource-guide-main">
          <section className="resource-guide-section resource-guide-section-intro">
            <div>
              <p className="eyebrow">What this is</p>
              <h2>A practical aid for study and growth</h2>
            </div>
            <p>{resource.usefulness}</p>
            {resource.highlights.length ? (
              <div className="resource-guide-highlights">
                {resource.highlights.map((highlight) => (
                  <span key={highlight}>{highlight}</span>
                ))}
              </div>
            ) : null}
          </section>

          <section className="resource-guide-section">
            <div>
              <p className="eyebrow">How to use it</p>
              <h2>Use it with Scripture open</h2>
            </div>
            <ol className="resource-guide-steps">
              {usageSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {resource.relatedSeriesSlugs.length || articleLinks.length ? (
            <section className="resource-guide-section">
              <div>
                <p className="eyebrow">Where it connects</p>
                <h2>Continue from here</h2>
              </div>
              <div className="resource-guide-links">
                {resource.relatedSeriesSlugs.map((seriesSlug) => (
                  <Link href={buildSeriesUrl(seriesSlug)} key={seriesSlug}>
                    <span>Series path</span>
                    <strong>Continue in the related study path</strong>
                  </Link>
                ))}
                {articleLinks.map((article) => (
                  <Link href={buildArticleUrl(article.slug)} key={article.slug}>
                    <span>{article.category}</span>
                    <strong>{article.title}</strong>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relatedResources.length ? (
            <section className="resource-guide-section">
              <div>
                <p className="eyebrow">More tools</p>
                <h2>Related resources</h2>
              </div>
              <div className="resource-guide-related-list">
                {relatedResources.map((item) => (
                  <Link href={buildResourceUrl(item.slug)} key={item.slug}>
                    <span>{typeLabel(item.type)}</span>
                    <strong>{item.title}</strong>
                    <small>{item.audience ?? item.topic ?? 'All readers'}</small>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  )
}
