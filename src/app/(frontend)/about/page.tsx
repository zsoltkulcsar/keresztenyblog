import Image from 'next/image'
import Link from 'next/link'

import { loadAboutPageContent } from '@/lib/about'
import { loadAuthorProfiles } from '@/lib/authors'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { getTranslations } from '@/lib/i18n'

const t = getTranslations()

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: t.about.description,
    path: '/about',
    title: t.about.title,
  })
}

export default async function AboutPage() {
  const [about, authors] = await Promise.all([loadAboutPageContent(), loadAuthorProfiles()])
  const editors = authors.slice(0, 3)

  const editorialSteps = t.about.editorialSteps

  const principles = [
    { body: about.mission, title: t.about.principles.mission },
    { body: about.doctrine, title: t.about.principles.doctrine },
    { body: about.editorialPosture, title: t.about.principles.editorialPosture },
  ]

  return (
    <main className="about-page">
      <section className="about-principles" aria-label="Kovász küldetés és szerkesztői alapelvek">
        {principles.map((item) => (
          <article className="about-principle" key={item.title}>
            <span>{item.title}</span>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="about-writers" aria-labelledby="about-writers-title">
        <div className="about-section-heading">
          <p className="eyebrow">{t.about.peopleEyebrow}</p>
          <h2 id="about-writers-title">{t.about.peopleTitle}</h2>
          <p>{t.about.peopleBody}</p>
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
          <p className="eyebrow">{t.about.editorialProcess}</p>
          <h2 id="about-process-title">{t.about.processTitle}</h2>
        </div>
        <ol>
          {editorialSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="about-publishing" aria-labelledby="about-publishing-title">
        <div className="about-section-heading">
          <p className="eyebrow">{t.about.publishingEyebrow}</p>
          <h2 id="about-publishing-title">{t.about.publishingTitle}</h2>
        </div>
        <div className="about-topic-list">
          {t.about.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </section>

      <section className="about-contact" aria-labelledby="about-contact-title">
        <div className="about-contact-copy">
          <p className="eyebrow">{t.about.contactEyebrow}</p>
          <h2 id="about-contact-title">{t.about.contactTitle}</h2>
          <p>{t.about.contactBody}</p>
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
            <span>{t.about.emailLabel}</span>
            <input name="email" placeholder="name@example.com" type="email" />
          </label>
          <label>
            <span>{t.about.subjectLabel}</span>
            <input name="subject" placeholder={t.about.subjectPlaceholder} type="text" />
          </label>
          <label>
            <span>{t.about.messageLabel}</span>
            <textarea
              name="message"
              placeholder={t.about.messagePlaceholder}
              rows={7}
            />
          </label>
          <button type="submit">{t.about.sendMessage}</button>
        </form>
      </section>
    </main>
  )
}
