import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buildArticleUrl, loadArticleDetail } from '@/lib/article-detail'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { getTranslations, translateResourceLabel } from '@/lib/i18n'
import {
  buildResourceUrl,
  loadResourceItem,
  loadResourceItems,
  type ResourceItem,
  type ResourceType,
} from '@/lib/resources'
import { buildSeriesUrl } from '@/lib/series'

export const dynamic = 'force-dynamic'

const t = getTranslations()

function typeLabel(value: string) {
  return t.resources.typeLabels[value as ResourceType] ?? value
}

function resourceMetaLabel(value: string | undefined, fallback: string) {
  return value ? translateResourceLabel(value) : fallback
}

function resourceAction(resource: ResourceItem) {
  if (resource.externalUrl) {
    return {
      href: resource.externalUrl,
      label: resource.ctaLabel ?? 'Külső forrás megnyitása',
      external: true,
      note: 'Külső link',
    }
  }

  if (resource.fileHref) {
    return {
      href: resource.fileHref,
      label: resource.ctaLabel ?? 'Fájl megnyitása',
      external: true,
      note: 'Letöltés vagy fájl',
    }
  }

  const firstSeries = resource.relatedSeriesSlugs[0]
  if (firstSeries) {
    return {
      href: buildSeriesUrl(firstSeries),
      label: resource.ctaLabel ?? 'Kapcsolódó sorozat megnyitása',
      external: false,
      note: 'Sorozatút',
    }
  }

  const firstArticle = resource.relatedArticleSlugs[0]
  if (firstArticle) {
    return {
      href: buildArticleUrl(firstArticle),
      label: resource.ctaLabel ?? 'Kapcsolódó cikk megnyitása',
      external: false,
      note: 'Kapcsolódó cikk',
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
  const articleLinks = (
    await Promise.all(
      resource.relatedArticleSlugs.map((articleSlug) => loadArticleDetail(articleSlug)),
    )
  )
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
            {t.resources.title}
          </Link>
          <p className="eyebrow">{typeLabel(resource.type)}</p>
          <h1>{resource.title}</h1>
          <p>{resource.description}</p>
        </div>

        <aside className="resource-action-card" aria-label="Resource action">
          <span>{action?.note ?? resourceMetaLabel(resource.format, t.resources.openResource)}</span>
          <h2>{resource.ctaLabel ?? 'Használd ezt a forrást'}</h2>
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
              <p className="eyebrow">Mi ez?</p>
              <h2>Gyakorlati segítség tanulmányozáshoz és növekedéshez</h2>
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
              <p className="eyebrow">Hogyan használd?</p>
              <h2>Használd nyitott Szentírással</h2>
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
                <p className="eyebrow">Kapcsolódási pontok</p>
                <h2>Innen folytathatod</h2>
              </div>
              <div className="resource-guide-links">
                {resource.relatedSeriesSlugs.map((seriesSlug) => (
                  <Link href={buildSeriesUrl(seriesSlug)} key={seriesSlug}>
                    <span>Sorozatút</span>
                    <strong>Folytasd a kapcsolódó tanulmányi úton</strong>
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
                <p className="eyebrow">További eszközök</p>
                <h2>Kapcsolódó források</h2>
              </div>
              <div className="resource-guide-related-list">
                {relatedResources.map((item) => (
                  <Link href={buildResourceUrl(item.slug)} key={item.slug}>
                    <span>{typeLabel(item.type)}</span>
                    <strong>{item.title}</strong>
                    <small>{resourceMetaLabel(item.audience ?? item.topic, t.resources.allReaders)}</small>
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
