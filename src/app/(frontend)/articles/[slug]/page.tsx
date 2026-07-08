import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ReadingProgress } from '@/components/features/article/ReadingProgress'
import { ShareTools } from '@/components/features/article/ShareTools'
import { buildArticleUrl, createArticleDetail } from '@/lib/article-detail'
import { createArchiveContent } from '@/lib/article-archive'
import { buildAuthorUrl, loadAuthorProfileByName } from '@/lib/authors'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildSeriesUrl } from '@/lib/series'

type ArticlePageProps = {
  params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${value}T00:00:00Z`),
  )
}

function parseParams(params: Record<string, string | string[] | undefined>) {
  return {
    slug: getSingleValue(params.slug) ?? '',
  }
}

export function generateMetadata({
  params,
}: {
  params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}) {
  return Promise.resolve(params ?? {}).then(async (resolvedParams) => {
    const slug = parseParams(resolvedParams).slug
    const detail = createArticleDetail(slug)

    if (!detail) {
      return buildDiscoveryMetadata({
        description: 'Article detail',
        noIndex: true,
        path: buildArticleUrl(slug),
        title: 'Article not found',
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
  const detail = createArticleDetail(slug)

  if (!detail || !detail.archiveArticle) {
    notFound()
  }

  const authorProfile = await loadAuthorProfileByName(detail.author)
  const relatedArticles = createArchiveContent()
    .articles.filter((article) => article.slug !== slug && article.category.value === detail.archiveArticle?.category.value)
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
              {authorProfile ? <Link href={buildAuthorUrl(authorProfile.slug)}>{detail.author}</Link> : detail.author}
              <span>{formatDate(detail.publishedAt)}</span>
            </p>
            <dl>
              <div>
                <dt>Reading</dt>
                <dd>{detail.readingMinutes} min</dd>
              </div>
              <div>
                <dt>Series</dt>
                <dd>{detail.series?.label ?? 'Standalone'}</dd>
              </div>
              <div>
                <dt>Tags</dt>
                <dd>{detail.tags.join(' / ')}</dd>
              </div>
            </dl>
            <ShareTools title={detail.title} url={buildArticleUrl(detail.slug)} />
          </aside>
        </header>

        {detail.series ? (
          <section className="scripture-study-series-banner" aria-label="Series placement">
            <div>
              <p className="eyebrow">Part {detail.seriesOrder ?? 1}</p>
              <h2>This article belongs to {detail.series.label}</h2>
              <p>{detail.series.description}</p>
            </div>
            <div>
              <Link href={buildSeriesUrl(detail.series.slug)}>Start from beginning</Link>
              {detail.seriesNavigation.previous ? (
                <Link href={buildArticleUrl(detail.seriesNavigation.previous.slug)}>Previous</Link>
              ) : null}
              {detail.seriesNavigation.next ? (
                <Link href={buildArticleUrl(detail.seriesNavigation.next.slug)}>Next</Link>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="scripture-study-anchor" aria-labelledby="scripture-title">
          <div>
            <p className="eyebrow">Scripture</p>
            <span>{detail.scriptureBlock.reference}</span>
          </div>
          <blockquote id="scripture-title">{detail.scriptureBlock.text}</blockquote>
        </section>

        <section className="scripture-study-quote" aria-label="Pull quote">
          <p className="eyebrow">Central thought</p>
          <blockquote>{detail.pullQuote}</blockquote>
        </section>

        <section className="scripture-study-layout">
          <aside className="scripture-study-panel">
            <p className="eyebrow">Study panel</p>
            <h2>{detail.studyPanel.title}</h2>
            <ul>
              {detail.studyPanel.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {detail.series ? (
              <Link href={buildSeriesUrl(detail.series.slug)}>Open series path</Link>
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
            <p className="eyebrow">Author and source</p>
            <h2>{detail.author}</h2>
            <p>
              Published {formatDate(detail.publishedAt)} in {detail.category}. Scripture remains the anchor for the reading,
              study notes, and suggested next steps.
            </p>
            <ShareTools title={detail.title} url={buildArticleUrl(detail.slug)} />
          </section>

          {detail.series ? (
            <section>
              <p className="eyebrow">Series context</p>
              <h2>{detail.series.label}</h2>
              <p>{detail.series.description}</p>
              <Link href={buildSeriesUrl(detail.series.slug)}>Continue the path</Link>
            </section>
          ) : null}

          {detail.relatedResource || detail.relatedBook ? (
            <section>
              <p className="eyebrow">Study next</p>
              <h2>Related helps</h2>
              {detail.relatedResource ? <p>Resource: {detail.relatedResource}</p> : null}
              {detail.relatedBook ? <p>Book: {detail.relatedBook}</p> : null}
            </section>
          ) : null}
        </footer>

        <section className="scripture-study-related" aria-label="Related reading">
          <div>
            <p className="eyebrow">Related reading</p>
            <h2>Read next</h2>
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
