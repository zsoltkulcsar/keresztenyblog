import Link from 'next/link'

import { buildArticleUrl, loadArticleDetails } from '@/lib/article-detail'
import { listDailyVerseEntries } from '@/lib/daily-verse'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { getTranslations, translateResourceLabel } from '@/lib/i18n'
import { buildResourceUrl, loadResourceItems } from '@/lib/resources'
import { buildSeriesUrl, loadSeries } from '@/lib/series'

export const dynamic = 'force-dynamic'

const t = getTranslations()

function audienceLabel(value: string) {
  return t.home.audienceLabels[value as keyof typeof t.home.audienceLabels] ?? value
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: t.home.metadataDescription,
    path: '/',
    title: 'Kovász',
  })
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  await Promise.resolve(searchParams ?? {})

  const homepageArticles = (await loadArticleDetails()).slice(0, 8)
  const leadArticle = homepageArticles[0]
  const frontPageArticles = homepageArticles.slice(1, 4)
  const latestArticles = homepageArticles.slice(4, 8)
  const seriesIndex = (await loadSeries()).slice(0, 3)
  const resources = (await loadResourceItems()).slice(0, 3)
  const dailyVerse = listDailyVerseEntries().find((entry) => entry.status === 'published')

  return (
    <main className="guided-home">
      <section className="guided-hero" aria-labelledby="home-hero-title">
        <div className="guided-issue-line">
          <span>{t.home.issueName}</span>
          <span>{t.home.issueNumber}</span>
          <span>{t.home.issueCity}</span>
          <span>{t.home.issueYear}</span>
        </div>

        <div className="guided-masthead">
          <p className="eyebrow">{t.home.heroEyebrow}</p>
          <h1 id="home-hero-title">Kovász</h1>
          <p>{t.home.heroBody}</p>
        </div>

        {leadArticle ? (
          <article className="guided-lead-article">
            <div className="guided-lead-label">
              <span>01</span>
              <p>{t.home.leadLabel}</p>
            </div>
            <div className="guided-lead-copy">
              <p className="guided-meta">
                <span>{leadArticle.category}</span>
                <span>
                  {leadArticle.readingMinutes} {t.common.minRead}
                </span>
              </p>
              <h2>{leadArticle.title}</h2>
              <p>{leadArticle.excerpt}</p>
            </div>
            <Link href={buildArticleUrl(leadArticle.slug)}>{t.home.leadLink}</Link>
          </article>
        ) : null}
      </section>

      {leadArticle ? (
        <section className="guided-reading-section" aria-labelledby="guided-reading-title">
          <div className="guided-section-heading">
            <p className="eyebrow">{t.home.frontEyebrow}</p>
            <h2 id="guided-reading-title">{t.home.frontTitle}</h2>
          </div>

          <div className="guided-front-list">
            {frontPageArticles.map((article, index) => (
              <Link href={buildArticleUrl(article.slug)} key={article.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p className="guided-meta">
                  <span>{article.category}</span>
                  <span>
                    {article.readingMinutes} {t.common.minRead}
                  </span>
                </p>
                <strong>{article.title}</strong>
                <small>{article.excerpt}</small>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="guided-series-section" aria-labelledby="guided-series-title">
        <div className="guided-section-heading guided-section-heading-split">
          <div>
            <p className="eyebrow">{t.home.seriesEyebrow}</p>
            <h2 id="guided-series-title">{t.home.seriesTitle}</h2>
          </div>
          <Link className="guided-inline-action" href="/series">
            {t.home.seriesAll}
          </Link>
        </div>

        <div className="guided-series-grid">
          {seriesIndex.map((series, index) => (
            <article className="guided-series-card" key={series.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="guided-meta">
                  <span>{audienceLabel(series.audience)}</span>
                  <span>
                    {series.articleSlugs.length} {t.home.seriesPart}
                  </span>
                </p>
                <h3>{series.title}</h3>
                <p>{series.description}</p>
              </div>
              <Link href={buildSeriesUrl(series.slug)}>{t.home.seriesLink}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="guided-toolbox-section" aria-labelledby="guided-toolbox-title">
        <div className="guided-toolbox-intro">
          <p className="eyebrow">{t.home.verseEyebrow}</p>
          <h2 id="guided-toolbox-title">{t.home.resourcesTitle}</h2>
          {dailyVerse ? (
            <figure className="guided-daily-verse">
              <blockquote>{dailyVerse.text}</blockquote>
              <figcaption>{dailyVerse.reference}</figcaption>
            </figure>
          ) : null}
        </div>

        <div className="guided-resource-list">
          {resources.map((resource) => (
            <Link href={buildResourceUrl(resource.slug)} key={resource.slug}>
              <span>{resource.format ? translateResourceLabel(resource.format) : resource.type}</span>
              <strong>{resource.title}</strong>
              <small>{resource.usefulness}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="guided-question-section" aria-labelledby="guided-question-title">
        <div>
          <p className="eyebrow">{t.home.latestEyebrow}</p>
          <h2 id="guided-question-title">{t.home.latestTitle}</h2>
          <p>{t.home.latestBody}</p>
        </div>
        <div className="guided-latest-list">
          {latestArticles.map((article) => (
            <Link href={buildArticleUrl(article.slug)} key={article.slug}>
              <span>{article.category}</span>
              <strong>{article.title}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="guided-final-cta" aria-labelledby="guided-final-title">
        <p className="eyebrow">{t.home.finalEyebrow}</p>
        <h2 id="guided-final-title">{t.home.finalTitle}</h2>
        <p>{t.home.finalBody}</p>
        <div className="guided-button-row">
          <Link className="guided-button guided-button-primary" href="/articles">
            {t.home.browseArticles}
          </Link>
          <Link className="guided-button guided-button-secondary" href="/about">
            {t.home.contact}
          </Link>
        </div>
      </section>
    </main>
  )
}
