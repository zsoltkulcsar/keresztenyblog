export type BookRecommendation = {
  audience: 'new-believer' | 'growing-believer' | 'leader' | 'mature-believer'
  author: string
  comments: Array<{
    body: string
    name: string
    response?: string
  }>
  coverTone: 'blue' | 'green' | 'indigo' | 'rose' | 'slate' | 'teal'
  description: string
  format: 'book' | 'reading-list' | 'study-companion'
  highlights: string[]
  level: 'beginner' | 'intermediate' | 'advanced'
  recommendation: string
  readingPlan: string[]
  slug: string
  status: 'published'
  title: string
  topic: 'bible-study' | 'christian-life' | 'doctrine' | 'family' | 'leadership' | 'prayer'
  whyRead: string
}

export const bookTopicLabels: Record<BookRecommendation['topic'], string> = {
  'bible-study': 'Bibliatanulmányozás',
  'christian-life': 'Keresztény élet',
  doctrine: 'Tanítás',
  family: 'Család',
  leadership: 'Vezetés',
  prayer: 'Imádság',
}

export const bookAudienceLabels: Record<BookRecommendation['audience'], string> = {
  'growing-believer': 'Növekedő hívő',
  leader: 'Vezető',
  'mature-believer': 'Érett hívő',
  'new-believer': 'Új hívő',
}

export const bookLevelLabels: Record<BookRecommendation['level'], string> = {
  advanced: 'Haladó',
  beginner: 'Kezdő',
  intermediate: 'Középhaladó',
}

