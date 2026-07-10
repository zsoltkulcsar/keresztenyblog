import Image from 'next/image'
import Link from 'next/link'

import { buildArticleUrl, loadArticleDetails } from '@/lib/article-detail'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildResourceUrl, loadResourceItems } from '@/lib/resources'
import { buildSeriesUrl, loadSeries } from '@/lib/series'

export const dynamic = 'force-dynamic'

function visualTone(slug: string, index = 0) {
  const score = Array.from(slug).reduce((total, char) => total + char.charCodeAt(0), index)
  return `article-visual article-visual-${score % 12}`
}

function audienceLabel(value: string) {
  const labels: Record<string, string> = {
    'growing-believer': 'Growing believer',
    leader: 'Leader',
    'mature-believer': 'Mature believer',
    'new-believer': 'New believer',
  }

  return labels[value] ?? value
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description:
      'Kovasz is a Scripture-first Christian publication for articles, series, and study resources.',
    path: '/',
    title: 'Kovasz',
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
  const editorPicks = homepageArticles.slice(1, 4)
  const seriesIndex = (await loadSeries()).slice(0, 3)
  const resources = (await loadResourceItems()).slice(0, 4)

  return (
    <main className="guided-home">
      <section className="guided-hero" aria-labelledby="home-hero-title">
        <Image
          alt="People studying Scripture together"
          fill
          priority
          sizes="100vw"
          src="/home-hero.png"
        />
        <div className="guided-hero-overlay" />
        <div className="guided-hero-copy">
          <p className="eyebrow">Kovasz</p>
          <h1 id="home-hero-title">Scripture-first Christian teaching for everyday faith</h1>
          <p>
            Articles, guided series, and study resources that help readers understand the Bible,
            grow in Christ, and live faithfully in daily life.
          </p>
          <div className="guided-button-row">
            <Link className="guided-button guided-button-primary" href="/articles">
              Start reading
            </Link>
            <Link className="guided-button guided-button-secondary" href="/series">
              Choose a series
            </Link>
          </div>
        </div>
      </section>

      {leadArticle ? (
        <section className="guided-reading-section" aria-labelledby="guided-reading-title">
          <div className="guided-section-heading">
            <p className="eyebrow">Latest and selected</p>
            <h2 id="guided-reading-title">Read with a clear first step</h2>
            <p>
              The newest article is paired with a few editorial recommendations worth opening next.
            </p>
          </div>

          <div className="guided-reading-layout">
            <article className="guided-lead-article">
              <div
                className={`guided-lead-visual ${visualTone(leadArticle.slug)}`}
                aria-hidden="true"
              />
              <div>
                <p className="guided-meta">
                  <span>{leadArticle.category}</span>
                  <span>{leadArticle.readingMinutes} min read</span>
                </p>
                <h3>{leadArticle.title}</h3>
                <p>{leadArticle.excerpt}</p>
                <Link href={buildArticleUrl(leadArticle.slug)}>Read latest article</Link>
              </div>
            </article>

            <aside className="guided-editor-picks" aria-label="Editor picks">
              <div>
                <p className="eyebrow">Editor picks</p>
                <h3>Worth reading next</h3>
              </div>
              <div className="guided-pick-list">
                {editorPicks.map((article) => (
                  <Link href={buildArticleUrl(article.slug)} key={article.slug}>
                    <span>{article.category}</span>
                    <strong>{article.title}</strong>
                    <small>{article.excerpt}</small>
                  </Link>
                ))}
              </div>
              <Link className="guided-inline-action" href="/articles">
                Browse all articles
              </Link>
            </aside>
          </div>
        </section>
      ) : null}

      <section className="guided-series-section" aria-labelledby="guided-series-title">
        <div className="guided-section-heading guided-section-heading-split">
          <div>
            <p className="eyebrow">Guided series</p>
            <h2 id="guided-series-title">Follow a study path instead of scattered links</h2>
          </div>
          <Link className="guided-inline-action" href="/series">
            View all series
          </Link>
        </div>

        <div className="guided-series-grid">
          {seriesIndex.map((series, index) => (
            <article className="guided-series-card" key={series.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="guided-meta">
                  <span>{audienceLabel(series.audience)}</span>
                  <span>{series.articleSlugs.length} parts</span>
                </p>
                <h3>{series.title}</h3>
                <p>{series.description}</p>
              </div>
              <Link href={buildSeriesUrl(series.slug)}>Start path</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="guided-toolbox-section" aria-labelledby="guided-toolbox-title">
        <div className="guided-toolbox-intro">
          <p className="eyebrow">Resources toolbox</p>
          <h2 id="guided-toolbox-title">Practical aids for study, prayer, and teaching</h2>
          <p>
            Use the resource library when an article needs a worksheet, reading plan, checklist, or
            group-ready tool beside it.
          </p>
          <Link className="guided-button guided-button-primary" href="/resources">
            Open resources
          </Link>
        </div>

        <div className="guided-resource-list">
          {resources.map((resource) => (
            <Link href={buildResourceUrl(resource.slug)} key={resource.slug}>
              <span>{resource.format ?? resource.type}</span>
              <strong>{resource.title}</strong>
              <small>{resource.usefulness}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="guided-question-section" aria-labelledby="guided-question-title">
        <div>
          <p className="eyebrow">Have a question?</p>
          <h2 id="guided-question-title">If you cannot find the answer, write to us</h2>
          <p>
            Some questions need more than a search result. Send us what you are wrestling with, and
            we will consider how to answer it through an article, series, resource, or direct
            pastoral reply.
          </p>
        </div>
        <div className="guided-question-card">
          <p>
            Write with trust. Questions about Scripture, Christian life, family, ethics, and
            spiritual growth can help shape future Kovasz content.
          </p>
          <div className="guided-button-row">
            <Link className="guided-button guided-button-primary" href="/about">
              Contact us
            </Link>
            <Link className="guided-button guided-button-secondary" href="/search">
              Search first
            </Link>
          </div>
        </div>
      </section>

      <section className="guided-final-cta" aria-labelledby="guided-final-title">
        <p className="eyebrow">Next faithful step</p>
        <h2 id="guided-final-title">Start with the question you are carrying today</h2>
        <div className="guided-button-row">
          <Link className="guided-button guided-button-primary" href="/articles">
            Browse articles
          </Link>
          <Link className="guided-button guided-button-secondary" href="/series">
            Choose a series
          </Link>
        </div>
      </section>
    </main>
  )
}
