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
    note: 'Scripture gives attention a direction before the day begins.',
    reference: 'Psalm 5:3',
    slug: '2026-06-16',
    status: 'published',
    text: 'O LORD, in the morning you hear my voice; in the morning I prepare a sacrifice for you and watch.',
  },
  {
    date: '2026-06-15',
    note: 'Grace is often visible in endurance before it is visible in results.',
    reference: 'Galatians 6:9',
    slug: '2026-06-15',
    status: 'published',
    text: 'And let us not grow weary of doing good, for in due season we will reap, if we do not give up.',
  },
  {
    date: '2026-06-14',
    note: 'God uses the Word to steady ordinary faithfulness.',
    reference: '2 Timothy 3:16-17',
    slug: '2026-06-14',
    status: 'published',
    text: 'All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.',
  },
  {
    date: '2026-06-13',
    note: 'Humble dependence belongs to daily work and daily prayer alike.',
    reference: 'Micah 6:8',
    slug: '2026-06-13',
    status: 'published',
    text: 'He has told you, O man, what is good; and what does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God?',
  },
  {
    date: '2026-06-12',
    note: 'The word of Christ should continue to dwell richly in the ordinary rhythm of the day.',
    reference: 'Colossians 3:16',
    slug: '2026-06-12',
    status: 'published',
    text: 'Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom.',
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

