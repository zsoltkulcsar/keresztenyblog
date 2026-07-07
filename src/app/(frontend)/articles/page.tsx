import Link from 'next/link'

import { buildArchiveUrl, createArchiveContent, type ArchiveFilters } from '@/lib/article-archive'
import { buildArticleUrl } from '@/lib/article-detail'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'

type ArchivePageProps = {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function resolveSearchParams(searchParams: Record<string, string | string[] | undefined>) {
  return {
    author: getSingleValue(searchParams.author),
    category: getSingleValue(searchParams.category),
    page: getSingleValue(searchParams.page),
    series: getSingleValue(searchParams.series),
    sort: getSingleValue(searchParams.sort),
    tag: getSingleValue(searchParams.tag),
  }
}

function optionLabel(value: string, options: Array<{ label: string; value: string }>) {
  return options.find((option) => option.value === value)?.label ?? value
}

function buildPageLabel(currentPage: number, totalPages: number, totalArticles: number) {
  if (totalArticles === 0) {
    return 'No published articles match the current filters.'
  }

  return `Page ${currentPage} of ${totalPages} / ${totalArticles} articles`
}

function visualTone(slug: string, index = 0) {
  const score = Array.from(slug).reduce((total, char) => total + char.charCodeAt(0), index)
  return `article-visual article-visual-${score % 12}`
}

function buildArchiveResultsUrl(filters: Partial<ArchiveFilters> = {}) {
  return `${buildArchiveUrl(filters)}#all-articles`
}

export function generateMetadata({
  searchParams,
}: {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  return Promise.resolve(searchParams ?? {}).then((resolvedSearchParams) => {
    const category = getSingleValue(resolvedSearchParams.category)
    const series = getSingleValue(resolvedSearchParams.series)
    const author = getSingleValue(resolvedSearchParams.author)
    const tag = getSingleValue(resolvedSearchParams.tag)
    const page = getSingleValue(resolvedSearchParams.page)

    const selectedFilters = [
      category,
      series,
      author,
      tag,
      page && page !== '1' ? `Page ${page}` : '',
    ].filter(Boolean) as string[]
    const suffix = selectedFilters.length > 0 ? ` / ${selectedFilters.join(' / ')}` : ''
    const query = new URLSearchParams()

    if (author) query.set('author', author)
    if (category) query.set('category', category)
    if (page && page !== '1') query.set('page', page)
    if (series) query.set('series', series)
    if (tag) query.set('tag', tag)

    return buildDiscoveryMetadata({
      description: 'Browse the Kovasz archive by category, series, author, tag, and sort order.',
      path: query.toString() ? `/articles?${query.toString()}` : '/articles',
      title: `Articles${suffix}`,
    })
  })
}

const audienceTabs = [
  { href: '/articles', label: 'All' },
  { href: '/articles?tag=new-believers', label: 'New believers' },
  { href: '/articles?tag=growth', label: 'Growing believers' },
  { href: '/articles?tag=leaders', label: 'Leaders' },
  { href: '/series', label: 'Series' },
  { href: '/resources', label: 'Study aids' },
]

const readingGuides = [
  {
    description: 'Start with basic teaching, Scripture, and steady Christian growth.',
    href: '/series?audience=new-believer',
    label: 'New to faith',
  },
  {
    description: 'Build habits around Scripture, prayer, patience, and obedience.',
    href: '/articles?category=christian-life',
    label: 'Daily growth',
  },
  {
    description: 'Read about marriage, family, parenting, and patient love at home.',
    href: '/articles?category=marriage',
    label: 'Marriage and family',
  },
  {
    description: 'Think through work, choices, speech, and public life before God.',
    href: '/articles?category=ethics',
    label: 'Hard questions',
  },
  {
    description: 'Find pastoral theology, leadership, and material for serving others.',
    href: '/articles?tag=leadership',
    label: 'For leaders',
  },
]

export default async function ArticlesPage({ searchParams }: ArchivePageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const archive = createArchiveContent(resolveSearchParams(resolvedSearchParams))
  const filterSummary = [
    archive.filters.category && optionLabel(archive.filters.category, archive.options.categories),
    archive.filters.series && optionLabel(archive.filters.series, archive.options.series),
    archive.filters.author && optionLabel(archive.filters.author, archive.options.authors),
    archive.filters.tag && optionLabel(archive.filters.tag, archive.options.tags),
  ].filter(Boolean) as string[]
  const latestArticle = archive.allArticles[0]
  const editorPicks = archive.allArticles.slice(1, 5)
  const archiveResults = archive.articles

  return (
    <main className="archive-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Articles</p>
          <h1>Articles</h1>
          <p className="archive-intro">
            Scripture-first writing for believers at every stage of faith and understanding.
          </p>
        </div>
        <form action="/search" className="archive-search" method="get">
          <label>
            <span>Search by topic, question, or Bible passage</span>
            <input name="q" placeholder="Psalm 23, marriage, prayer..." type="search" />
          </label>
          <button type="submit">Search</button>
        </form>
        <nav className="archive-audience-tabs" aria-label="Browse articles by audience">
          {audienceTabs.map((tab) => (
            <Link href={tab.href} key={tab.label}>
              {tab.label}
            </Link>
          ))}
        </nav>
      </header>

      {archive.articles.length > 0 ? (
        <>
          {latestArticle ? (
            <section className="archive-latest" aria-labelledby="archive-latest-title">
              <div className="archive-latest-copy">
                <p className="eyebrow">Latest article</p>
                <h2 id="archive-latest-title">{latestArticle.title}</h2>
                <p>{latestArticle.excerpt}</p>
                <dl className="archive-latest-meta">
                  <div>
                    <dt>Topic</dt>
                    <dd>{latestArticle.category.label}</dd>
                  </div>
                  <div>
                    <dt>Series</dt>
                    <dd>{latestArticle.series.label}</dd>
                  </div>
                  <div>
                    <dt>Read</dt>
                    <dd>{latestArticle.readingMinutes} min</dd>
                  </div>
                </dl>
                <Link
                  className="figma-button figma-button-primary"
                  href={buildArticleUrl(latestArticle.slug)}
                >
                  Read latest article
                </Link>
              </div>
              <div
                className={`archive-latest-image ${visualTone(latestArticle.slug)}`}
                aria-hidden="true"
              />
            </section>
          ) : null}

          <section className="archive-editors" aria-labelledby="archive-editors-title">
            <div className="archive-start-layout">
              <div>
                <div className="archive-section-heading">
                  <h2 id="archive-editors-title">Editor picks</h2>
                </div>
                <div className="archive-editor-grid">
                  {editorPicks.map((article, index) => (
                    <article className="archive-editor-card" key={article.slug}>
                      <div
                        className={`archive-editor-image ${visualTone(article.slug, index)}`}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="archive-card-meta">
                          <span>{article.category.label}</span>
                          <span>{article.readingMinutes} min read</span>
                        </p>
                        <h3>{article.title}</h3>
                        <p>{article.excerpt}</p>
                        <Link href={buildArticleUrl(article.slug)}>Read more</Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="archive-reading-guide" aria-label="Where to start">
                <div>
                  <p className="eyebrow">Where to start</p>
                  <h2>Read by need</h2>
                  <p>Choose the route that best fits the reader in front of the article list.</p>
                </div>
                <div className="archive-reading-guide-list">
                  {readingGuides.map((guide) => (
                    <Link href={guide.href} key={guide.label}>
                      <span>{guide.label}</span>
                      <small>{guide.description}</small>
                    </Link>
                  ))}
                </div>
                <Link className="archive-reading-guide-action" href="/resources">
                  Open study aids
                </Link>
              </aside>
            </div>
          </section>

          <section className="archive-library" aria-labelledby="archive-library-title">
            <aside className="archive-filter-panel" aria-label="Article filters">
              <div>
                <p className="eyebrow">Browse</p>
                <h2>Find articles</h2>
                <p>
                  {buildPageLabel(
                    archive.pagination.currentPage,
                    archive.pagination.totalPages,
                    archive.totalFilteredArticles,
                  )}
                </p>
              </div>
              <form action="/articles" className="archive-filters" method="get">
                <label>
                  <span>Topic</span>
                  <select name="category" defaultValue={archive.filters.category}>
                    <option value="">All topics</option>
                    {archive.options.categories.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Series</span>
                  <select name="series" defaultValue={archive.filters.series}>
                    <option value="">All series</option>
                    {archive.options.series.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Author</span>
                  <select name="author" defaultValue={archive.filters.author}>
                    <option value="">All authors</option>
                    {archive.options.authors.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Scripture / Tag</span>
                  <select name="tag" defaultValue={archive.filters.tag}>
                    <option value="">All tags</option>
                    {archive.options.tags.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Sort</span>
                  <select name="sort" defaultValue={archive.filters.sort}>
                    {archive.options.sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button type="submit">Apply filters</button>
                <Link className="archive-filter-reset" href="/articles">
                  Reset filters
                </Link>
              </form>
            </aside>

            <div className="archive-results" id="all-articles">
              <div className="archive-results-heading">
                <div>
                  <p className="eyebrow">Library</p>
                  <h2 id="archive-library-title">All articles</h2>
                </div>
                {filterSummary.length > 0 ? (
                  <p className="archive-summary">Active filters: {filterSummary.join(' / ')}</p>
                ) : (
                  <p className="archive-summary">Newest articles first.</p>
                )}
              </div>

              <div className="archive-result-list">
                {archiveResults.map((article) => (
                  <article className="archive-result-item" key={article.slug}>
                    <div>
                      <p className="archive-card-meta">
                        <span>{article.category.label}</span>
                        <span>{article.readingMinutes} min read</span>
                      </p>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <dl>
                        <div>
                          <dt>Series</dt>
                          <dd>{article.series.label}</dd>
                        </div>
                        <div>
                          <dt>Author</dt>
                          <dd>{article.author.label}</dd>
                        </div>
                        <div>
                          <dt>Tags</dt>
                          <dd>{article.tags.map((tag) => tag.label).join(' / ')}</dd>
                        </div>
                      </dl>
                    </div>
                    <Link href={buildArticleUrl(article.slug)}>Read article</Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {archive.pagination.totalPages > 1 ? (
            <nav className="archive-pagination" aria-label="Archive pagination">
              <Link
                aria-disabled={archive.pagination.currentPage === 1}
                className="pagination-link"
                href={
                  archive.pagination.currentPage === 1
                    ? '/articles#all-articles'
                    : buildArchiveResultsUrl({
                        author: archive.filters.author,
                        category: archive.filters.category,
                        page: archive.pagination.currentPage - 1,
                        series: archive.filters.series,
                        sort: archive.filters.sort,
                        tag: archive.filters.tag,
                      })
                }
                tabIndex={archive.pagination.currentPage === 1 ? -1 : 0}
              >
                Previous
              </Link>

              <div className="pagination-pages" aria-label="Archive pages">
                {Array.from({ length: archive.pagination.totalPages }, (_, index) => {
                  const page = index + 1
                  return (
                    <Link
                      aria-current={page === archive.pagination.currentPage ? 'page' : undefined}
                      className="pagination-link"
                      href={buildArchiveResultsUrl({
                        author: archive.filters.author,
                        category: archive.filters.category,
                        page,
                        series: archive.filters.series,
                        sort: archive.filters.sort,
                        tag: archive.filters.tag,
                      })}
                      key={page}
                    >
                      {page}
                    </Link>
                  )
                })}
              </div>

              <Link
                aria-disabled={archive.pagination.currentPage === archive.pagination.totalPages}
                className="pagination-link"
                href={
                  archive.pagination.currentPage === archive.pagination.totalPages
                    ? buildArchiveResultsUrl({
                        author: archive.filters.author,
                        category: archive.filters.category,
                        page: archive.pagination.totalPages,
                        series: archive.filters.series,
                        sort: archive.filters.sort,
                        tag: archive.filters.tag,
                      })
                    : buildArchiveResultsUrl({
                        author: archive.filters.author,
                        category: archive.filters.category,
                        page: archive.pagination.currentPage + 1,
                        series: archive.filters.series,
                        sort: archive.filters.sort,
                        tag: archive.filters.tag,
                      })
                }
                tabIndex={archive.pagination.currentPage === archive.pagination.totalPages ? -1 : 0}
              >
                Next
              </Link>
            </nav>
          ) : null}
        </>
      ) : (
        <section className="archive-empty" aria-live="polite">
          <div>
            <p className="eyebrow">No results</p>
            <h2>No articles match these filters.</h2>
            <p>Reset the filters or widen the current selection to see the archive again.</p>
          </div>
          <Link className="archive-reset-link" href="/articles">
            Clear filters
          </Link>
        </section>
      )}
    </main>
  )
}
