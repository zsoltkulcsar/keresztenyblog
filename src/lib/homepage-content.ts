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
    category: 'Pásztori teológia',
    excerpt: 'Hogyan formálja a pásztorlás, a tanítás és a jelenlét az egészséges gyülekezetet.',
    slug: 'scripture-shapes-christian-growth',
    title: 'Pásztori teológia hétköznapi gyülekezeteknek',
    time: '8 perc olvasás',
  },
  {
    category: 'Keresztény élet',
    excerpt: 'Józan ritmus az imádsághoz, az Igéhez és a megmaradó szokásokhoz.',
    slug: 'daily-rhythm-for-spiritual-growth',
    title: 'Napi ritmus a lelki növekedéshez',
    time: '6 perc olvasás',
  },
  {
    category: 'Házasság',
    excerpt: 'Milyen a szövetségi szeretet, amikor zsúfolt a hét és fáradt a szív.',
    slug: 'marriage-family-and-patient-love',
    title: 'Házasság, család és türelmes szeretet',
    time: '10 perc olvasás',
  },
  {
    category: 'Etika',
    excerpt: 'Amikor a keresztény meggyőződés találkozik a munkával, a beszéddel és a közélettel.',
    slug: 'ethics-in-everyday-decisions',
    title: 'Etika a hétköznapi döntésekben',
    time: '7 perc olvasás',
  },
]

const fallbackModuleMap: Record<HomepageModuleKey, HomepageModule> = {
  dailyVerse: {
    body: 'Rövid áhítatos olvasmányok, amelyek az Igéhez és a mindennapi élethez kötődnek.',
    eyebrow: 'Napi ige',
    href: '#daily-verse',
    key: 'dailyVerse',
    title: 'Ige a mai napra',
  },
  newsletter: {
    body: 'Egyszerű módja annak, hogy értesülj az új tanításokról és sorozatokról.',
    eyebrow: 'Hírlevél',
    href: '#newsletter',
    key: 'newsletter',
    title: 'Értesülj az új írásokról',
  },
  resources: {
    body: 'Ajánlott könyvek, tanulmányok és eszközök a jobb olvasáshoz és tanításhoz.',
    eyebrow: 'Források',
    href: '#resources',
    key: 'resources',
    title: 'Gyakorlati tanulmányi segédanyagok',
  },
  series: {
    body: 'Vezetett utak új hívőknek, növekedő hívőknek és vezetőknek.',
    eyebrow: 'Sorozatok',
    href: '#series',
    key: 'series',
    title: 'Kövess egy témát rendezett úton',
  },
}

function fallbackLeadStory(latestArticles: HomepageArticle[]): HomepageArticle {
  return latestArticles[0] ?? fallbackLatestArticles[0]
}

export function createHomepageContent(input: HomepageContentInput = {}): HomepageContent {
  const latestArticles = input.latestArticles?.length
    ? input.latestArticles
    : fallbackLatestArticles

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
