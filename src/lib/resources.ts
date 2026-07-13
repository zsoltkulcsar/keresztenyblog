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
    audience: 'Új hívők',
    ctaLabel: 'Tanulmányi útmutató megnyitása',
    description:
      'Vezetett belépési pont azoknak az olvasóknak, akik a keresztény növekedés teljes ívét szeretnék megérteni a Szentíráson keresztül.',
    externalUrl: null,
    featured: true,
    format: 'Vezetett tanulmány',
    highlights: ['igei megfigyelés', 'elmélkedési kérdések', 'heti ritmus'],
    relatedArticleSlugs: ['scripture-shapes-christian-growth'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'bible-study-aids',
    status: 'published',
    title: 'Bibliatanulmányozási segédanyagok',
    topic: 'Bibliaolvasás',
    type: 'study-guide',
    usefulness: 'Segít az olvasóknak lelassulni, megfigyelni a szöveget, és az igeszakaszt középpontban tartani.',
    steps: [
      'Olvasd el kétszer az igeszakaszt, mielőtt jegyzeteket vagy kommentárokat nyitnál meg.',
      'Írj le egy megfigyelést, egy kérdést és egy imádságos választ.',
      'Térj vissza a kapcsolódó cikkhez vagy sorozathoz, amikor egy téma mélyebb tanulmányozást igényel.',
    ],
  },
  {
    audience: 'Új és növekedő hívők',
    ctaLabel: 'Sorozat útvonalának megtekintése',
    description:
      'Fókuszált olvasási út új és növekedő hívőknek, akik szétszórt linkek helyett rendezett szerkezetet keresnek.',
    externalUrl: null,
    format: 'Sorozatkísérő',
    highlights: ['rendezett olvasás', 'tanbeli alapok', 'beszélgetésre kész'],
    relatedArticleSlugs: ['daily-rhythm-for-spiritual-growth'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'foundations-series-guide',
    status: 'published',
    title: 'Alapok sorozat útmutató',
    topic: 'Tanítványság',
    type: 'series',
    usefulness: 'Egyetlen tanulási és áttekintési úttá rendezi a cikkeket.',
    steps: [
      'Kezdd az Alapok sorozat első cikkével.',
      'Minden olvasás után használd az összefoglaló kérdéseket.',
      'A nehezebb részeket ismételd át mentorral, csoporttal vagy pásztorral.',
    ],
  },
  {
    audience: 'Napi olvasók',
    ctaLabel: 'Archívum megnyitása',
    description: 'Rövid napi igeolvasások archívummal és stabil linkekkel.',
    externalUrl: null,
    format: 'Archívum link',
    highlights: ['napi ritmus', 'megosztható hivatkozások', 'rövid olvasmányok'],
    relatedArticleSlugs: [],
    relatedSeriesSlugs: [],
    slug: 'daily-verse-archive',
    status: 'published',
    title: 'Napi ige archívum',
    topic: 'Áhítati ritmus',
    type: 'link',
    usefulness: 'A napi olvasást könnyen visszakereshetővé és megoszthatóvá teszi.',
    steps: [
      'Válassz egy olvasmányt reggelre vagy estére.',
      'Olvasd el az igét a környező bekezdésével együtt.',
      'Mentsd el a linket, ha segít egy beszélgetésben vagy imaidőben.',
    ],
  },
  {
    audience: 'Személyes tanulmányozás',
    ctaLabel: 'Fájl megnyitása',
    description: 'Letölthető olvasási segédlet igeszakaszok, jegyzetek és kérdések követéséhez.',
    fileHref: '/home-hero.png',
    format: 'Nyomtatható fájl',
    highlights: ['nyomtatható', 'jegyzetek', 'kérdések'],
    relatedArticleSlugs: ['how-to-read-the-bible-when-stuck'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'printable-reading-plan',
    status: 'published',
    title: 'Nyomtatható olvasási terv',
    topic: 'Bibliaolvasás',
    type: 'file',
    usefulness: 'Hasznos nyomtatott tanulmányozáshoz és lassabb személyes áttekintéshez.',
    steps: [
      'Nyomtass ki hetente egy oldalt, vagy tartsd a fájlt a Bibliád mellett.',
      'Használd a kérdéseknek szánt helyet, mielőtt másodlagos forrásokat olvasnál.',
      'A hét végén tekintsd át a jegyzeteidet.',
    ],
  },
  {
    audience: 'Kiscsoportvezetők',
    ctaLabel: 'Vezetői eszköz megnyitása',
    description:
      'Gyakorlati vázlat bibliai beszélgetés előkészítéséhez anélkül, hogy előadássá válna.',
    format: 'Vezetői munkalap',
    highlights: ['csoportkérdések', 'szövegközpontú menet', 'pásztori alkalmazás'],
    relatedArticleSlugs: ['how-to-read-the-bible-when-stuck'],
    relatedSeriesSlugs: ['foundations'],
    slug: 'small-group-discussion-guide',
    status: 'published',
    title: 'Kiscsoportos beszélgetési útmutató',
    topic: 'Vezetés',
    type: 'leader-tool',
    usefulness:
      'Segít a vezetőknek jobb kérdéseket feltenni, és a csoportot a bibliai szövegben megtartani.',
    steps: [
      'Jelöld ki az igeszakasz fő gondolatmenetét, mielőtt kérdéseket írnál.',
      'Készíts egy megfigyelő, egy értelmező és egy alkalmazó kérdést.',
      'Hagyj helyet imádságnak és konkrét engedelmességnek.',
    ],
  },
  {
    audience: 'Házaspárok és családok',
    ctaLabel: 'Olvasási terv megnyitása',
    description:
      'Rövid otthoni olvasási ritmus családoknak, akik szeretnék, hogy az Ige formálja a hétköznapokat.',
    format: 'Olvasási terv',
    highlights: ['családi ritmus', 'rövid olvasmányok', 'beszélgetésindítók'],
    relatedArticleSlugs: ['daily-rhythm-for-spiritual-growth'],
    relatedSeriesSlugs: [],
    slug: 'family-scripture-rhythm',
    status: 'published',
    title: 'Családi igeritmus',
    topic: 'Család',
    type: 'reading-plan',
    usefulness: 'Ismételhető mintát ad a családoknak hosszú előkészület nélkül.',
    steps: [
      'Válassz egy rövid igeszakaszt, amely néhány perc alatt felolvasható.',
      'Tegyél fel egy egyszerű kérdést: mit mutat ez Istenről?',
      'Zárjátok egy-egy mondatos imádsággal azok részéről, akik szeretnének imádkozni.',
    ],
  },
  {
    audience: 'Nehéz kérdésekkel küzdő olvasók',
    ctaLabel: 'Forrás megnyitása',
    description:
      'Válogatott kiindulópont etikai kérdésekhez, ahol a Szentírás, a bölcsesség és a pásztori gondoskodás találkozik.',
    format: 'Válogatott linklista',
    highlights: ['etika', 'megkülönböztetés', 'pásztori gondoskodás'],
    relatedArticleSlugs: ['scripture-shapes-christian-growth'],
    relatedSeriesSlugs: [],
    slug: 'ethics-question-starter',
    status: 'published',
    title: 'Etikai kérdésindító',
    topic: 'Etika',
    type: 'article',
    usefulness: 'Segít az olvasóknak gondosan megfogalmazni az erkölcsi kérdéseket, mielőtt gyors válaszokat keresnének.',
    steps: [
      'Fogalmazd meg a kérdést a lehető legőszintébben és legpontosabban.',
      'Azonosítsd, mely bibliai témák kapcsolódnak hozzá közvetlenül.',
      'A nem egyértelmű eseteket vidd imádságos beszélgetésbe érett hívőkkel.',
    ],
  },
  {
    audience: 'Érett hívők',
    ctaLabel: 'Ajánlás megnyitása',
    description:
      'Tömör könyvút azoknak az olvasóknak, akik imádságban, tanításban és mindennapi engedelmességben szeretnének növekedni.',
    externalUrl: 'https://www.desiringgod.org/books',
    format: 'Könyvlista',
    highlights: ['ajánlott könyvek', 'lelki növekedés', 'tanítás'],
    relatedArticleSlugs: [],
    relatedSeriesSlugs: ['foundations'],
    slug: 'spiritual-growth-book-list',
    status: 'published',
    title: 'Lelki növekedési könyvlista',
    topic: 'Személyes növekedés',
    type: 'book',
    usefulness: 'Következő lépésként használható polcot ad azoknak, akiknek egy cikknél többre van szükségük.',
    steps: [
      'Válassz egy könyvet, amely illik a mostani kérdésedhez vagy életszakaszodhoz.',
      'Olvass lassan, jegyzetfüzettel, ne puszta teljesítendő feladatként.',
      'Kapcsold a könyvet hozzáillő igeszakaszokhoz.',
    ],
  },
  {
    audience: 'Gyülekezeti vezetők',
    ctaLabel: 'Ellenőrzőlista megnyitása',
    description:
      'Szolgálati ellenőrzőlista annak mérésére, hogy a tanítási terv formálást szolgál-e, nem csupán információátadást.',
    format: 'Ellenőrzőlista',
    highlights: ['tanítás tervezése', 'formálódás', 'vezetői áttekintés'],
    relatedArticleSlugs: [],
    relatedSeriesSlugs: [],
    slug: 'teaching-plan-checklist',
    status: 'published',
    title: 'Tanítási terv ellenőrzőlista',
    topic: 'Pásztori teológia',
    type: 'leader-tool',
    usefulness:
      'Egyszerű keretet ad a vezetőknek a tanítás, a Szentírás, az imádság és a gyakorlat összekapcsolásához.',
    steps: [
      'Nevezd meg világosan a bibliai szöveget és a központi igazságot.',
      'Határozd meg a remélt választ hitben, szeretetben és cselekvésben.',
      'Vedd ki azt az anyagot, amely érdekes, de nem szükséges a célhoz.',
    ],
  },
  {
    audience: 'Imádságban lévő olvasók',
    ctaLabel: 'Tanulmányi útmutató megnyitása',
    description:
      'Csendes útmutató a Zsoltárok használatához, amikor nehezek a szavak és szétszórtnak tűnik az imádság.',
    format: 'Áhítati útmutató',
    highlights: ['Zsoltárok', 'imádság', 'panasz és dicséret'],
    relatedArticleSlugs: ['daily-rhythm-for-spiritual-growth'],
    relatedSeriesSlugs: [],
    slug: 'praying-with-the-psalms',
    status: 'published',
    title: 'Imádkozás a Zsoltárokkal',
    topic: 'Imádság',
    type: 'study-guide',
    usefulness:
      'Megmutatja, hogyan adhat a Szentírás nyelvet a gyásznak, bűnbánatnak, bizalomnak és dicséretnek.',
    steps: [
      'Válassz egy zsoltárt, amely illik a szíved őszinte állapotához.',
      'Imádkozz egy sort egyszerre, a szavakat Isten felé fordítva.',
      'Zárd azzal, hogy megnevezel egy igazságot Istenről, amelyet a zsoltár ad neked.',
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
      where: {
        status: {
          equals: 'published',
        },
      },
    })

    if (result?.docs?.length) {
      const mergedResources = new Map<string, ResourceItem>()

      for (const resource of fallbackResources) {
        mergedResources.set(resource.slug, resource)
      }

      for (const resource of result.docs
        .map(normalizeResource)
        .filter((item: ResourceItem) => item.status === 'published')) {
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
