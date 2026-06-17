import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ReadingProgress } from '@/components/features/article/ReadingProgress'
import { ShareTools } from '@/components/features/article/ShareTools'
import { buildArticleUrl, createArticleDetail } from '@/lib/article-detail'
import { createArchiveContent } from '@/lib/article-archive'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildAuthorUrl, loadAuthorProfileByName } from '@/lib/authors'

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
    .articles.filter((article) => article.slug !== slug)
    .slice(0, 3)

  return (
    <main className="article-page">
      <ReadingProgress />

      <article className="article-shell">
        <header className="article-header">
          <div className="article-kicker-row">
            <p className="eyebrow">{detail.category}</p>
            <p className="article-meta-inline">
              <span>
                {authorProfile ? <Link href={buildAuthorUrl(authorProfile.slug)}>{detail.author}</Link> : detail.author}
              </span>
              <span>{formatDate(detail.publishedAt)}</span>
              <span>{detail.readingMinutes} min read</span>
            </p>
          </div>

          <h1>{detail.title}</h1>
          <p className="article-subtitle">{detail.subtitle}</p>

          <div className="article-utilities">
            <ShareTools title={detail.title} url={buildArticleUrl(detail.slug)} />
          </div>
        </header>

        <section className="scripture-block" aria-labelledby="scripture-title">
          <div>
            <p className="eyebrow">Scripture</p>
            <h2 id="scripture-title">{detail.scriptureBlock.reference}</h2>
          </div>
          <blockquote>{detail.scriptureBlock.text}</blockquote>
        </section>

        <section className="article-support-grid">
          <div className="pull-quote">
            <p className="eyebrow">Pull quote</p>
            <blockquote>{detail.pullQuote}</blockquote>
          </div>

          <aside className="study-panel">
            <p className="eyebrow">{detail.studyPanel.title}</p>
            <ul>
              {detail.studyPanel.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <figure className="article-cover">
          <Image alt={detail.coverAlt} fill priority sizes="(max-width: 960px) 100vw, 72vw" src={detail.coverSrc} />
        </figure>

        <dl className="article-meta-grid">
          <div>
            <dt>Series</dt>
            <dd>{detail.series?.label ?? 'Standalone'}</dd>
          </div>
          <div>
            <dt>Tags</dt>
            <dd>{detail.tags.join(' · ')}</dd>
          </div>
          <div>
            <dt>Author</dt>
            <dd>
              {authorProfile ? <Link href={buildAuthorUrl(authorProfile.slug)}>{detail.author}</Link> : detail.author}
            </dd>
          </div>
          <div>
            <dt>Published</dt>
            <dd>{formatDate(detail.publishedAt)}</dd>
          </div>
        </dl>

        <section className="article-body" aria-label="Article body">
          {detail.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </section>

        <section className="page-links" aria-label="Article routes">
          <Link className="page-link" href="/articles">
            Back to archive
          </Link>
          {detail.series ? (
            <Link className="page-link" href="/series">
              Browse series
            </Link>
          ) : null}
          <Link className="page-link" href="/napi-ige">
            Daily Verse
          </Link>
          <Link className="page-link" href="/resources">
            Resources
          </Link>
          <Link className="page-link" href="/about">
            About Kovasz
          </Link>
        </section>

        {detail.series ? (
          <section className="series-nav" aria-label="Series navigation">
            <div>
              <p className="eyebrow">Series</p>
              <h2>{detail.series.label}</h2>
              <p>{detail.series.description}</p>
            </div>
            <div className="series-nav-links">
              {detail.seriesNavigation.previous ? (
                <Link href={buildArticleUrl(detail.seriesNavigation.previous.slug)}>
                  Previous: {detail.seriesNavigation.previous.title}
                </Link>
              ) : (
                <span>Previous: none</span>
              )}
              {detail.seriesNavigation.next ? (
                <Link href={buildArticleUrl(detail.seriesNavigation.next.slug)}>
                  Next: {detail.seriesNavigation.next.title}
                </Link>
              ) : (
                <span>Next: none</span>
              )}
            </div>
          </section>
        ) : null}

        <section className="related-section" aria-label="Related articles">
          <div className="section-heading">
            <p className="eyebrow">Related</p>
            <h2>Continue reading</h2>
          </div>

          <div className="related-grid">
            {relatedArticles.map((article) => (
              <article className="related-item" key={article.slug}>
                <p className="card-meta">
                  <span>{article.category.label}</span>
                  <span>{article.readingMinutes} min</span>
                </p>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link href={buildArticleUrl(article.slug)}>Open article</Link>
              </article>
            ))}
          </div>
        </section>
      </article>
    </main>
  )
}
