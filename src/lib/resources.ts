import { getCmsPayload } from '@/lib/server/payload'
import { relationTitle } from '@/lib/cms-content'

export type ResourceType =
  | 'article'
  | 'book'
  | 'file'
  | 'link'
  | 'reading-plan'
  | 'series'
  | 'study-guide'
  | 'leader-tool'

export type ResourceItem = {
  audience?: string
  ctaLabel?: string
  description: string
  externalUrl?: string | null
  fileHref?: string | null
  format?: string
  featured?: boolean
  highlights: string[]
  relatedArticleSlugs: string[]
  relatedSeriesSlugs: string[]
  slug: string
  status: 'draft' | 'published'
  steps: string[]
  title: string
  topic?: string
  type: ResourceType
  usefulness: string
}

const fallbackResources: ResourceItem[] = [
  {
    audience: 'New believers',
    ctaLabel: 'Open study guide',
    description:
      'A guided entry point for readers who want to understand the whole shape of Christian growth through Scripture.',
    externalUrl: null,
    featured: true,
    format: 'Guided study',
    highlights: ['Scripture observation', 'reflection prompts', 'weekly rhythm'],
    relatedArticleSlugs: ['scripture-shapes-christian-growth'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'bible-study-aids',
    status: 'published',
    title: 'Bible study aids',
    topic: 'Bible reading',
    type: 'study-guide',
    usefulness: 'Helps readers slow down, observe the text, and keep the passage at the center.',
    steps: [
      'Read the passage twice before opening notes or commentaries.',
      'Write one observation, one question, and one response of prayer.',
      'Return to the related article or series when a theme needs deeper study.',
    ],
  },
  {
    audience: 'New and growing believers',
    ctaLabel: 'View series path',
    description:
      'A focused reading path for new and growing believers who want structure instead of scattered links.',
    externalUrl: null,
    format: 'Series companion',
    highlights: ['ordered reading', 'doctrine basics', 'discussion-ready'],
    relatedArticleSlugs: ['daily-rhythm-for-spiritual-growth'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'foundations-series-guide',
    status: 'published',
    title: 'Foundations series guide',
    topic: 'Discipleship',
    type: 'series',
    usefulness: 'Groups the articles into one path for learning and review.',
    steps: [
      'Start with the first article in the Foundations series.',
      'Use the summary questions after each reading.',
      'Repeat difficult sections with a mentor, group, or pastor.',
    ],
  },
  {
    audience: 'Daily readers',
    ctaLabel: 'Open archive',
    description: 'Short Scripture readings for the day with archive access and stable links.',
    externalUrl: null,
    format: 'Archive link',
    highlights: ['daily rhythm', 'shareable references', 'short readings'],
    relatedArticleSlugs: [],
    relatedSeriesSlugs: [],
    slug: 'daily-verse-archive',
    status: 'published',
    title: 'Daily Verse archive',
    topic: 'Devotional rhythm',
    type: 'link',
    usefulness: 'Keeps daily reading easy to revisit and share.',
    steps: [
      'Choose one reading for the morning or evening.',
      'Read the verse in its surrounding paragraph.',
      'Save the link when it helps a conversation or prayer time.',
    ],
  },
  {
    audience: 'Personal study',
    ctaLabel: 'Open file',
    description: 'A downloadable reading aid for keeping track of passages, notes, and questions.',
    fileHref: '/home-hero.png',
    format: 'Printable file',
    highlights: ['printable', 'notes', 'questions'],
    relatedArticleSlugs: ['how-to-read-the-bible-when-stuck'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'printable-reading-plan',
    status: 'published',
    title: 'Printable reading plan',
    topic: 'Bible reading',
    type: 'file',
    usefulness: 'Useful for printed study and slower personal review.',
    steps: [
      'Print one page per week or keep the file beside your Bible.',
      'Use the question space before reading secondary resources.',
      'Review the notes at the end of the week.',
    ],
  },
  {
    audience: 'Small group leaders',
    ctaLabel: 'Open leader tool',
    description:
      'A practical outline for preparing a Bible discussion without turning it into a lecture.',
    format: 'Leader worksheet',
    highlights: ['group questions', 'text-first flow', 'pastoral application'],
    relatedArticleSlugs: ['how-to-read-the-bible-when-stuck'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'small-group-discussion-guide',
    status: 'published',
    title: 'Small group discussion guide',
    topic: 'Leadership',
    type: 'leader-tool',
    usefulness:
      'Helps leaders ask better questions and keep the group anchored in the biblical text.',
    steps: [
      'Mark the main movement of the passage before writing questions.',
      'Prepare one observation, one interpretation, and one application question.',
      'Leave space for prayer and concrete obedience.',
    ],
  },
  {
    audience: 'Married couples and families',
    ctaLabel: 'Open reading plan',
    description:
      'A short household reading rhythm for families who want Scripture to shape ordinary days.',
    format: 'Reading plan',
    highlights: ['family rhythm', 'short readings', 'conversation prompts'],
    relatedArticleSlugs: ['daily-rhythm-for-spiritual-growth'],
    relatedSeriesSlugs: [],
    slug: 'family-scripture-rhythm',
    status: 'published',
    title: 'Family Scripture rhythm',
    topic: 'Family',
    type: 'reading-plan',
    usefulness: 'Gives families a repeatable pattern without requiring long preparation.',
    steps: [
      'Pick a short passage that can be read aloud in a few minutes.',
      'Ask one simple question: what does this show about God?',
      'Close with one sentence of prayer from each person who wants to pray.',
    ],
  },
  {
    audience: 'Readers with hard questions',
    ctaLabel: 'Open resource',
    description:
      'A curated starting point for ethical questions where Scripture, wisdom, and pastoral care meet.',
    format: 'Curated link list',
    highlights: ['ethics', 'discernment', 'pastoral care'],
    relatedArticleSlugs: ['scripture-shapes-christian-growth'],
    relatedSeriesSlugs: [],
    slug: 'ethics-question-starter',
    status: 'published',
    title: 'Ethics question starter',
    topic: 'Ethics',
    type: 'article',
    usefulness: 'Helps readers frame moral questions carefully before looking for quick answers.',
    steps: [
      'Define the question as honestly and specifically as possible.',
      'Identify which biblical themes are directly involved.',
      'Bring unclear cases into prayerful conversation with mature believers.',
    ],
  },
  {
    audience: 'Mature believers',
    ctaLabel: 'Open recommendation',
    description:
      'A compact book path for readers who want to grow in prayer, doctrine, and daily obedience.',
    externalUrl: 'https://www.desiringgod.org/books',
    format: 'Book list',
    highlights: ['recommended books', 'spiritual growth', 'doctrine'],
    relatedArticleSlugs: [],
    relatedSeriesSlugs: ['foundations'],
    slug: 'spiritual-growth-book-list',
    status: 'published',
    title: 'Spiritual growth book list',
    topic: 'Personal growth',
    type: 'book',
    usefulness: 'Creates a next-step shelf for readers who need more than one article.',
    steps: [
      'Choose one book that matches your current question or season.',
      'Read slowly with a notebook, not as a completion task.',
      'Pair the book with related Scripture passages.',
    ],
  },
  {
    audience: 'Church leaders',
    ctaLabel: 'Open checklist',
    description:
      'A ministry checklist for evaluating whether a teaching plan serves formation, not only information.',
    format: 'Checklist',
    highlights: ['teaching planning', 'formation', 'leader review'],
    relatedArticleSlugs: [],
    relatedSeriesSlugs: [],
    slug: 'teaching-plan-checklist',
    status: 'published',
    title: 'Teaching plan checklist',
    topic: 'Pastoral theology',
    type: 'leader-tool',
    usefulness:
      'Gives leaders a simple grid for connecting doctrine, Scripture, prayer, and practice.',
    steps: [
      'Name the biblical text and the central truth clearly.',
      'Define the hoped-for response in belief, affection, and action.',
      'Remove material that is interesting but not necessary for the aim.',
    ],
  },
  {
    audience: 'Readers in prayer',
    ctaLabel: 'Open study guide',
    description:
      'A quiet guide for using the Psalms when words are hard and prayer feels scattered.',
    format: 'Devotional guide',
    highlights: ['Psalms', 'prayer', 'lament and praise'],
    relatedArticleSlugs: ['daily-rhythm-for-spiritual-growth'],
    relatedSeriesSlugs: [],
    slug: 'praying-with-the-psalms',
    status: 'published',
    title: 'Praying with the Psalms',
    topic: 'Prayer',
    type: 'study-guide',
    usefulness:
      'Shows readers how Scripture can give language to grief, repentance, trust, and praise.',
    steps: [
      'Choose a psalm that matches the honest state of your heart.',
      'Pray one line at a time, turning the words toward God.',
      'End by naming one truth about God that the psalm gives you.',
    ],
  },
]

function normalizeResource(doc: any): ResourceItem {
  const file = doc.file
  const fileHref =
    typeof file === 'object' && file && 'url' in file && file.url ? String(file.url) : null
  const audienceFromRelation = Array.isArray(doc.audiences)
    ? doc.audiences.map(relationTitle).filter(Boolean).join(' / ')
    : ''
  const topicFromRelation = Array.isArray(doc.topics)
    ? doc.topics.map(relationTitle).filter(Boolean).join(' / ')
    : ''

  return {
    description: String(doc.description ?? ''),
    audience: audienceFromRelation || (doc.audience ? String(doc.audience) : undefined),
    ctaLabel: doc.ctaLabel ? String(doc.ctaLabel) : undefined,
    externalUrl: doc.externalUrl ? String(doc.externalUrl) : null,
    fileHref,
    featured: Boolean(doc.featured),
    format: doc.format ? String(doc.format) : undefined,
    highlights: Array.isArray(doc.highlights) ? doc.highlights.map(String) : [],
    relatedArticleSlugs: Array.isArray(doc.relatedArticleSlugs)
      ? doc.relatedArticleSlugs.map(String)
      : [],
    relatedSeriesSlugs: Array.isArray(doc.relatedSeriesSlugs)
      ? doc.relatedSeriesSlugs.map(String)
      : [],
    slug: String(doc.slug ?? ''),
    status: doc.status === 'published' ? 'published' : 'draft',
    steps: Array.isArray(doc.steps) ? doc.steps.map(String) : [],
    title: String(doc.title ?? ''),
    topic: topicFromRelation || (doc.topic ? String(doc.topic) : undefined),
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
