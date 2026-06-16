import Link from 'next/link'

import { buildArchiveUrl, createArchiveContent } from '@/lib/article-archive'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'

type ArchivePageProps = {
  searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
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

  return `Page ${currentPage} of ${totalPages} · ${totalArticles} articles`
}

export function generateMetadata({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
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
    const suffix = selectedFilters.length > 0 ? ` · ${selectedFilters.join(' · ')}` : ''
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

export default async function ArticlesPage({ searchParams }: ArchivePageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const archive = createArchiveContent(resolveSearchParams(resolvedSearchParams))
  const filterSummary = [
    archive.filters.category && optionLabel(archive.filters.category, archive.options.categories),
    archive.filters.series && optionLabel(archive.filters.series, archive.options.series),
    archive.filters.author && optionLabel(archive.filters.author, archive.options.authors),
    archive.filters.tag && optionLabel(archive.filters.tag, archive.options.tags),
  ].filter(Boolean) as string[]

  return (
    <main className="archive-page">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Articles</p>
          <h1>Archive and filters</h1>
          <p className="archive-intro">
            Browse the publication by topic, series, author, tag, or reading length. The archive
            stays editorial and fast, with URL state you can reload or share.
          </p>
        </div>

        <div className="archive-header-meta">
          <span>{buildPageLabel(archive.pagination.currentPage, archive.pagination.totalPages, archive.totalFilteredArticles)}</span>
          <Link className="archive-reset-link" href="/articles">
            Reset filters
          </Link>
        </div>
      </header>

      <section className="archive-toolbar" aria-label="Archive filters">
        <form action="/articles" className="archive-filters" method="get">
          <label>
            <span>Category</span>
            <select name="category" defaultValue={archive.filters.category}>
              <option value="">All categories</option>
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
            <span>Tag</span>
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
        </form>

        {filterSummary.length > 0 ? (
          <p className="archive-summary">
            Active filters: {filterSummary.join(' · ')}
          </p>
        ) : (
          <p className="archive-summary">No filters are active. The latest articles appear first.</p>
        )}
      </section>

      {archive.articles.length > 0 ? (
        <>
          <section className="archive-grid" aria-label="Article archive results">
            {archive.articles.map((article) => (
              <article className="archive-item" key={article.slug}>
                <p className="card-meta">
                  <span>{article.category.label}</span>
                  <span>{new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${article.publishedAt}T00:00:00Z`))}</span>
                </p>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <dl className="archive-details">
                  <div>
                    <dt>Series</dt>
                    <dd>{article.series.label}</dd>
                  </div>
                  <div>
                    <dt>Author</dt>
                    <dd>{article.author.label}</dd>
                  </div>
                  <div>
                    <dt>Reading time</dt>
                    <dd>{article.readingMinutes} min</dd>
                  </div>
                  <div>
                    <dt>Tags</dt>
                    <dd>{article.tags.map((tag) => tag.label).join(' · ')}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </section>

          {archive.pagination.totalPages > 1 ? (
            <nav className="archive-pagination" aria-label="Archive pagination">
              <Link
                aria-disabled={archive.pagination.currentPage === 1}
                className="pagination-link"
                href={
                  archive.pagination.currentPage === 1
                    ? '/articles'
                    : buildArchiveUrl({
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
                      href={buildArchiveUrl({
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
                    ? buildArchiveUrl({
                        author: archive.filters.author,
                        category: archive.filters.category,
                        page: archive.pagination.totalPages,
                        series: archive.filters.series,
                        sort: archive.filters.sort,
                        tag: archive.filters.tag,
                      })
                    : buildArchiveUrl({
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
            <p>
              Reset the filters or widen the current selection to see the archive again.
            </p>
          </div>
          <Link className="archive-reset-link" href="/articles">
            Clear filters
          </Link>
        </section>
      )}
    </main>
  )
}
