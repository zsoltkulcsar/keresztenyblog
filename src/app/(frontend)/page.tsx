import Image from 'next/image'
import Link from 'next/link'

import { homepageContent } from '@/lib/homepage-content'

import './styles.css'

export default function HomePage() {
  const { leadStory, latestArticles, modules } = homepageContent

  return (
    <main className="front-page">
      <header className="masthead">
        <div>
          <p className="eyebrow">Kovasz</p>
          <h1>Hungarian Christian articles, series, and study resources.</h1>
        </div>

        <nav aria-label="Primary" className="top-nav">
          <Link href="/articles">Articles</Link>
          <Link href="#series">Series</Link>
          <Link href="#resources">Resources</Link>
          <Link href="#about">About</Link>
        </nav>

        <div className="masthead-actions">
          <Link className="search-entry" href="/search">
            Search the publication
          </Link>
          <Link className="admin-link" href="/admin">
            Admin
          </Link>
        </div>
      </header>

      <section className="lead-story" aria-labelledby="lead-story-title">
        <div className="lead-copy">
          <p className="eyebrow">Featured article</p>
          <h2 id="lead-story-title">Why Scripture must shape every part of Christian growth</h2>
          <p className="deck">
            Kovasz exists to help new believers, mature readers, and leaders deepen their
            understanding of the Bible and walk faithfully in daily Christian life.
          </p>

          <div className="lead-meta">
            <span>Pastoral Theology</span>
            <span>Scripture first</span>
            <span>12 min read</span>
          </div>

          <div className="lead-links">
            <Link href="/admin">Read the issue</Link>
            <Link href="/articles">Browse archive</Link>
          </div>
        </div>

        <div className="lead-visual">
          <Image
            alt="Kovasz editorial reference cover"
            fill
            priority
            sizes="(max-width: 960px) 100vw, 52vw"
            src="/home-hero.png"
          />
        </div>
      </section>

      <section className="latest-section" id="latest" aria-labelledby="latest-title">
        <div className="section-heading">
          <p className="eyebrow">Latest articles</p>
          <h2 id="latest-title">Recent writing and teaching</h2>
        </div>

        <ol className="latest-grid">
          {latestArticles.map((article) => (
            <li className="latest-item" key={article.slug}>
              <p className="card-meta">
                <span>{article.category}</span>
                <span>{article.time}</span>
              </p>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <Link href="/articles">Open archive</Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="modules-grid" aria-label="Secondary editorial modules">
        {modules.map((module) => (
          <article className="module" key={module.key}>
            <p className="eyebrow">{module.eyebrow}</p>
            <h3>{module.title}</h3>
            <p>{module.body}</p>
          </article>
        ))}
      </section>

      <section className="bottom-band" id="series" aria-labelledby="series-title">
        <div>
          <p className="eyebrow">Series</p>
          <h2 id="series-title">Topic-based learning paths for new and mature believers.</h2>
        </div>
        <p>
          Series will carry the audience distinction, while the homepage keeps the front page
          mixed and editorial.
        </p>
      </section>

      <section className="bottom-band" id="resources" aria-labelledby="resources-title">
        <div>
          <p className="eyebrow">Resources</p>
          <h2 id="resources-title">Study aids, books, and teaching tools.</h2>
        </div>
        <p>
          Practical material stays organized for readers who want to study Scripture more
          carefully and serve others well.
        </p>
      </section>

      <section className="bottom-band" id="about" aria-labelledby="about-title">
        <div>
          <p className="eyebrow">About</p>
          <h2 id="about-title">Mission, doctrine, and editorial posture.</h2>
        </div>
        <p>
          The publication is shaped around Scripture, spiritual guidance, and daily Christian
          life.
        </p>
      </section>
    </main>
  )
}
