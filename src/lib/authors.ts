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
    bio: 'Helykitöltő profil a vezető pásztornak, aki teológiai irányt, pásztori átnézést és végső szerkesztői felügyeletet ad. Indulás előtt cseréld le a pásztor életrajzára és fényképére.',
    links: [{ label: 'Cikkek', url: '/articles' }],
    name: 'Vezető pásztor',
    photoAlt: 'Vezető pásztor profil helykitöltő',
    photoSrc: '/author-placeholder.svg',
    role: 'Vezető pásztori szerkesztő',
    slug: 'senior-pastor',
  },
  {
    articleSlugs: ['marriage-family-and-patient-love', 'teaching-children-the-gospel-at-home'],
    bio: 'Helykitöltő profil annak a szerkesztőnek, aki a tanító cikkek, sorozatszerkezet és gyakorlati tanítványi források formálásáért felel családoknak és növekedő hívőknek.',
    links: [{ label: 'Sorozatok', url: '/series/home-and-covenant' }],
    name: 'Szerkesztő pásztor',
    photoAlt: 'Szerkesztő pásztor profil helykitöltő',
    photoSrc: '/author-placeholder.svg',
    role: 'Tanító szerkesztő',
    slug: 'editorial-pastor',
  },
  {
    articleSlugs: ['ethics-in-everyday-decisions', 'leaders-need-more-than-charisma'],
    bio: 'Helykitöltő profil egy olyan átnézőnek, aki a tanításra, etikára, gyülekezeti vezetésre és az Ige-központú szerkesztői mérce világosságára figyel.',
    links: [{ label: 'Sorozatok', url: '/series/shepherding-the-church' }],
    name: 'Teológiai átnéző',
    photoAlt: 'Teológiai átnéző profil helykitöltő',
    photoSrc: '/author-placeholder.svg',
    role: 'Tanbeli és etikai átnéző',
    slug: 'theological-reviewer',
  },
  {
    articleSlugs: [
      'scripture-shapes-christian-growth',
      'daily-rhythm-for-spiritual-growth',
      'the-slow-work-of-grace',
    ],
    bio: 'Kompatibilitási profil az induló cikkekhez, amíg a pásztori szerkesztői profilokat valódi személyekre cserélik.',
    links: [{ label: 'Cikkek', url: '/articles' }],
    name: 'Szerkesztőség',
    photoAlt: 'Szerkesztőségi profil helykitöltő',
    photoSrc: '/author-placeholder.svg',
    role: 'Szerkesztőség',
    slug: 'editorial-team',
  },
  {
    articleSlugs: ['marriage-family-and-patient-love', 'teaching-children-the-gospel-at-home'],
    bio: 'Kompatibilitási profil az induló családi és kapcsolati cikkekhez.',
    links: [{ label: 'Sorozatok', url: '/series/home-and-covenant' }],
    name: 'Vendégszerző',
    photoAlt: 'Vendégszerző profil helykitöltő',
    photoSrc: '/author-placeholder.svg',
    role: 'Vendégszerző',
    slug: 'guest-contributor',
  },
  {
    articleSlugs: ['ethics-in-everyday-decisions', 'leaders-need-more-than-charisma'],
    bio: 'Kompatibilitási profil az induló pásztori teológiai és etikai cikkekhez.',
    links: [{ label: 'Sorozatok', url: '/series/shepherding-the-church' }],
    name: 'Pásztori rovat',
    photoAlt: 'Pásztori rovat profil helykitöltő',
    photoSrc: '/author-placeholder.svg',
    role: 'Pásztori szerkesztő',
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
    normalizeAuthorLink(doc.website, 'Weboldal'),
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
