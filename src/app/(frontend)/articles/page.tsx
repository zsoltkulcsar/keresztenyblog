import Link from 'next/link'

import { buildArchiveUrl, loadArchiveContent, type ArchiveFilters } from '@/lib/article-archive'
import { buildArticleUrl } from '@/lib/article-detail'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'

export const dynamic = 'force-dynamic'

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
    return 'Nincs publikált cikk az aktuális szűrőkkel.'
  }

  return `${currentPage}. oldal / ${totalPages} / ${totalArticles} cikk`
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
      page && page !== '1' ? `${page}. oldal` : '',
    ].filter(Boolean) as string[]
    const suffix = selectedFilters.length > 0 ? ` / ${selectedFilters.join(' / ')}` : ''
    const query = new URLSearchParams()

    if (author) query.set('author', author)
    if (category) query.set('category', category)
    if (page && page !== '1') query.set('page', page)
    if (series) query.set('series', series)
    if (tag) query.set('tag', tag)

    return buildDiscoveryMetadata({
      description: 'Böngészd a Kovász archívumát kategória, sorozat, szerző, címke és rendezés szerint.',
      path: query.toString() ? `/articles?${query.toString()}` : '/articles',
      title: `Cikkek${suffix}`,
    })
  })
}

const audienceTabs = [
  { href: '/articles', label: 'Mind' },
  { href: '/audiences/new-believers', label: 'Új hívők' },
  { href: '/topics/spiritual-growth', label: 'Növekedő hívők' },
  { href: '/topics/leadership', label: 'Vezetők' },
  { href: '/series', label: 'Sorozatok' },
  { href: '/resources', label: 'Segédanyagok' },
]

const readingGuides = [
  {
    description: 'Kezdd alapvető tanítással, Szentírással és stabil keresztény növekedéssel.',
    href: '/audiences/new-believers',
    label: 'Új a hitben',
  },
  {
    description: 'Építs szokásokat a Szentírás, imádság, türelem és engedelmesség köré.',
    href: '/topics/spiritual-growth',
    label: 'Napi növekedés',
  },
  {
    description: 'Olvass házasságról, családról, gyermeknevelésről és türelmes otthoni szeretetről.',
    href: '/topics/family',
    label: 'Házasság és család',
  },
  {
    description: 'Gondold végig Isten előtt a munkát, döntéseket, beszédet és közéletet.',
    href: '/topics/ethics',
    label: 'Nehéz kérdések',
  },
  {
    description: 'Találj pásztori teológiát, vezetést és mások szolgálatához való anyagot.',
    href: '/topics/leadership',
    label: 'Vezetőknek',
  },
]

