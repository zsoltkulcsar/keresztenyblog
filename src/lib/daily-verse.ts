export type DailyVerseEntry = {
  date: string
  note: string
  reference: string
  slug: string
  status: 'draft' | 'published'
  text: string
}

const dailyVerseEntries: DailyVerseEntry[] = [
  {
    date: '2026-06-16',
    note: 'A Szentírás irányt ad a figyelemnek, mielőtt elkezdődik a nap.',
    reference: 'Zsoltárok 5:3',
    slug: '2026-06-16',
    status: 'published',
    text: 'Uram, reggel hallod hangomat; reggel eléd készülök, és várok.',
  },
  {
    date: '2026-06-15',
    note: 'A kegyelem gyakran előbb a kitartásban látható, mint az eredményekben.',
    reference: 'Galata 6:9',
    slug: '2026-06-15',
    status: 'published',
    text: 'A jó cselekvésében pedig ne fáradjunk el, mert a maga idejében aratunk majd, ha meg nem lankadunk.',
  },
  {
    date: '2026-06-14',
    note: 'Isten az Igét használja arra, hogy megszilárdítsa a hétköznapi hűséget.',
    reference: '2 Timóteus 3:16-17',
    slug: '2026-06-14',
    status: 'published',
    text: 'A teljes Írás Istentől ihletett, és hasznos a tanításra, feddésre, megjobbításra és az igazságban való nevelésre.',
  },
  {
    date: '2026-06-13',
    note: 'Az alázatos függés ugyanúgy hozzátartozik a napi munkához, mint a napi imádsághoz.',
    reference: 'Mikeás 6:8',
    slug: '2026-06-13',
    status: 'published',
    text: 'Megmondta neked, ember, hogy mi a jó, és mit kíván tőled az Úr: csak azt, hogy igazságot cselekedj, szeresd az irgalmasságot, és alázatosan járj Isteneddel.',
  },
  {
    date: '2026-06-12',
    note: 'Krisztus beszéde továbbra is gazdagon lakjon a nap hétköznapi ritmusában.',
    reference: 'Kolossé 3:16',
    slug: '2026-06-12',
    status: 'published',
    text: 'Krisztus beszéde lakjék bennetek gazdagon: tanítsátok és intsétek egymást teljes bölcsességgel.',
  },
]

export function listDailyVerseEntries() {
  return [...dailyVerseEntries].sort((left, right) => right.date.localeCompare(left.date))
}

export function createDailyVerseEntry(slug: string) {
  return dailyVerseEntries.find((entry) => entry.slug === slug) ?? null
}

export function buildDailyVerseUrl(slug: string) {
  return `/napi-ige/${slug}`
}
