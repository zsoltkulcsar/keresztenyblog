import { createArticleDetail, listArticleDetailSlugs } from '@/lib/article-detail'
import { getCmsPayload } from '@/lib/server/payload'

export type AuthorLink = {
  label: string
  url: string
}

export type AuthorProfile = {
  articleSlugs: string[]
  bio: string
  links: AuthorLink[]
  name: string
  photoAlt: string
  photoSrc: string
  role: string
  slug: string
}

const fallbackAuthorProfiles: AuthorProfile[] = [
  {
    articleSlugs: [
      'scripture-shapes-christian-growth',
      'daily-rhythm-for-spiritual-growth',
      'the-slow-work-of-grace',
    ],
    bio: 'Placeholder profile for the senior pastor who gives theological direction, pastoral review, and final editorial oversight. Replace this with the pastor biography and photo before launch.',
    links: [{ label: 'Articles', url: '/articles' }],
    name: 'Senior Pastor',
    photoAlt: 'Senior pastor profile placeholder',
    photoSrc: '/author-placeholder.svg',
    role: 'Lead pastoral editor',
    slug: 'senior-pastor',
  },
  {
    articleSlugs: ['marriage-family-and-patient-love', 'teaching-children-the-gospel-at-home'],
    bio: 'Placeholder profile for the editor responsible for shaping teaching articles, series structure, and practical discipleship resources for families and growing believers.',
    links: [{ label: 'Series', url: '/series/home-and-covenant' }],
    name: 'Editorial Pastor',
    photoAlt: 'Editorial pastor profile placeholder',
    photoSrc: '/author-placeholder.svg',
    role: 'Teaching editor',
    slug: 'editorial-pastor',
  },
  {
    articleSlugs: ['ethics-in-everyday-decisions', 'leaders-need-more-than-charisma'],
    bio: 'Placeholder profile for a reviewer focused on doctrine, ethics, church leadership, and the clarity of Scripture-first editorial standards.',
    links: [{ label: 'Series', url: '/series/shepherding-the-church' }],
    name: 'Theological Reviewer',
    photoAlt: 'Theological reviewer profile placeholder',
    photoSrc: '/author-placeholder.svg',
    role: 'Doctrine and ethics reviewer',
    slug: 'theological-reviewer',
  },
  {
    articleSlugs: [
      'scripture-shapes-christian-growth',
      'daily-rhythm-for-spiritual-growth',
      'the-slow-work-of-grace',
    ],
    bio: 'Compatibility profile for starter articles authored before the pastoral editor profiles are replaced with real people.',
    links: [{ label: 'Articles', url: '/articles' }],
    name: 'Editorial Team',
    photoAlt: 'Editorial team profile placeholder',
    photoSrc: '/author-placeholder.svg',
    role: 'Editorial team',
    slug: 'editorial-team',
  },
  {
    articleSlugs: ['marriage-family-and-patient-love', 'teaching-children-the-gospel-at-home'],
    bio: 'Compatibility profile for starter family and relationship articles.',
    links: [{ label: 'Series', url: '/series/home-and-covenant' }],
    name: 'Guest Contributor',
    photoAlt: 'Guest contributor profile placeholder',
    photoSrc: '/author-placeholder.svg',
    role: 'Guest contributor',
    slug: 'guest-contributor',
  },
  {
    articleSlugs: ['ethics-in-everyday-decisions', 'leaders-need-more-than-charisma'],
    bio: 'Compatibility profile for starter pastoral theology and ethics articles.',
    links: [{ label: 'Series', url: '/series/shepherding-the-church' }],
    name: 'Pastoral Desk',
    photoAlt: 'Pastoral desk profile placeholder',
    photoSrc: '/author-placeholder.svg',
    role: 'Pastoral editor',
    slug: 'pastoral-desk',
  },
]

function normalizeAuthorLink(url?: string | null, label?: string | null): AuthorLink | null {
  if (!url) return null
  return {
    label: label?.trim() || 'Link',
    url,
  }
}

function normalizeAuthorProfile(doc: any): AuthorProfile {
  const photo = doc.photo
  const photoSrc =
    typeof photo === 'object' && photo && 'url' in photo && photo.url
      ? String(photo.url)
      : '/author-placeholder.svg'
  const photoAlt =
    typeof photo === 'object' && photo && 'alt' in photo && photo.alt
      ? String(photo.alt)
      : `${doc.name} portrait`

  const links = [
    normalizeAuthorLink(doc.website, 'Website'),
    ...(Array.isArray(doc.links)
      ? doc.links.map((link: any) => normalizeAuthorLink(link?.url, link?.label))
      : []),
  ].filter(Boolean) as AuthorLink[]

  return {
    articleSlugs: Array.isArray(doc.articleSlugs) ? doc.articleSlugs.map(String) : [],
    bio: String(doc.bio ?? ''),
    links,
    name: String(doc.name ?? ''),
    photoAlt,
    photoSrc,
    role: String(doc.role ?? ''),
    slug: String(doc.slug ?? ''),
  }
}

export function buildAuthorUrl(slug: string) {
  return `/authors/${slug}`
}

export function listAuthorProfiles() {
  return fallbackAuthorProfiles
}

export function getAuthorProfileByName(name: string) {
  return fallbackAuthorProfiles.find((author) => author.name === name) ?? null
}

export function getAuthorProfileBySlug(slug: string) {
  return fallbackAuthorProfiles.find((author) => author.slug === slug) ?? null
}

export function listAuthorArticles(slug: string) {
  const author = getAuthorProfileBySlug(slug)
  if (!author) return []

  return author.articleSlugs
    .map((articleSlug) => createArticleDetail(articleSlug))
    .filter(Boolean)
    .map((article) => article!)
}

export async function loadAuthorProfiles() {
  const payload = await getCmsPayload()
  if (!payload) return fallbackAuthorProfiles

  try {
    const result = await (payload as any).find({
      collection: 'authors',
      limit: 100,
      sort: 'name',
    })

    if (result?.docs?.length) {
      const mergedProfiles = new Map<string, AuthorProfile>()

      for (const profile of fallbackAuthorProfiles) {
        mergedProfiles.set(profile.slug, profile)
      }

      for (const profile of result.docs.map(normalizeAuthorProfile)) {
        if (profile.slug) {
          mergedProfiles.set(profile.slug, profile)
        }
      }

      return Array.from(mergedProfiles.values())
    }
  } catch {
    return fallbackAuthorProfiles
  }

  return fallbackAuthorProfiles
}

export async function loadAuthorProfileByName(name: string) {
  const profiles = await loadAuthorProfiles()
  return profiles.find((author) => author.name === name) ?? null
}

export async function loadAuthorProfile(slug: string) {
  const profiles = await loadAuthorProfiles()
  const profile = profiles.find((item) => item.slug === slug)
  return profile ?? null
}

export function listAuthorProfileSlugs() {
  return listAuthorProfiles().map((author) => author.slug)
}

export function listPublishedArticleRefsForAuthor(name: string) {
  return listArticleDetailSlugs()
    .map((slug) => createArticleDetail(slug))
    .filter((article) => article?.author === name)
    .map((article) => article!)
}
