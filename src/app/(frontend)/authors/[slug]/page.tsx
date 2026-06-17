import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buildArticleUrl, createArticleDetail } from '@/lib/article-detail'
import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildAuthorUrl, loadAuthorProfile } from '@/lib/authors'

function articleCardTitle(slug: string) {
  return createArticleDetail(slug)?.title ?? slug
}

export function generateMetadata({
  params,
}: {
  params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}) {
  return Promise.resolve(params ?? {}).then(async (resolvedParams) => {
    const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug
    const profile = slug ? await loadAuthorProfile(slug) : null

    if (!profile) {
      return buildDiscoveryMetadata({
        description: 'Author profile',
        noIndex: true,
        path: buildAuthorUrl(slug ?? ''),
        title: 'Author not found',
      })
    }

    return buildDiscoveryMetadata({
      description: profile.bio,
      path: buildAuthorUrl(profile.slug),
      title: profile.name,
    })
  })
}

export default async function AuthorDetailPage({
  params,
}: {
  params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await Promise.resolve(params ?? {})
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug
  const profile = slug ? await loadAuthorProfile(slug) : null

  if (!profile) {
    notFound()
  }

  const articleSlugs = profile.articleSlugs

  return (
    <main className="profile-page">
      <header className="profile-hero">
        <div className="profile-copy">
          <p className="eyebrow">Author</p>
          <h1>{profile.name}</h1>
          <p className="profile-role">{profile.role}</p>
          <p className="archive-intro">{profile.bio}</p>
          <div className="profile-links">
            {profile.links.map((link) => (
              <Link className="page-link" href={link.url} key={link.url}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Image alt={profile.photoAlt} className="profile-photo" height={720} src={profile.photoSrc} width={520} />
      </header>

      <section className="related-section" aria-label="Published articles">
        <div className="section-heading">
          <p className="eyebrow">Articles</p>
          <h2>Published writing</h2>
        </div>

        <div className="related-grid">
          {articleSlugs.map((articleSlug) => {
            const article = createArticleDetail(articleSlug)
            if (!article) return null

            return (
              <article className="related-item" key={article.slug}>
                <p className="card-meta">
                  <span>{article.category}</span>
                  <span>{article.readingMinutes} min</span>
                </p>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link href={buildArticleUrl(article.slug)}>Open article</Link>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
