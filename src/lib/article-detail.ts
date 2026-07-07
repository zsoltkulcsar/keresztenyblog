import { createArchiveContent } from '@/lib/article-archive'

export type ArticleSeriesContext = {
  description: string
  label: string
  slug: string
}

export type ArticleDetail = {
  author: string
  category: string
  coverAlt: string
  coverSrc: string
  excerpt: string
  publishedAt: string
  readingMinutes: number
  scriptureBlock: {
    reference: string
    text: string
  }
  sections: Array<{
    body: string[]
    heading: string
  }>
  series?: ArticleSeriesContext
  seriesOrder?: number
  slug: string
  subtitle: string
  studyPanel: {
    items: string[]
    title: string
  }
  tags: string[]
  title: string
  pullQuote: string
}

export type ArticleSeriesNavigation = {
  next?: ArticleDetail
  previous?: ArticleDetail
}

const hungarianSeedTopics = [
  ['Keresztyén élet', 'Mindennapi kegyelem', 'mindennapi-kegyelem', 'Zsoltárok 23:1', 'Az Úr az én pásztorom; nem szűkölködöm.', 'Amikor az ima előbb sóhaj, mint mondat', 'Ima'],
  ['Lelkipásztori teológia', 'Pásztori hűség', 'pasztori-huseg', '1 Péter 5:2', 'Legeltessétek az Isten közöttetek levő nyáját.', 'Miért nem elég a tehetség a szolgálathoz', 'Gyülekezet'],
  ['Házasság és család', 'Otthon és szövetség', 'otthon-es-szovetseg', 'Kolossé 3:13', 'Viseljétek el egymást, és bocsássatok meg egymásnak.', 'A türelem csendes munkája az otthonban', 'Család'],
  ['Etika', 'Isten előtt élni', 'isten-elott-elni', 'Mikeás 6:8', 'Mit kíván tőled az Úr? Csak azt, hogy igazságot cselekedj.', 'Mit jelent hűségesnek maradni a munkahelyen', 'Munka'],
  ['Bibliaolvasás', 'Alapok', 'alapok', '2 Timóteus 3:16', 'A teljes Írás Istentől ihletett.', 'Hogyan olvassunk lassabban és figyelmesebben', 'Szentírás'],
  ['Szenvedés és reménység', 'Remény a mélységben', 'remeny-a-melysegben', 'Róma 8:28', 'Akik Istent szeretik, azoknak minden javukra szolgál.', 'Isten büntetése-e a fájdalmam?', 'Szenvedés'],
  ['Imádság', 'Imádság iskolája', 'imadsag-iskolaja', 'János 15:7', 'Kérjetek, amit csak akartok, és megadatik nektek.', 'Miért hív Isten merész imádságra?', 'Imádság'],
  ['Kegyelem', 'Kegyelem mélységei', 'kegyelem-melysegei', 'Efézus 2:8', 'Kegyelemből van üdvösségetek hit által.', 'Miért szabadít fel a kegyelem az önigazolástól?', 'Kegyelem'],
  ['Bűn és megtérés', 'Rejtett szív', 'rejtett-sziv', '4 Mózes 32:23', 'Gondoljátok meg, hogy vétketek utolér benneteket.', 'A rejtett bűn nem marad következmények nélkül', 'Megtérés'],
  ['Hálaadás', 'Hálás élet', 'halas-elet', '1 Thesszalonika 5:18', 'Mindenért hálát adjatok.', 'Hogyan süllyeszti el a hálátlanság a szívet', 'Hála'],
  ['Tanítványság', 'Tanítványság útja', 'tanitvanysag-utja', 'Máté 28:20', 'Tanítva őket, hogy megtartsák mindazt, amit parancsoltam nektek.', 'Hét jel, hogy a tanítvány tovább növekszik', 'Tanítványság'],
  ['Világnézet', 'Hit és gondolkodás', 'hit-es-gondolkodas', '2 Korinthus 10:5', 'Foglyul ejtünk minden gondolatot a Krisztus iránti engedelmességre.', 'Miért nem ellensége a gondolkodás a hitnek?', 'Gondolkodás'],
] as const

