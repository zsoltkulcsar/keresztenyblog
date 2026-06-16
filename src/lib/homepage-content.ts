export type HomepageArticle = {
  category: string
  excerpt: string
  slug: string
  title: string
  time: string
}

export type HomepageModuleKey = 'dailyVerse' | 'newsletter' | 'resources' | 'series'

export type HomepageModule = {
  body: string
  eyebrow: string
  href: string
  key: HomepageModuleKey
  title: string
}

export type HomepageContent = {
  leadStory: HomepageArticle
  latestArticles: HomepageArticle[]
  modules: HomepageModule[]
}

type HomepageContentInput = {
  leadStory?: HomepageArticle | null
  latestArticles?: HomepageArticle[]
  modules?: Partial<Record<HomepageModuleKey, HomepageModule | null>>
}

const fallbackLatestArticles: HomepageArticle[] = [
  {
    category: 'Pastoral Theology',
    excerpt: 'How shepherding, doctrine, and presence shape a healthy local church.',
    slug: 'pastoral-theology-for-ordinary-churches',
    title: 'Pastoral theology for ordinary churches',
    time: '8 min read',
  },
  {
    category: 'Christian Life',
    excerpt: 'A grounded pattern for prayer, Scripture, and habits that last.',
    slug: 'daily-rhythm-for-spiritual-growth',
    title: 'A daily rhythm for spiritual growth',
    time: '6 min read',
  },
  {
    category: 'Marriage',
    excerpt: 'What covenant love looks like when the week is busy and the heart is tired.',
    slug: 'marriage-family-and-patient-love',
    title: 'Marriage, family, and patient love',
    time: '10 min read',
  },
  {
    category: 'Ethics',
    excerpt: 'When Christian conviction meets work, speech, and public life.',
    slug: 'ethics-in-everyday-decisions',
    title: 'Ethics in everyday decisions',
    time: '7 min read',
  },
]

const fallbackModuleMap: Record<HomepageModuleKey, HomepageModule> = {
  dailyVerse: {
    body: 'Short devotional readings anchored in Scripture and daily life.',
    eyebrow: 'Daily Verse',
    href: '#daily-verse',
    key: 'dailyVerse',
    title: 'A verse for the day',
  },
  newsletter: {
    body: 'A simple way to stay connected when new teaching and series publish.',
    eyebrow: 'Newsletter',
    href: '#newsletter',
    key: 'newsletter',
    title: 'Stay informed with new writing',
  },
  resources: {
    body: 'Recommended books, studies, and tools for reading and teaching well.',
    eyebrow: 'Resources',
    href: '#resources',
    key: 'resources',
    title: 'Practical study aids',
  },
  series: {
    body: 'Guided routes for new believers, growing believers, and leaders.',
    eyebrow: 'Series',
    href: '#series',
    key: 'series',
    title: 'Follow a topic with structure',
  },
}

function fallbackLeadStory(latestArticles: HomepageArticle[]): HomepageArticle {
  return latestArticles[0] ?? fallbackLatestArticles[0]
}

export function createHomepageContent(input: HomepageContentInput = {}): HomepageContent {
  const latestArticles = input.latestArticles?.length ? input.latestArticles : fallbackLatestArticles

  const leadStory = input.leadStory ?? fallbackLeadStory(latestArticles)

  const modules = ['series', 'dailyVerse', 'resources', 'newsletter'].map((key) => {
    const curated = input.modules?.[key as HomepageModuleKey]
    return curated ?? fallbackModuleMap[key as HomepageModuleKey]
  })

  return {
    leadStory,
    latestArticles,
    modules,
  }
}

export const homepageContent = createHomepageContent()
