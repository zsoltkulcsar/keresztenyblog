import { buildArticleUrl } from '@/lib/article-detail'

export type SearchResultType = 'article' | 'author' | 'dailyVerse' | 'resource' | 'series'

export type SearchResult = {
  excerpt: string
  href: string
  score: number
  tags: string[]
  title: string
  type: SearchResultType
}

export type SearchQueryInput = {
  q?: string
}

export type SearchState = {
  hasQuery: boolean
  query: string
  results: SearchResult[]
  totalResults: number
}

type SearchRecord = {
  excerpt: string
  href: string
  keywords: string[]
  tags: string[]
  title: string
  type: SearchResultType
}

const searchCorpus: SearchRecord[] = [
  {
    excerpt: 'How shepherding, doctrine, and presence shape healthy church life.',
    href: buildArticleUrl('scripture-shapes-christian-growth'),
    keywords: [
      'scripture',
      'growth',
      'pastoral theology',
      'church life',
      'discipleship',
      'teaching',
      'shepherding',
    ],
    tags: ['Pastoral Theology', 'Scripture', 'Discipleship'],
    title: 'Why Scripture must shape every part of Christian growth',
    type: 'article',
  },
  {
    excerpt: 'A grounded pattern for prayer, Scripture, and habits that last.',
    href: buildArticleUrl('daily-rhythm-for-spiritual-growth'),
    keywords: ['prayer', 'habits', 'scripture', 'growth', 'rhythm'],
    tags: ['Christian Life', 'Prayer', 'Habits'],
    title: 'A daily rhythm for spiritual growth',
    type: 'article',
  },
  {
    excerpt: 'What covenant love looks like when the week is busy and the heart is tired.',
    href: buildArticleUrl('marriage-family-and-patient-love'),
    keywords: ['marriage', 'family', 'covenant', 'love', 'home'],
    tags: ['Marriage', 'Family'],
    title: 'Marriage, family, and patient love',
    type: 'article',
  },
  {
    excerpt: 'Topic-based learning paths for new and mature believers.',
    href: '/series',
    keywords: ['series', 'foundations', 'new believer', 'mature believer', 'study'],
    tags: ['Series', 'Discipleship'],
    title: 'Foundations',
    type: 'series',
  },
  {
    excerpt: 'Guided routes for new believers, growing believers, and leaders.',
    href: '/series?series=home-and-covenant',
    keywords: ['series', 'home', 'covenant', 'family', 'leaders'],
    tags: ['Series', 'Family'],
    title: 'Home and Covenant',
    type: 'series',
  },
  {
    excerpt: 'Recommended books, studies, and tools for reading and teaching well.',
    href: '/resources',
    keywords: ['resources', 'books', 'study aids', 'teaching tools', 'reading'],
    tags: ['Resources', 'Study'],
    title: 'Practical study aids',
    type: 'resource',
  },
  {
    excerpt: 'Short devotional readings anchored in Scripture and daily life.',
    href: '/napi-ige',
    keywords: ['daily verse', 'scripture', 'devotional', 'daily life'],
    tags: ['Daily Verse', 'Scripture'],
    title: 'A verse for the day',
    type: 'dailyVerse',
  },
  {
    excerpt: 'A simple way to stay connected when new teaching and series publish.',
    href: '/search',
    keywords: ['newsletter', 'updates', 'teaching', 'publish'],
    tags: ['Newsletter'],
    title: 'Stay informed with new writing',
    type: 'resource',
  },
  {
    excerpt: 'The publication is shaped around Scripture, spiritual guidance, and daily Christian life.',
    href: '/articles?author=editorial-team',
    keywords: ['about', 'mission', 'doctrine', 'faith', 'guidance'],
    tags: ['Author', 'Trust'],
    title: 'Editorial Team',
    type: 'author',
  },
  {
    excerpt: 'Teaching, Scripture, and pastoral care shaped for ordinary churches.',
    href: '/articles?author=guest-contributor',
    keywords: ['author', 'guest contributor', 'testimony', 'family'],
    tags: ['Author', 'Guest Contributor'],
    title: 'Guest Contributor',
    type: 'author',
  },
  {
    excerpt: 'Practical pastoral reflection for church leadership and discipleship.',
    href: '/articles?author=pastoral-desk',
    keywords: ['author', 'pastoral desk', 'leadership', 'church'],
    tags: ['Author', 'Pastoral Desk'],
    title: 'Pastoral Desk',
    type: 'author',
  },
  {
    excerpt: 'Helpful articles, series, and resources for learning and growth.',
    href: '/articles',
    keywords: ['articles', 'search', 'publication', 'archive'],
    tags: ['Archive'],
    title: 'Browse the archive',
    type: 'resource',
  },
]

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function tokenize(query: string) {
  return query
    .split(/\s+/)
    .map((token) => normalize(token))
    .filter(Boolean)
}

function scoreRecord(record: SearchRecord, tokens: string[]) {
  const haystack = normalize([record.title, record.excerpt, ...record.keywords, ...record.tags].join(' '))

  let score = 0

  for (const token of tokens) {
    if (!token) continue

    if (record.title.toLowerCase() === token) {
      score += 80
      continue
    }

    if (record.title.toLowerCase().startsWith(token)) {
      score += 45
      continue
    }

    if (haystack.includes(token)) {
      score += record.title.toLowerCase().includes(token) ? 20 : 8
    } else {
      score -= 5
    }
  }

  return score
}

export function createEditorialSearch(input: SearchQueryInput = {}): SearchState {
  const query = (input.q ?? '').trim()
  const hasQuery = query.length > 0

  if (!hasQuery) {
    return {
      hasQuery: false,
      query: '',
      results: [],
      totalResults: 0,
    }
  }

  const tokens = tokenize(query)

  const results = searchCorpus
    .map((record) => ({
      ...record,
      score: scoreRecord(record, tokens),
    }))
    .filter((record) => record.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score
      return left.title.localeCompare(right.title)
    })

  return {
    hasQuery: true,
    query,
    results,
    totalResults: results.length,
  }
}

export function buildSearchUrl(query: string) {
  const normalized = query.trim()
  return normalized ? `/search?q=${encodeURIComponent(normalized)}` : '/search'
}