const hungarianSeedDetails: ArticleDetail[] = Array.from({ length: 40 }, (_, index) => {
  const topic = hungarianSeedTopics[index % hungarianSeedTopics.length]
  const itemNumber = index + 1
  const day = Math.max(1, 28 - (index % 28))
  const slugBase = topic[5]
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return {
    author: ['Szerkesztőség', 'Lelkipásztori műhely', 'Vendégszerző'][index % 3],
    category: topic[0],
    coverAlt: `${topic[0]} témájú szerkesztőségi kép`,
    coverSrc: '/home-hero.png',
    excerpt: `Bibliai alapú bevezető írás: ${topic[5].toLowerCase()}.`,
    publishedAt: `2026-05-${String(day).padStart(2, '0')}`,
    readingMinutes: 5 + (index % 8),
    scriptureBlock: {
      reference: topic[3],
      text: topic[4],
    },
    sections: [
      {
        heading: 'A kérdés a Szentírás előtt',
        body: [
          'A keresztyén olvasó nem pusztán gyors választ keres, hanem olyan gondolkodást, amelyet a Biblia formál. Ezért az első kérdés mindig az, hogy mit mond Isten igéje, és hogyan tanít minket figyelmesebben látni.',
          'Az ilyen olvasás nem menekül a hétköznapok elől. Visszavezet a családba, a munkába, a gyülekezetbe és a csendes döntések helyére.',
        ],
      },
      {
        heading: 'Mit jelent ez a mindennapokban?',
        body: [
          'A hit növekedése gyakran nem látványos fordulatokból áll, hanem ismételt engedelmességből. Az ember megtanul imádkozni, bocsánatot kérni, türelmesebben beszélni, és újra Krisztushoz fordulni.',
          'A cél az, hogy a tanítás ne maradjon elvont. Az olvasó egy konkrét kérdéssel, egy imádsággal és egy következő lépéssel álljon fel.',
        ],
      },
      {
        heading: 'Továbbgondolás',
        body: [
          'Érdemes a megadott igeszakaszt lassan elolvasni, majd megfigyelni, milyen ígéretet, parancsot vagy figyelmeztetést hordoz.',
          'A lelki növekedéshez nem mindig több információ kell, hanem mélyebb figyelem arra, amit Isten már világosan kijelentett.',
        ],
      },
    ],
    series: {
      description: 'Magyar nyelvű mintasorozat a Kovasz tartalmi és vizuális teszteléséhez.',
      label: topic[1],
      slug: topic[2],
    },
    seriesOrder: Math.floor(index / hungarianSeedTopics.length) + 1,
    slug: `minta-cikk-${String(itemNumber).padStart(2, '0')}-${slugBase}`,
    subtitle: 'Eredeti magyar mintacikk a Kovasz felületének tartalmi és tipográfiai teszteléséhez.',
    studyPanel: {
      title: 'Tanulmányozási segítség',
      items: [
        `Olvasd el: ${topic[3]}`,
        'Írd le egy mondatban, mit tanít a szakasz Istenről.',
        'Fogalmazz meg egy gyakorlati lépést a következő napra.',
      ],
    },
    tags: [topic[6], topic[0]],
    title: topic[5],
    pullQuote: 'A bibliai tanítás akkor válik világossá, amikor a szöveg irányítja a kérdéseinket.',
  }
})

