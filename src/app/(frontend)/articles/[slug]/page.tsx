import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ReadingProgress } from '@/components/features/article/ReadingProgress'
import { ShareTools } from '@/components/features/article/ShareTools'
import { buildArticleUrl, loadArticleDetail } from '@/lib/article-detail'
import { loadArchiveContent, type ArchiveArticle } from '@/lib/article-archive'
import { buildAuthorUrl, loadAuthorProfileByName } from '@/lib/authors'
import { buildBookUrl, listBooks } from '@/lib/books'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildResourceUrl, loadResourceItems } from '@/lib/resources'
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

function normalizeText(value: string | undefined) {
  return (
    value
      ?.trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim() ?? ''
  )
}

function scoreRelatedArticle(article: ArchiveArticle, currentArticle: ArchiveArticle) {
  const currentTopics = new Set(currentArticle.topics.map((topic) => topic.value))
  const currentAudiences = new Set(currentArticle.audiences.map((audience) => audience.value))
  const topicMatches = article.topics.filter((topic) => currentTopics.has(topic.value)).length
  const audienceMatches = article.audiences.filter((audience) =>
    currentAudiences.has(audience.value),
  ).length

  return (
    (article.series.value === currentArticle.series.value ? 6 : 0) +
    topicMatches * 4 +
    (article.category.value === currentArticle.category.value ? 3 : 0) +
    audienceMatches * 2
  )
}

function bookTopicMatchesArticle(bookTopic: string, articleTopicValues: Set<string>) {
  const aliases: Record<string, string[]> = {
    'bible-study': ['bible-reading', 'scripture'],
    'christian-life': ['christian-life', 'discipleship', 'spiritual-growth'],
    doctrine: ['doctrine', 'grace', 'identity-in-christ', 'salvation'],
    family: ['family', 'marriage'],
    leadership: ['leadership', 'pastoral-theology'],
    prayer: ['prayer'],
  }

  return aliases[bookTopic]?.some((topic) => articleTopicValues.has(topic)) ?? false
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

  const archiveArticle = detail.archiveArticle
  const authorProfile = await loadAuthorProfileByName(detail.author)
  const [relatedArchive, resources] = await Promise.all([loadArchiveContent(), loadResourceItems()])
  const otherArticles = relatedArchive.allArticles.filter((article) => article.slug !== slug)
  const rankedRelatedArticles = otherArticles
    .map((article) => ({
      article,
      score: scoreRelatedArticle(article, archiveArticle),
    }))
    .filter((item) => item.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score || right.article.publishedAt.localeCompare(left.article.publishedAt),
    )
    .map((item) => item.article)
  const fallbackArticles = otherArticles
    .filter((article) => !rankedRelatedArticles.some((related) => related.slug === article.slug))
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
  const relatedArticles = [...rankedRelatedArticles, ...fallbackArticles].slice(0, 4)
  const articleTopicValues = new Set(archiveArticle.topics.map((topic) => topic.value))
  const relatedResource =
    resources.find(
      (resource) => normalizeText(resource.title) === normalizeText(detail.relatedResource),
    ) ??
    resources.find(
      (resource) =>
        resource.relatedArticleSlugs.includes(detail.slug) ||
        Boolean(detail.series && resource.relatedSeriesSlugs.includes(detail.series.slug)),
    )
  const relatedBook =
    listBooks().find((book) => normalizeText(book.title) === normalizeText(detail.relatedBook)) ??
    listBooks().find((book) => bookTopicMatchesArticle(book.topic, articleTopicValues))

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
                <dd>
                  {detail.series ? (
                    <Link href={buildSeriesUrl(detail.series.slug)}>{detail.series.label}</Link>
                  ) : (
                    'Önálló cikk'
                  )}
                </dd>
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

          {detail.relatedResource || detail.relatedBook ? (
            <section>
              <p className="eyebrow">Következő tanulmány</p>
              <h2>Kapcsolódó segítségek</h2>
              <div className="scripture-study-support-links">
                {detail.relatedResource ? (
                  relatedResource ? (
                    <Link href={buildResourceUrl(relatedResource.slug)}>
                      <span>Forrás</span>
                      <strong>{relatedResource.title}</strong>
                      <small>{relatedResource.usefulness}</small>
                    </Link>
                  ) : (
                    <Link href="/resources">
                      <span>Forrás</span>
                      <strong>{detail.relatedResource}</strong>
                      <small>Kapcsolódó segédanyagok megnyitása</small>
                    </Link>
                  )
                ) : null}
                {detail.relatedBook ? (
                  relatedBook ? (
                    <Link href={buildBookUrl(relatedBook.slug)}>
                      <span>Könyv</span>
                      <strong>{relatedBook.title}</strong>
                      <small>{relatedBook.description}</small>
                    </Link>
                  ) : (
                    <Link href="/books">
                      <span>Könyv</span>
                      <strong>{detail.relatedBook}</strong>
                      <small>Könyvajánlók megnyitása</small>
                    </Link>
                  )
                ) : null}
              </div>
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
