import Image from 'next/image'
import Link from 'next/link'

import { loadAboutPageContent } from '@/lib/about'
import { loadAuthorProfiles } from '@/lib/authors'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Mission, writers, contact, and editorial posture for Kovasz.',
    path: '/about',
    title: 'About',
  })
}

export default async function AboutPage() {
  const [about, authors] = await Promise.all([loadAboutPageContent(), loadAuthorProfiles()])
  const editors = authors.slice(0, 3)

  const editorialSteps = [
    'Every article should begin from Scripture or return clearly to Scripture.',
    'Teaching content should be reviewed for biblical clarity and pastoral tone.',
    'Reader questions can become future articles, series, or practical resources.',
  ]

  const commitments = [
    { body: about.mission, title: 'Mission' },
    { body: about.doctrine, title: 'Doctrine' },
    { body: about.editorialPosture, title: 'Editorial posture' },
  ]

  return (
    <main className="about-page">
      <header className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">About Kovasz</p>
          <h1>We help readers understand Scripture and follow Christ in daily life.</h1>
          <p>
            Kovasz exists for new Christians, growing believers, families, leaders, and readers who
            want biblical teaching that is clear, pastoral, and useful in ordinary life.
          </p>
        </div>
        <aside className="about-hero-card" aria-label="Editorial summary">
          <span>Editorial aim</span>
          <strong>Scripture first. Pastoral in tone. Practical in use.</strong>
          <p>
            Articles, series, books, and resources are shaped to help readers ask better questions,
            read the Bible carefully, and grow in faith.
          </p>
        </aside>
      </header>

      <section className="about-writers" aria-labelledby="about-writers-title">
        <div className="about-section-heading">
          <p className="eyebrow">Pastors and editors</p>
          <h2 id="about-writers-title">The people responsible for the teaching</h2>
          <p>
            The About page should make trust visible first. This section is the place for senior
            pastors, editors, theological reviewers, and later guest contributors with clear
            biography and photo.
          </p>
        </div>
        <div className="about-writer-list">
          {editors.map((editor) => (
            <article className="about-writer-card" key={editor.slug}>
              <Image
                alt={editor.photoAlt}
                className="about-writer-photo"
                height={400}
                src={editor.photoSrc}
                width={320}
              />
              <div>
                <span>{editor.role}</span>
                <h3>{editor.name}</h3>
                <p>{editor.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-process" aria-labelledby="about-process-title">
        <div>
          <p className="eyebrow">Editorial process</p>
          <h2 id="about-process-title">How content should be prepared</h2>
        </div>
        <ol>
          {editorialSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="about-publishing" aria-labelledby="about-publishing-title">
        <div className="about-section-heading">
          <p className="eyebrow">What we publish</p>
          <h2 id="about-publishing-title">Teaching, guidance, and resources organized around real questions.</h2>
        </div>
        <div className="about-topic-list">
          {[
            'Pastoral theology',
            'Christian life and personal growth',
            'Marriage, family, and relationships',
            'Ethics and daily Christian decisions',
          ].map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </section>

      <section className="about-contact" aria-labelledby="about-contact-title">
        <div className="about-contact-copy">
          <p className="eyebrow">Contact</p>
          <h2 id="about-contact-title">Do you have a question?</h2>
          <p>
            If you cannot find an answer, write to us with trust. Questions can be about faith,
            Scripture, Christian life, family, leadership, or a topic you would like to see treated
            carefully.
          </p>
          <div className="about-contact-links">
            {about.contactLinks.map((link) => (
              <Link href={link.url} key={link.url}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <form
          action="mailto:hello@kovasz.hu"
          className="about-contact-form"
          encType="text/plain"
          method="post"
        >
          <label>
            <span>Your email</span>
            <input name="email" placeholder="name@example.com" type="email" />
          </label>
          <label>
            <span>Subject</span>
            <input name="subject" placeholder="Question about..." type="text" />
          </label>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              placeholder="Write your question or message here..."
              rows={7}
            />
          </label>
          <button type="submit">Send message</button>
          <p>
            This starter form opens your email client for now. Later it can be connected to the CMS
            or a moderation inbox.
          </p>
        </form>
      </section>

      <section className="about-commitments" aria-label="Editorial commitments">
        {commitments.map((item) => (
          <article className="about-commitment" key={item.title}>
            <span>{item.title}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