const articleDetails: ArticleDetail[] = [
  {
    author: 'Editorial Team',
    category: 'Pastoral Theology',
    coverAlt: 'Editorial cover for Scripture and Christian growth',
    coverSrc: '/home-hero.png',
    excerpt: 'How shepherding, doctrine, and presence shape healthy church life.',
    publishedAt: '2026-06-14',
    readingMinutes: 8,
    scriptureBlock: {
      reference: '2 Timothy 3:16-17',
      text:
        'All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.',
    },
    sections: [
      {
        heading: 'Scripture forms the frame',
        body: [
          'Christian growth starts with a textually grounded imagination. Scripture does not simply support the lesson; it defines what the lesson is.',
          'When the Bible sets the frame, doctrine, discipline, and daily life move together instead of competing for attention.',
        ],
      },
      {
        heading: 'Pastoral care stays close to the text',
        body: [
          'A pastor cannot carry the weight of spiritual formation by personality alone. Care is stronger when it is tethered to the Word and applied patiently to ordinary life.',
          'That is why a pastor needs both theological clarity and a habit of presence. One without the other becomes unbalanced.',
        ],
      },
      {
        heading: 'Growth is usually slower than we want',
        body: [
          'Most readers are not looking for novelty; they are looking for language that helps them keep going. Scripture, read carefully, gives that language back.',
          'The work is often repetitive and hidden, but hidden work is still real work.',
        ],
      },
    ],
    series: {
      description: 'A guided set of foundations for new and growing believers.',
      label: 'Foundations',
      slug: 'foundations',
    },
    seriesOrder: 1,
    slug: 'scripture-shapes-christian-growth',
    subtitle: 'A practical case for letting Scripture govern the whole shape of Christian formation.',
    studyPanel: {
      title: 'Study notes',
      items: [
        'Cross reference: Psalm 19:7-11',
        'Teaching note: doctrine should never drift away from application.',
        'Reflection: what changes when the Bible becomes the first authority you reach for?',
      ],
    },
    tags: ['Scripture', 'Discipleship'],
    title: 'Why Scripture must shape every part of Christian growth',
    pullQuote: 'Scripture does not decorate Christian growth; it determines it.',
  },
  {
    author: 'Editorial Team',
    category: 'Christian Life',
    coverAlt: 'Daily rhythm and spiritual habits editorial image',
    coverSrc: '/home-hero.png',
    excerpt: 'A grounded pattern for prayer, Scripture, and habits that last.',
    publishedAt: '2026-06-10',
    readingMinutes: 6,
    scriptureBlock: {
      reference: 'Psalm 1:1-3',
      text:
        'Blessed is the man who walks not in the counsel of the wicked, but his delight is in the law of the LORD, and on his law he meditates day and night.',
    },
    sections: [
      {
        heading: 'Daily habits need biblical gravity',
        body: [
          'A routine only becomes spiritual formation when it is shaped by what Scripture says God is doing in us.',
          'Prayer, reading, and reflection are not accessories to Christian life; they are part of how we remain attentive to God.',
        ],
      },
      {
        heading: 'Small rhythms can carry weight',
        body: [
          'The ordinary moments of the day often determine whether conviction remains abstract or becomes embodied practice.',
          'Readers rarely need a dramatic reset. They need a steady pattern they can repeat tomorrow.',
        ],
      },
    ],
    series: {
      description: 'Daily patterns for ordinary believers who want to keep walking faithfully.',
      label: 'Daily Rhythm',
      slug: 'daily-rhythm',
    },
    seriesOrder: 1,
    slug: 'daily-rhythm-for-spiritual-growth',
    subtitle: 'A daily rule of life grows from Scripture, not from self-improvement language.',
    studyPanel: {
      title: 'Study notes',
      items: [
        'Cross reference: John 15:4-5',
        'Teaching note: habits should serve communion with God, not replace it.',
        'Reflection: what one practice would make tomorrow more attentive to Scripture?',
      ],
    },
    tags: ['Prayer', 'Habits'],
    title: 'A daily rhythm for spiritual growth',
    pullQuote: 'A rule of life is only helpful when it points you back to God.',
  },
  {
    author: 'Guest Contributor',
    category: 'Marriage',
    coverAlt: 'Marriage and family editorial image',
    coverSrc: '/home-hero.png',
    excerpt: 'What covenant love looks like when the week is busy and the heart is tired.',
    publishedAt: '2026-06-08',
    readingMinutes: 10,
    scriptureBlock: {
      reference: 'Ephesians 5:25-33',
      text:
        'Husbands, love your wives, as Christ loved the church and gave himself up for her.',
    },
    sections: [
      {
        heading: 'Covenant love is ordinary before it is impressive',
        body: [
          'Marriage is shaped more by repeated faithfulness than by occasional intensity.',
          'Christian love in the home is often tested by fatigue, competing schedules, and the pressure to communicate with patience when the day has already been long.',
        ],
      },
      {
        heading: 'Home becomes a place of formation',
        body: [
          'A family does not merely consume theology; it rehearses it in habits, words, and conflict resolution.',
          'The home is one of the first places where doctrine becomes visible enough to be practiced or ignored.',
        ],
      },
    ],
    series: {
      description: 'Guided reflections on home, covenant, and family discipleship.',
      label: 'Home and Covenant',
      slug: 'home-and-covenant',
    },
    seriesOrder: 1,
    slug: 'marriage-family-and-patient-love',
    subtitle: 'Marriage and family require a long obedience that is rooted in Christ.',
    studyPanel: {
      title: 'Study notes',
      items: [
        'Cross reference: Colossians 3:12-14',
        'Teaching note: covenant language reshapes expectations for conflict and care.',
        'Reflection: where does patience need to become more visible at home?',
      ],
    },
    tags: ['Marriage', 'Family'],
    title: 'Marriage, family, and patient love',
    pullQuote: 'Patient love is often the most faithful love in the room.',
  },
  {
    author: 'Pastoral Desk',
    category: 'Ethics',
    coverAlt: 'Ethics and public life editorial image',
    coverSrc: '/home-hero.png',
    excerpt: 'When Christian conviction meets work, speech, and public life.',
    publishedAt: '2026-06-06',
    readingMinutes: 7,
    scriptureBlock: {
      reference: 'Micah 6:8',
      text: 'He has told you, O man, what is good; and what does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God?',
    },
    sections: [
      {
        heading: 'Ethics is more than rule keeping',
        body: [
          'A Christian ethic is not a detached checklist. It is a way of living before God that makes room for justice, humility, and restraint.',
          'That means speech, labor, and public responsibility all belong to discipleship.',
        ],
      },
      {
        heading: 'Conviction should remain legible',
        body: [
          'Believers should not make truth obscure by refusing to practice it clearly.',
          'In the workplace and in public, the question is not whether conviction disappears, but whether it remains intelligible and gracious.',
        ],
      },
    ],
    series: {
      description: 'A series on Christian conduct, responsibility, and witness.',
      label: 'Living Before God',
      slug: 'living-before-god',
    },
    seriesOrder: 1,
    slug: 'ethics-in-everyday-decisions',
    subtitle: 'Christian ethics reaches into speech, work, and public responsibility.',
    studyPanel: {
      title: 'Study notes',
      items: [
        'Cross reference: Romans 12:1-2',
        'Teaching note: ethical clarity should not be separated from gentleness.',
        'Reflection: where does your public life need more visible humility?',
      ],
    },
    tags: ['Ethics', 'Work'],
    title: 'Ethics in everyday decisions',
    pullQuote: 'Conviction should remain legible in the ordinary choices of life.',
  },
  {
    author: 'Editorial Team',
    category: 'Christian Life',
    coverAlt: 'Bible reading and study editorial image',
    coverSrc: '/home-hero.png',
    excerpt: 'What to do when you know the passage but still feel stuck.',
    publishedAt: '2026-06-03',
    readingMinutes: 9,
    scriptureBlock: {
      reference: 'Luke 24:27',
      text: 'And beginning with Moses and all the Prophets, he interpreted to them in all the Scriptures the things concerning himself.',
    },
    sections: [
      {
        heading: 'Reading Scripture when it feels familiar',
        body: [
          'Familiarity can make us careless. The solution is not to read faster but to read with more attention and more patience.',
          'The Bible keeps giving more than we assume if we keep returning to it with humility.',
        ],
      },
      {
        heading: 'Study aids should move you forward',
        body: [
          'Good study tools are not there to replace Scripture; they help the reader stay with the text long enough to see what is there.',
          'A note, a cross reference, or a question can reopen what had gone flat.',
        ],
      },
    ],
    series: {
      description: 'Foundations for new believers and readers who want to read well.',
      label: 'Foundations',
      slug: 'foundations',
    },
    seriesOrder: 2,
    slug: 'how-to-read-the-bible-when-stuck',
    subtitle: 'A reader does not need a new Bible, only a better habit of returning to the text.',
    studyPanel: {
      title: 'Study notes',
      items: [
        'Cross reference: 2 Timothy 2:15',
        'Teaching note: repetition can become reverent when it stays attentive.',
        'Reflection: which passage do you keep skipping because it feels familiar?',
      ],
    },
    tags: ['Scripture', 'Study'],
    title: 'How to read the Bible when you feel stuck',
    pullQuote: 'The Bible is not exhausted because you are tired of it.',
  },
  {
    author: 'Pastoral Desk',
    category: 'Pastoral Theology',
    coverAlt: 'Leadership and church pastoral editorial image',
    coverSrc: '/home-hero.png',
    excerpt: 'Why faithful leadership depends on steadiness more than charisma.',
    publishedAt: '2026-06-01',
    readingMinutes: 11,
    scriptureBlock: {
      reference: '1 Peter 5:2-3',
      text: 'Shepherd the flock of God that is among you, exercising oversight, not under compulsion, but willingly, as God would have you.',
    },
    sections: [
      {
        heading: 'Leadership is a burden for the good of others',
        body: [
          'Church leadership fails when it treats charisma as a substitute for shepherding.',
          'Steadiness, trust, and biblical speech usually do more to form a congregation than flair ever will.',
        ],
      },
      {
        heading: 'Leaders need more than capability',
        body: [
          'Ability matters, but the church is safer when leaders are also patient, accountable, and able to keep looking at the text.',
          'The call is not to be impressive but to be faithful.',
        ],
      },
    ],
    series: {
      description: 'A series for those who lead or shape the health of the church.',
      label: 'Shepherding the Church',
      slug: 'shepherding-the-church',
    },
    seriesOrder: 1,
    slug: 'leaders-need-more-than-charisma',
    subtitle: 'Church leadership becomes healthier when it is measured by faithfulness, not spectacle.',
    studyPanel: {
      title: 'Study notes',
      items: [
        'Cross reference: Acts 20:28',
        'Teaching note: leadership is a stewardship before it is a platform.',
        'Reflection: what habit would make your leadership more steady this week?',
      ],
    },
    tags: ['Leadership', 'Church'],
    title: 'When leaders need more than charisma',
    pullQuote: 'Faithful leadership is usually quieter than we expect.',
  },
  {
    author: 'Guest Contributor',
    category: 'Christian Life',
    coverAlt: 'Christian parenting and discipleship editorial image',
    coverSrc: '/home-hero.png',
    excerpt: 'Teaching children the gospel is ordinary work that still matters deeply.',
    publishedAt: '2026-05-28',
    readingMinutes: 7,
    scriptureBlock: {
      reference: 'Deuteronomy 6:6-7',
      text: 'And these words that I command you today shall be on your heart. You shall teach them diligently to your children.',
    },
    sections: [
      {
        heading: 'Home discipleship is repeated teaching',
        body: [
          'Children usually learn the gospel through repetition, example, and the tone of a home that keeps returning to the truth.',
          'Parents do not need to be spectacular; they need to be faithful and present.',
        ],
      },
      {
        heading: 'Small conversations matter',
        body: [
          'The gospel is often taught in the margins of the day: on the way out the door, at the table, after a mistake, or before sleep.',
          'Those ordinary repetitions form memory and affection together.',
        ],
      },
    ],
    series: {
      description: 'Guided reflections on home, covenant, and family discipleship.',
      label: 'Home and Covenant',
      slug: 'home-and-covenant',
    },
    seriesOrder: 2,
    slug: 'teaching-children-the-gospel-at-home',
    subtitle: 'A home becomes more legible when Scripture is repeated with patience.',
    studyPanel: {
      title: 'Study notes',
      items: [
        'Cross reference: Proverbs 22:6',
        'Teaching note: discipleship at home happens in ordinary moments.',
        'Reflection: what repeated conversation would help your home hear the gospel more clearly?',
      ],
    },
    tags: ['Family', 'Discipleship'],
    title: 'Teaching children the gospel at home',
    pullQuote: 'The gospel is taught as much by repetition as by formal instruction.',
  },
  {
    author: 'Editorial Team',
    category: 'Pastoral Theology',
    coverAlt: 'Grace and testimony editorial image',
    coverSrc: '/home-hero.png',
    excerpt: 'A testimony to patience, repentance, and the slow work of grace.',
    publishedAt: '2026-05-24',
    readingMinutes: 12,
    scriptureBlock: {
      reference: 'Philippians 1:6',
      text: 'And I am sure of this, that he who began a good work in you will bring it to completion at the day of Jesus Christ.',
    },
    sections: [
      {
        heading: 'Grace usually works slowly',
        body: [
          'Testimony is not always dramatic. Often it is the record of long obedience, repeated repentance, and the quiet persistence of God.',
          'Readers need room for that slower pattern because many of them live inside it.',
        ],
      },
      {
        heading: 'Patience belongs to formation',
        body: [
          'Growth is rarely immediate, and grace is not diminished by that delay.',
          'What matters is not how visible the progress looks, but that Christ is the one carrying it forward.',
        ],
      },
    ],
    series: {
      description: 'A guided set of foundations for new and growing believers.',
      label: 'Foundations',
      slug: 'foundations',
    },
    seriesOrder: 3,
    slug: 'the-slow-work-of-grace',
    subtitle: 'Testimony often sounds less dramatic than we expect and still carries real theological weight.',
    studyPanel: {
      title: 'Study notes',
      items: [
        'Cross reference: 2 Corinthians 12:9',
        'Teaching note: slow change can still be faithful change.',
        'Reflection: where do you need patience with yourself or someone else this week?',
      ],
    },
    tags: ['Testimony', 'Grace'],
    title: 'A testimony to the slow work of grace',
    pullQuote: 'The slow work of grace is still the work of grace.',
  },
  ...hungarianSeedDetails,
]

const articleDetailMap = new Map(articleDetails.map((article) => [article.slug, article]))

export function buildArticleUrl(slug: string) {
  return `/articles/${slug}`
}

export function listArticleDetailSlugs() {
  return articleDetails.map((article) => article.slug)
}

export function createArticleDetail(slug: string) {
  const detail = articleDetailMap.get(slug)
  if (!detail) return null

  const archive = createArchiveContent()
  const archiveArticle = archive.allArticles.find((article) => article.slug === slug)
  const seriesPeers = detail.series
    ? articleDetails.filter((article) => article.series?.slug === detail.series?.slug).sort((left, right) => (left.seriesOrder ?? 0) - (right.seriesOrder ?? 0))
    : []
  const currentIndex = seriesPeers.findIndex((article) => article.slug === slug)

  return {
    ...detail,
    archiveArticle,
    seriesNavigation: {
      next: currentIndex >= 0 ? seriesPeers[currentIndex + 1] : undefined,
      previous: currentIndex >= 0 ? seriesPeers[currentIndex - 1] : undefined,
    } satisfies ArticleSeriesNavigation,
  }
}
