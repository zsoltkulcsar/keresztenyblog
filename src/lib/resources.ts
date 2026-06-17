import { getCmsPayload } from '@/lib/server/payload'

export type ResourceType = 'study-guide' | 'book' | 'article' | 'series' | 'file' | 'link'

export type ResourceItem = {
  description: string
  externalUrl?: string | null
  fileHref?: string | null
  relatedArticleSlugs: string[]
  relatedSeriesSlugs: string[]
  slug: string
  status: 'draft' | 'published'
  title: string
  type: ResourceType
  usefulness: string
}

const fallbackResources: ResourceItem[] = [
  {
    description: 'A guided entry point for readers who want to understand the whole shape of Christian growth.',
    externalUrl: null,
    relatedArticleSlugs: ['scripture-shapes-christian-growth'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'bible-study-aids',
    status: 'published',
    title: 'Bible study aids',
    type: 'study-guide',
    usefulness: 'Helps readers slow down, observe the text, and keep the passage at the center.',
  },
  {
    description: 'A focused reading path for new and growing believers who want structure instead of scattered links.',
    externalUrl: null,
    relatedArticleSlugs: ['daily-rhythm-for-spiritual-growth'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'foundations-series-guide',
    status: 'published',
    title: 'Foundations series guide',
    type: 'series',
    usefulness: 'Groups the articles into one path for learning and review.',
  },
  {
    description: 'Short Scripture readings for the day with archive access and stable links.',
    externalUrl: null,
    relatedArticleSlugs: [],
    relatedSeriesSlugs: [],
    slug: 'daily-verse-archive',
    status: 'published',
    title: 'Daily Verse archive',
    type: 'link',
    usefulness: 'Keeps daily reading easy to revisit and share.',
  },
  {
    description: 'A downloadable reading aid for keeping track of passages, notes, and questions.',
    fileHref: '/home-hero.png',
    relatedArticleSlugs: ['how-to-read-the-bible-when-stuck'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'printable-reading-plan',
    status: 'published',
    title: 'Printable reading plan',
    type: 'file',
    usefulness: 'Useful for printed study and slower personal review.',
  },
]

function normalizeResource(doc: any): ResourceItem {
  const file = doc.file
  const fileHref = typeof file === 'object' && file && 'url' in file && file.url ? String(file.url) : null

  return {
    description: String(doc.description ?? ''),
    externalUrl: doc.externalUrl ? String(doc.externalUrl) : null,
    fileHref,
    relatedArticleSlugs: Array.isArray(doc.relatedArticleSlugs) ? doc.relatedArticleSlugs.map(String) : [],
    relatedSeriesSlugs: Array.isArray(doc.relatedSeriesSlugs) ? doc.relatedSeriesSlugs.map(String) : [],
    slug: String(doc.slug ?? ''),
    status: doc.status === 'published' ? 'published' : 'draft',
    title: String(doc.title ?? ''),
    type: doc.type as ResourceType,
    usefulness: String(doc.usefulness ?? ''),
  }
}

export function listResourceItems() {
  return fallbackResources
}

export function getResourceItemBySlug(slug: string) {
  return fallbackResources.find((resource) => resource.slug === slug) ?? null
}

export async function loadResourceItems() {
  const payload = await getCmsPayload()
  if (!payload) return fallbackResources

  try {
    const result = await (payload as any).find({
      collection: 'resources',
      limit: 100,
      sort: 'title',
    })

    if (result?.docs?.length) {
      const mergedResources = new Map<string, ResourceItem>()

      for (const resource of fallbackResources) {
        mergedResources.set(resource.slug, resource)
      }

      for (const resource of result.docs.map(normalizeResource)) {
        if (resource.slug) {
          mergedResources.set(resource.slug, resource)
        }
      }

      return Array.from(mergedResources.values())
    }
  } catch {
    return fallbackResources
  }

  return fallbackResources
}

export async function loadResourceItem(slug: string) {
  const items = await loadResourceItems()
  return items.find((resource) => resource.slug === slug) ?? null
}

export function buildResourceUrl(slug: string) {
  return `/resources/${slug}`
}
