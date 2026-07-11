import Link from 'next/link'

import { buildArticleUrl, loadArticleDetails } from '@/lib/article-detail'
import { listDailyVerseEntries } from '@/lib/daily-verse'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildResourceUrl, loadResourceItems } from '@/lib/resources'
import { buildSeriesUrl, loadSeries } from '@/lib/series'

export const dynamic = 'force-dynamic'

function audienceLabel(value: string) {
  const labels: Record<string, string> = {
    'growing-believer': 'Novekvo hivo',
    leader: 'Vezeto',
    'mature-believer': 'Erett hivo',
    'new-believer': 'Uj hivo',
  }

  return labels[value] ?? value
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description:
      'Kovasz egy magyar kereszteny teologiai folyoirat cikkekkel, sorozatokkal es tanulmanyozasi segedanyagokkal.',
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
  const frontPageArticles = homepageArticles.slice(1, 4)
  const latestArticles = homepageArticles.slice(4, 8)
  const seriesIndex = (await loadSeries()).slice(0, 3)
  const resources = (await loadResourceItems()).slice(0, 3)
  const dailyVerse = listDailyVerseEntries().find((entry) => entry.status === 'published')

  return (
    <main className="guided-home">
      <section className="guided-hero" aria-labelledby="home-hero-title">
        <div className="guided-issue-line">
          <span>Kovasz</span>
          <span>Samizdat 04</span>
          <span>Budapest</span>
          <span>2026</span>
        </div>

        <div className="guided-masthead">
          <p className="eyebrow">Magyar kereszteny teologiai naplo</p>
          <h1 id="home-hero-title">Kovasz</h1>
          <p>
            Hit, gondolkodas, egyhaz es mindennapi engedelmesseg. Lassu olvasasra
            szerkesztett irasok azoknak, akik nem csak valaszokat, hanem tisztabb
            kerdeseket is keresnek.
          </p>
        </div>

        {leadArticle ? (
          <article className="guided-lead-article">
            <div className="guided-lead-label">
              <span>01</span>
              <p>Kiemelt iras</p>
            </div>
            <div className="guided-lead-copy">
              <p className="guided-meta">
                <span>{leadArticle.category}</span>
                <span>{leadArticle.readingMinutes} perc</span>
              </p>
              <h2>{leadArticle.title}</h2>
              <p>{leadArticle.excerpt}</p>
            </div>
            <Link href={buildArticleUrl(leadArticle.slug)}>Olvasas</Link>
          </article>
        ) : null}
      </section>

      {leadArticle ? (
        <section className="guided-reading-section" aria-labelledby="guided-reading-title">
          <div className="guided-section-heading">
            <p className="eyebrow">A lapszam elejerol</p>
            <h2 id="guided-reading-title">Harom iras, amely kijeloli a hangot</h2>
          </div>

          <div className="guided-front-list">
            {frontPageArticles.map((article, index) => (
              <Link href={buildArticleUrl(article.slug)} key={article.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p className="guided-meta">
                  <span>{article.category}</span>
                  <span>{article.readingMinutes} perc</span>
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
            <p className="eyebrow">Sorozatok</p>
            <h2 id="guided-series-title">Olvasasi utak, nem elszort linkek</h2>
          </div>
          <Link className="guided-inline-action" href="/series">
            Osszes sorozat
          </Link>
        </div>

        <div className="guided-series-grid">
          {seriesIndex.map((series, index) => (
            <article className="guided-series-card" key={series.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="guided-meta">
                  <span>{audienceLabel(series.audience)}</span>
                  <span>{series.articleSlugs.length} resz</span>
                </p>
                <h3>{series.title}</h3>
                <p>{series.description}</p>
              </div>
              <Link href={buildSeriesUrl(series.slug)}>Sorozat megnyitasa</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="guided-toolbox-section" aria-labelledby="guided-toolbox-title">
        <div className="guided-toolbox-intro">
          <p className="eyebrow">Mai jegyzet</p>
          <h2 id="guided-toolbox-title">Egy rovid ige melle lehet ulni</h2>
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
              <span>{resource.format ?? resource.type}</span>
              <strong>{resource.title}</strong>
              <small>{resource.usefulness}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="guided-question-section" aria-labelledby="guided-question-title">
        <div>
          <p className="eyebrow">Friss irasok</p>
          <h2 id="guided-question-title">A legutobbi rovatbol</h2>
          <p>
            Nem minden szovegnek kell hangosnak lennie. Ezek az irasok rovidebb
            bejaratot adnak teologiahoz, imadsaghoz, csaladhoz, gyulekezethez es
            kereszteny eletgyakorlathoz.
          </p>
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
        <p className="eyebrow">Kerdesed van?</p>
        <h2 id="guided-final-title">Ird meg, min dolgozik benned az Ige</h2>
        <p>
          A szerkesztoseg olyan kerdeseket var, amelyekbol kesobb cikk, sorozat,
          segedanyag vagy szemelyes valasz szulethet.
        </p>
        <div className="guided-button-row">
          <Link className="guided-button guided-button-primary" href="/articles">
            Cikkek bongeszese
          </Link>
          <Link className="guided-button guided-button-secondary" href="/about">
            Kapcsolat
          </Link>
        </div>
      </section>
    </main>
  )
}