const books: BookRecommendation[] = [
  {
    audience: 'new-believer',
    author: 'Szerkesztőségi ajánlás',
    comments: [
      {
        body: 'Segít lelassulni, és megtanulni jobb kérdéseket feltenni az igeszakaszhoz.',
        name: 'Anna',
        response:
          'Pont ezért ajánljuk nyitott Biblia mellett használni, nem rövidítésként.',
      },
    ],
    description:
      'Kezdő ajánlás azoknak az olvasóknak, akik szeretnék megtanulni figyelmesen olvasni a Szentírást.',
    coverTone: 'blue',
    format: 'study-companion',
    highlights: ['igei megfigyelés', 'világos szerkezet', 'kezdőbarát'],
    level: 'beginner',
    recommendation:
      'Használd, amikor az olvasónak segítség kell a megfigyelés, értelmezés és imádságos válasz alapvető szokásaihoz.',
    readingPlan: [
      'Olvass el lassan egy fejezetet, mielőtt kinyitnád a könyvet.',
      'Írd le a fő kérdést, amelyet az igeszakasz felvet.',
      'Használd az ajánlást tisztázásra, majd térj vissza a bibliai szöveghez.',
    ],
    slug: 'reading-scripture-slowly',
    status: 'published',
    title: 'A Szentírás lassú olvasása',
    topic: 'bible-study',
    whyRead:
      'Segít az új és növekedő hívőknek abbahagyni a szöveg elsietését, és figyelemmel kezdeni olvasni.',
  },
  {
    audience: 'growing-believer',
    author: 'Szerkesztőségi ajánlás',
    comments: [
      {
        body: 'Kiscsoportban használnám, mert a hétköznapi szokásokat beszélgetéssé alakítja.',
        name: 'Mark',
      },
    ],
    description:
      'Gyakorlati ajánlás hétköznapi hűséghez, imádsághoz, szokásokhoz és engedelmességhez.',
    coverTone: 'green',
    format: 'book',
    highlights: ['napi ritmus', 'lelki szokások', 'gyakorlati engedelmesség'],
    level: 'intermediate',
    recommendation:
      'Leginkább azoknak az olvasóknak való, akik már ismerik az alapokat, de stabil keretre van szükségük a mindennapi keresztény élethez.',
    readingPlan: [
      'Olvass el hetente egy részt.',
      'Válassz egy szokást gyakorlásra, mielőtt továbbmennél.',
      'Beszéld át a kérdéseket mentorral, házastárssal vagy csoporttal.',
    ],
    slug: 'ordinary-faithfulness',
    status: 'published',
    title: 'Hétköznapi hűség',
    topic: 'christian-life',
    whyRead: 'A tanítást ismétlődő döntésekhez köti, nem csak nagy lelki pillanatokhoz.',
  },
  {
    audience: 'mature-believer',
    author: 'Szerkesztőségi ajánlás',
    comments: [
      {
        body: 'Ez segített úgy látnom a tanítást, mint ami erősíti az imádatot és a türelmet.',
        name: 'David',
        response:
          'A tanítás és az imádat közötti kapcsolat az egyik fő oka annak, hogy itt a helye.',
      },
    ],
    description:
      'Mélyebb ajánlás azoknak az olvasóknak, akik szeretnék, hogy a tanítás formálja az imádatot és a kitartást.',
    coverTone: 'indigo',
    format: 'book',
    highlights: ['tanítás', 'imádat', 'lelki mélység'],
    level: 'advanced',
    recommendation:
      'Lassabb olvasásként használd, amikor nem a gyorsaság, hanem a teológiai mélység és lelki formálódás a cél.',
    readingPlan: [
      'Olvass jegyzetfüzettel, és jelöld a fontos teológiai állításokat.',
      'Kapcsolj minden fejezethez legalább egy igeszakaszt.',
      'Mielőtt továbbmennél, fordíts egy tanítást imádsággá.',
    ],
    slug: 'doctrine-that-forms-worship',
    status: 'published',
    title: 'Tanítás, amely imádatot formál',
    topic: 'doctrine',
    whyRead: 'Segít az érett olvasóknak összekapcsolni a teológiai világosságot az Isten iránti szeretettel.',
  },
  {
    audience: 'leader',
    author: 'Szerkesztőségi ajánlás',
    comments: [
      {
        body: 'Jó vezetőknek, akik tanítást készítenek, és nemcsak helyesen, hanem pásztori módon is kell gondolkodniuk.',
        name: 'Peter',
      },
    ],
    coverTone: 'slate',
    description: 'Ajánlás gyülekezeti vezetőknek, tanítóknak és azoknak, akik másokról gondoskodnak.',
    format: 'reading-list',
    highlights: ['pásztori gondoskodás', 'tanítás', 'gyülekezeti vezetés'],
    level: 'intermediate',
    recommendation:
      'Hasznos vezetőknek, akik azt szeretnék, hogy tanítási terveik embereket szolgáljanak, ne csak információt adjanak át.',
    readingPlan: [
      'Olvass egy közelgő tanítást vagy beszélgetést szem előtt tartva.',
      'Írd le, mire van lelkileg szüksége az olvasónak vagy hallgatónak.',
      'Olvasás után tekintsd át a kapcsolódó Kovász vezetői cikkeket.',
    ],
    slug: 'pastoral-teaching-and-care',
    status: 'published',
    title: 'Pásztori tanítás és gondoskodás',
    topic: 'leadership',
    whyRead: 'Arra tanítja a vezetőket, hogy megkérdezzék: hogyan pásztoroljon az igazság valódi embereket.',
  },
  {
    audience: 'growing-believer',
    author: 'Szerkesztőségi ajánlás',
    comments: [],
    coverTone: 'rose',
    description: 'Családközpontú ajánlás otthoni tanítványsághoz és türelmes szeretethez.',
    format: 'book',
    highlights: ['otthoni élet', 'házasság', 'családi tanítványság'],
    level: 'beginner',
    recommendation:
      'Leginkább pároknak, szülőknek és családoknak való, akik egyszerű, ismételhető otthoni olvasási ritmust szeretnének.',
    readingPlan: [
      'Rövid részeket olvassatok együtt, ne a gyors befejezés legyen a cél.',
      'Válasszatok egy gyakorlatot a következő hétre.',
      'Használjátok a beszélgetési kérdéseket étkezésnél vagy esti imádságkor.',
    ],
    slug: 'faithful-home-life',
    status: 'published',
    title: 'Hűséges otthoni élet',
    topic: 'family',
    whyRead: 'A családi tanítványságot elvont gondolat helyett konkréttá teszi.',
  },
  {
    audience: 'new-believer',
    author: 'Szerkesztőségi ajánlás',
    comments: [],
    coverTone: 'teal',
    description: 'Imádságról szóló ajánlás azoknak, akik nehezen tudják, mit mondjanak Istennek.',
    format: 'study-companion',
    highlights: ['imádság', 'Zsoltárok', 'áhítati ritmus'],
    level: 'beginner',
    recommendation:
      'Használd a Zsoltárok mellett, amikor az imádság szétszórtnak, száraznak vagy nehezen kezdhetőnek tűnik.',
    readingPlan: [
      'Olvass el egy zsoltárt, mielőtt az ajánlást olvasnád.',
      'Imádkozz el egy mondatot a zsoltárból a saját szavaiddal.',
      'Írj le egy igazságot Istenről, amelyet magaddal viszel a napba.',
    ],
    slug: 'learning-to-pray-with-scripture',
    status: 'published',
    title: 'Imádkozni tanulni a Szentírással',
    topic: 'prayer',
    whyRead: 'Nyelvet ad az őszinte imádsághoz anélkül, hogy eltávolítana a Szentírástól.',
  },
]

export function listBooks() {
  return books
}

export function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug) ?? null
}

export function listBookTopics() {
  return [...new Set(books.map((book) => book.topic))]
}

export function listBookAudiences() {
  return [...new Set(books.map((book) => book.audience))]
}

export function listBookLevels() {
  return [...new Set(books.map((book) => book.level))]
}

export function buildBookUrl(slug: string) {
  return `/books/${slug}`
}
