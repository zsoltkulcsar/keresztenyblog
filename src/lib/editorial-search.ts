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
    excerpt: 'Hogyan formálja a pásztorlás, a tanítás és a jelenlét az egészséges gyülekezeti életet.',
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
    tags: ['Pásztori teológia', 'Szentírás', 'Tanítványság'],
    title: 'Miért kell a Szentírásnak formálnia a keresztény növekedés minden részét',
    type: 'article',
  },
  {
    excerpt: 'Józan minta az imádsághoz, a Szentíráshoz és a megmaradó szokásokhoz.',
    href: buildArticleUrl('daily-rhythm-for-spiritual-growth'),
    keywords: ['prayer', 'habits', 'scripture', 'growth', 'rhythm'],
    tags: ['Keresztény élet', 'Imádság', 'Szokások'],
    title: 'Napi ritmus a lelki növekedéshez',
    type: 'article',
  },
  {
    excerpt: 'Milyen a szövetségi szeretet, amikor zsúfolt a hét és fáradt a szív.',
    href: buildArticleUrl('marriage-family-and-patient-love'),
    keywords: ['marriage', 'family', 'covenant', 'love', 'home'],
    tags: ['Házasság', 'Család'],
    title: 'Házasság, család és türelmes szeretet',
    type: 'article',
  },
  {
    excerpt: 'Témaalapú tanulási utak új és érett hívőknek.',
    href: '/series',
    keywords: ['series', 'foundations', 'new believer', 'mature believer', 'study'],
    tags: ['Sorozatok', 'Tanítványság'],
    title: 'Alapok',
    type: 'series',
  },
  {
    excerpt: 'Vezetett utak új hívőknek, növekedő hívőknek és vezetőknek.',
    href: '/series?series=home-and-covenant',
    keywords: ['series', 'home', 'covenant', 'family', 'leaders'],
    tags: ['Sorozatok', 'Család'],
    title: 'Otthon és szövetség',
    type: 'series',
  },
  {
    excerpt: 'Ajánlott könyvek, tanulmányok és eszközök a jó olvasáshoz és tanításhoz.',
    href: '/resources',
    keywords: ['resources', 'books', 'study aids', 'teaching tools', 'reading'],
    tags: ['Források', 'Tanulmányozás'],
    title: 'Gyakorlati tanulmányi segédanyagok',
    type: 'resource',
  },
  {
    excerpt: 'Rövid áhítatos olvasmányok, amelyek a Szentírásban és a mindennapi életben gyökereznek.',
    href: '/napi-ige',
    keywords: ['daily verse', 'scripture', 'devotional', 'daily life'],
    tags: ['Napi ige', 'Szentírás'],
    title: 'Ige a mai napra',
    type: 'dailyVerse',
  },
  {
    excerpt: 'Egyszerű módja annak, hogy kapcsolódva maradj, amikor új tanítások és sorozatok jelennek meg.',
    href: '/search',
    keywords: ['newsletter', 'updates', 'teaching', 'publish'],
    tags: ['Hírlevél'],
    title: 'Értesülj az új írásokról',
    type: 'resource',
  },
  {
    excerpt:
      'A kiadványt a Szentírás, a lelki vezetés és a mindennapi keresztény élet formálja.',
    href: '/articles?author=editorial-team',
    keywords: ['about', 'mission', 'doctrine', 'faith', 'guidance'],
    tags: ['Szerző', 'Bizalom'],
    title: 'Szerkesztőség',
    type: 'author',
  },
  {
    excerpt: 'Tanítás, Szentírás és pásztori gondoskodás hétköznapi gyülekezetekre szabva.',
    href: '/articles?author=guest-contributor',
    keywords: ['author', 'guest contributor', 'testimony', 'family'],
    tags: ['Szerző', 'Vendégszerző'],
    title: 'Vendégszerző',
    type: 'author',
  },
  {
    excerpt: 'Gyakorlati pásztori elmélkedés gyülekezeti vezetéshez és tanítványsághoz.',
    href: '/articles?author=pastoral-desk',
    keywords: ['author', 'pastoral desk', 'leadership', 'church'],
    tags: ['Szerző', 'Pásztori rovat'],
    title: 'Pásztori rovat',
    type: 'author',
  },
  {
    excerpt: 'Hasznos cikkek, sorozatok és források tanuláshoz és növekedéshez.',
    href: '/articles',
    keywords: ['articles', 'search', 'publication', 'archive'],
    tags: ['Archívum'],
    title: 'Archívum böngészése',
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
  const haystack = normalize(
    [record.title, record.excerpt, ...record.keywords, ...record.tags].join(' '),
  )

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