export default async function ArticlesPage({ searchParams }: ArchivePageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const archive = await loadArchiveContent(resolveSearchParams(resolvedSearchParams))
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
          <p className="eyebrow">Cikkek</p>
          <h1>Cikkek</h1>
          <p className="archive-intro">
            Ige-központú írások hívőknek a hit és megértés minden szakaszában.
          </p>
        </div>
        <form action="/search" className="archive-search" method="get">
          <label>
            <span>Keresés téma, kérdés vagy bibliai igeszakasz szerint</span>
            <input name="q" placeholder="23. zsoltár, házasság, imádság..." type="search" />
          </label>
          <button type="submit">Keresés</button>
        </form>
        <nav className="archive-audience-tabs" aria-label="Cikkek böngészése célcsoport szerint">
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
                <p className="eyebrow">Legújabb cikk</p>
                <h2 id="archive-latest-title">{latestArticle.title}</h2>
                <p>{latestArticle.excerpt}</p>
                <dl className="archive-latest-meta">
                  <div>
                    <dt>Téma</dt>
                    <dd>{latestArticle.category.label}</dd>
                  </div>
                  <div>
                    <dt>Sorozat</dt>
                    <dd>{latestArticle.series.label}</dd>
                  </div>
                  <div>
                    <dt>Olvasás</dt>
                    <dd>{latestArticle.readingMinutes} perc</dd>
                  </div>
                </dl>
                <Link
                  className="figma-button figma-button-primary"
                  href={buildArticleUrl(latestArticle.slug)}
                >
                  Legújabb cikk olvasása
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
                  <h2 id="archive-editors-title">Szerkesztői ajánlások</h2>
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
                          <span>{article.readingMinutes} perc olvasás</span>
                        </p>
                        <h3>{article.title}</h3>
                        <p>{article.excerpt}</p>
                        <Link href={buildArticleUrl(article.slug)}>Tovább olvasom</Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="archive-reading-guide" aria-label="Hol kezdd">
                <div>
                  <p className="eyebrow">Hol kezdd</p>
                  <h2>Olvass szükség szerint</h2>
                  <p>Válaszd azt az utat, amely legjobban illik az olvasó helyzetéhez.</p>
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
                  Segédanyagok megnyitása
                </Link>
              </aside>
            </div>
          </section>

          <section className="archive-library" aria-labelledby="archive-library-title">
            <aside className="archive-filter-panel" aria-label="Cikkszűrők">
              <div>
                <p className="eyebrow">Böngészés</p>
                <h2>Cikkek keresése</h2>
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
                  <span>Téma</span>
                  <select name="category" defaultValue={archive.filters.category}>
                    <option value="">Minden téma</option>
                    {archive.options.categories.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Sorozat</span>
                  <select name="series" defaultValue={archive.filters.series}>
                    <option value="">Minden sorozat</option>
                    {archive.options.series.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Szerző</span>
                  <select name="author" defaultValue={archive.filters.author}>
                    <option value="">Minden szerző</option>
                    {archive.options.authors.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Szentírás / címke</span>
                  <select name="tag" defaultValue={archive.filters.tag}>
                    <option value="">Minden címke</option>
                    {archive.options.tags.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Rendezés</span>
                  <select name="sort" defaultValue={archive.filters.sort}>
                    {archive.options.sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button type="submit">Szűrők alkalmazása</button>
                <Link className="archive-filter-reset" href="/articles">
                  Szűrők visszaállítása
                </Link>
              </form>
            </aside>

            <div className="archive-results" id="all-articles">
              <div className="archive-results-heading">
                <div>
                  <p className="eyebrow">Könyvtár</p>
                  <h2 id="archive-library-title">Összes cikk</h2>
                </div>
                {filterSummary.length > 0 ? (
                  <p className="archive-summary">Aktív szűrők: {filterSummary.join(' / ')}</p>
                ) : (
                  <p className="archive-summary">Legújabb cikkek elöl.</p>
                )}
              </div>

              <div className="archive-result-list">
                {archiveResults.map((article) => (
                  <article className="archive-result-item" key={article.slug}>
                    <div>
                      <p className="archive-card-meta">
                        <span>{article.category.label}</span>
                        <span>{article.readingMinutes} perc olvasás</span>
                      </p>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <dl>
                        <div>
                          <dt>Sorozat</dt>
                          <dd>{article.series.label}</dd>
                        </div>
                        <div>
                          <dt>Szerző</dt>
                          <dd>{article.author.label}</dd>
                        </div>
                        <div>
                          <dt>Címkék</dt>
                          <dd>{article.tags.map((tag) => tag.label).join(' / ')}</dd>
                        </div>
                      </dl>
                    </div>
                    <Link href={buildArticleUrl(article.slug)}>Cikk olvasása</Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {archive.pagination.totalPages > 1 ? (
            <nav className="archive-pagination" aria-label="Archívum lapozás">
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
                Előző
              </Link>

              <div className="pagination-pages" aria-label="Archívum oldalak">
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
                Következő
              </Link>
            </nav>
          ) : null}
        </>
      ) : (
        <section className="archive-empty" aria-live="polite">
          <div>
            <p className="eyebrow">Nincs találat</p>
            <h2>Nincs cikk ezekkel a szűrőkkel.</h2>
            <p>Állítsd vissza a szűrőket, vagy tágítsd a jelenlegi választást az archívumhoz.</p>
          </div>
          <Link className="archive-reset-link" href="/articles">
            Szűrők törlése
          </Link>
        </section>
      )}
    </main>
  )
}
