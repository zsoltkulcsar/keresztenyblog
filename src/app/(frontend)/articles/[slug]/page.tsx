import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ReadingProgress } from '@/components/features/article/ReadingProgress'
import { ShareTools } from '@/components/features/article/ShareTools'
import { buildArticleUrl, loadArticleDetail } from '@/lib/article-detail'
import { loadArchiveContent } from '@/lib/article-archive'
import { buildAuthorUrl, loadAuthorProfileByName } from '@/lib/authors'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildSeriesUrl } from '@/lib/series'
import { buildTaxonomyUrl } from '@/lib/taxonomy'

export const dynamic = 'force-dynamic'

type ArticlePageProps = {
  params?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function formatDate(value: string) {
  const dateValue = value.includes('T') ? value : `${value}T00:00:00Z`

  return new Intl.DateTimeFormat('hu-HU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateValue))
}

function parseParams(params: Record<string, string | string[] | undefined>) {
  return {
    slug: getSingleValue(params.slug) ?? '',
  }
}

export function generateMetadata({
  params,
}: {
  params?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  return Promise.resolve(params ?? {}).then(async (resolvedParams) => {
    const slug = parseParams(resolvedParams).slug
    const detail = await loadArticleDetail(slug)

    if (!detail) {
      return buildDiscoveryMetadata({
        description: 'Cikk részletei',
        noIndex: true,
        path: buildArticleUrl(slug),
        title: 'A cikk nem található',
        type: 'article',
      })
    }

    return buildDiscoveryMetadata({
      description: detail.subtitle,
      path: buildArticleUrl(slug),
      title: detail.title,
      type: 'article',
    })
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const { slug } = parseParams(resolvedParams)
  const detail = await loadArticleDetail(slug)

  if (!detail || !detail.archiveArticle) {
    notFound()
  }

  const authorProfile = await loadAuthorProfileByName(detail.author)
  const relatedArchive = await loadArchiveContent()
  const relatedArticles = relatedArchive.articles
    .filter(
      (article) =>
        article.slug !== slug && article.category.value === detail.archiveArticle?.category.value,
    )
    .slice(0, 3)

  return (
    <main className="scripture-study-page">
      <ReadingProgress />

      <article className="scripture-study-shell">
        <header className="scripture-study-header">
          <div>
            <p className="eyebrow">{detail.category}</p>
            <h1>{detail.title}</h1>
            <p>{detail.subtitle}</p>
          </div>
          <aside className="scripture-study-meta">
            <p>
              {authorProfile ? (
                <Link href={buildAuthorUrl(authorProfile.slug)}>{detail.author}</Link>
              ) : (
                detail.author
              )}
              <span>{formatDate(detail.publishedAt)}</span>
            </p>
            <dl>
              <div>
                <dt>Olvasás</dt>
                <dd>{detail.readingMinutes} perc</dd>
              </div>
              <div>
                <dt>Sorozat</dt>
                <dd>{detail.series?.label ?? 'Önálló cikk'}</dd>
              </div>
              <div>
                <dt>Témák</dt>
                <dd className="scripture-study-facet-list">
                  {detail.archiveArticle.topics.map((topic) => (
                    <Link href={buildTaxonomyUrl('topic', topic.value)} key={topic.value}>
                      {topic.label}
                    </Link>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Olvasók</dt>
                <dd className="scripture-study-facet-list">
                  {detail.archiveArticle.audiences.map((audience) => (
                    <Link href={buildTaxonomyUrl('audience', audience.value)} key={audience.value}>
                      {audience.label}
                    </Link>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Címkék</dt>
                <dd>{detail.tags.join(' / ')}</dd>
              </div>
            </dl>
            <ShareTools title={detail.title} url={buildArticleUrl(detail.slug)} />
          </aside>
        </header>

        {detail.series ? (
          <section className="scripture-study-series-banner" aria-label="Sorozatbeli hely">
            <div>
              <p className="eyebrow">{detail.seriesOrder ?? 1}. rész</p>
              <h2>Ez a cikk a(z) {detail.series.label} sorozat része</h2>
              <p>{detail.series.description}</p>
            </div>
            <div>
              <Link href={buildSeriesUrl(detail.series.slug)}>Kezdés az elejéről</Link>
              {detail.seriesNavigation.previous ? (
                <Link href={buildArticleUrl(detail.seriesNavigation.previous.slug)}>Előző</Link>
              ) : null}
              {detail.seriesNavigation.next ? (
                <Link href={buildArticleUrl(detail.seriesNavigation.next.slug)}>Következő</Link>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="scripture-study-anchor" aria-labelledby="scripture-title">
          <div>
            <p className="eyebrow">Szentírás</p>
            <span>{detail.scriptureBlock.reference}</span>
          </div>
          <blockquote id="scripture-title">{detail.scriptureBlock.text}</blockquote>
        </section>

        <section className="scripture-study-quote" aria-label="Kiemelt gondolat">
          <p className="eyebrow">Központi gondolat</p>
          <blockquote>{detail.pullQuote}</blockquote>
        </section>

        <section className="scripture-study-layout">
          <aside className="scripture-study-panel">
            <p className="eyebrow">Tanulmányi panel</p>
            <h2>{detail.studyPanel.title}</h2>
            <ul>
              {detail.studyPanel.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {detail.series ? (
              <Link href={buildSeriesUrl(detail.series.slug)}>Sorozatút megnyitása</Link>
            ) : null}
          </aside>

          <div className="scripture-study-body">
            {detail.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </section>

        <footer className="scripture-study-footer">
          <section>
            <p className="eyebrow">Szerző és forrás</p>
            <h2>{detail.author}</h2>
            <p>
              Megjelent: {formatDate(detail.publishedAt)}, kategória: {detail.category}. A
              Szentírás marad az olvasás, a jegyzetek és a következő lépések horgonya.
            </p>
            <ShareTools title={detail.title} url={buildArticleUrl(detail.slug)} />
          </section>

          {detail.series ? (
            <section>
              <p className="eyebrow">Sorozat kontextus</p>
              <h2>{detail.series.label}</h2>
              <p>{detail.series.description}</p>
              <Link href={buildSeriesUrl(detail.series.slug)}>Út folytatása</Link>
            </section>
          ) : null}

          {detail.relatedResource || detail.relatedBook ? (
            <section>
              <p className="eyebrow">Következő tanulmány</p>
              <h2>Kapcsolódó segítségek</h2>
              {detail.relatedResource ? <p>Forrás: {detail.relatedResource}</p> : null}
              {detail.relatedBook ? <p>Könyv: {detail.relatedBook}</p> : null}
            </section>
          ) : null}
        </footer>

        <section className="scripture-study-related" aria-label="Kapcsolódó olvasmányok">
          <div>
            <p className="eyebrow">Kapcsolódó olvasmány</p>
            <h2>Olvasd tovább</h2>
          </div>
          <div>
            {relatedArticles.map((article) => (
              <Link href={buildArticleUrl(article.slug)} key={article.slug}>
                <span>{article.category.label}</span>
                <strong>{article.title}</strong>
                <small>{article.excerpt}</small>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
