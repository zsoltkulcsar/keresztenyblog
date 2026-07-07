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
  'bible-study': 'Bible study',
  'christian-life': 'Christian life',
  doctrine: 'Doctrine',
  family: 'Family',
  leadership: 'Leadership',
  prayer: 'Prayer',
}

export const bookAudienceLabels: Record<BookRecommendation['audience'], string> = {
  'growing-believer': 'Growing believer',
  leader: 'Leader',
  'mature-believer': 'Mature believer',
  'new-believer': 'New believer',
}

export const bookLevelLabels: Record<BookRecommendation['level'], string> = {
  advanced: 'Advanced',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
}

const books: BookRecommendation[] = [
  {
    audience: 'new-believer',
    author: 'Editorial recommendation',
    comments: [
      {
        body: 'Helpful for slowing down and learning how to ask better questions of the passage.',
        name: 'Anna',
        response:
          'That is exactly why we recommend using it beside an open Bible, not as a shortcut.',
      },
    ],
    description:
      'A starting recommendation for readers who want to learn how to read Scripture carefully.',
    coverTone: 'blue',
    format: 'study-companion',
    highlights: ['Scripture observation', 'clear structure', 'beginner friendly'],
    level: 'beginner',
    recommendation:
      'Use this when a reader wants help with the basic habits of observation, interpretation, and prayerful response.',
    readingPlan: [
      'Read one chapter slowly before opening the book.',
      'Write the main question the passage raises.',
      'Use the recommendation to clarify, then return to the biblical text.',
    ],
    slug: 'reading-scripture-slowly',
    status: 'published',
    title: 'Reading Scripture Slowly',
    topic: 'bible-study',
    whyRead:
      'It helps new and growing believers stop rushing the text and begin reading with attention.',
  },
  {
    audience: 'growing-believer',
    author: 'Editorial recommendation',
    comments: [
      {
        body: 'I would use this with a small group because it turns ordinary habits into discussion.',
        name: 'Mark',
      },
    ],
    description:
      'A practical recommendation for ordinary faithfulness, prayer, habits, and obedience.',
    coverTone: 'green',
    format: 'book',
    highlights: ['daily rhythm', 'spiritual habits', 'practical obedience'],
    level: 'intermediate',
    recommendation:
      'Best for readers who already know the basics but need a steady framework for daily Christian life.',
    readingPlan: [
      'Read one section each week.',
      'Choose one habit to practice before moving on.',
      'Discuss the questions with a mentor, spouse, or group.',
    ],
    slug: 'ordinary-faithfulness',
    status: 'published',
    title: 'Ordinary Faithfulness',
    topic: 'christian-life',
    whyRead: 'It connects doctrine to repeated choices, not only big spiritual moments.',
  },
  {
    audience: 'mature-believer',
    author: 'Editorial recommendation',
    comments: [
      {
        body: 'This helped me see doctrine as something that strengthens worship and patience.',
        name: 'David',
        response:
          'That connection between doctrine and worship is one of the main reasons it belongs here.',
      },
    ],
    description:
      'A deeper recommendation for readers who want doctrine to shape worship and endurance.',
    coverTone: 'indigo',
    format: 'book',
    highlights: ['doctrine', 'worship', 'spiritual depth'],
    level: 'advanced',
    recommendation:
      'Use this as a slower read when the goal is not speed but theological depth and spiritual formation.',
    readingPlan: [
      'Read with a notebook and mark key theological claims.',
      'Pair each chapter with at least one Scripture passage.',
      'Turn one doctrine into prayer before continuing.',
    ],
    slug: 'doctrine-that-forms-worship',
    status: 'published',
    title: 'Doctrine That Forms Worship',
    topic: 'doctrine',
    whyRead: 'It helps mature readers connect theological clarity with love for God.',
  },
  {
    audience: 'leader',
    author: 'Editorial recommendation',
    comments: [
      {
        body: 'Good for leaders who prepare teaching and need to think pastorally, not only correctly.',
        name: 'Peter',
      },
    ],
    coverTone: 'slate',
    description: 'A recommendation for church leaders, teachers, and people who care for others.',
    format: 'reading-list',
    highlights: ['pastoral care', 'teaching', 'church leadership'],
    level: 'intermediate',
    recommendation:
      'Useful for leaders who want their teaching plans to serve people rather than only transfer information.',
    readingPlan: [
      'Read with one upcoming teaching or conversation in mind.',
      'Write what the reader or listener needs spiritually.',
      'Review the related Kovasz leadership articles after reading.',
    ],
    slug: 'pastoral-teaching-and-care',
    status: 'published',
    title: 'Pastoral Teaching and Care',
    topic: 'leadership',
    whyRead: 'It trains leaders to ask how truth should shepherd real people.',
  },
  {
    audience: 'growing-believer',
    author: 'Editorial recommendation',
    comments: [],
    coverTone: 'rose',
    description: 'A family-focused recommendation for discipleship at home and patient love.',
    format: 'book',
    highlights: ['home life', 'marriage', 'family discipleship'],
    level: 'beginner',
    recommendation:
      'Best for couples, parents, and families who want a simple, repeatable reading rhythm at home.',
    readingPlan: [
      'Read short portions together rather than trying to finish quickly.',
      'Choose one practice for the coming week.',
      'Use the discussion questions at a meal or evening prayer time.',
    ],
    slug: 'faithful-home-life',
    status: 'published',
    title: 'Faithful Home Life',
    topic: 'family',
    whyRead: 'It makes family discipleship feel concrete instead of abstract.',
  },
  {
    audience: 'new-believer',
    author: 'Editorial recommendation',
    comments: [],
    coverTone: 'teal',
    description: 'A prayer recommendation for readers who struggle to know what to say to God.',
    format: 'study-companion',
    highlights: ['prayer', 'Psalms', 'devotional rhythm'],
    level: 'beginner',
    recommendation:
      'Use this beside the Psalms when prayer feels scattered, dry, or hard to begin.',
    readingPlan: [
      'Read one psalm before reading the recommendation.',
      'Pray one sentence from the psalm in your own words.',
      'Write one truth about God to carry into the day.',
    ],
    slug: 'learning-to-pray-with-scripture',
    status: 'published',
    title: 'Learning to Pray with Scripture',
    topic: 'prayer',
    whyRead: 'It gives language for honest prayer without moving away from Scripture.',
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
