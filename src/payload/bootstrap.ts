import type { Payload } from 'payload'

import { editorialArticles, type EditorialArticleSeed } from '@/lib/editorial-articles'

const DEV_ADMIN = {
  email: 'dev@payloadcms.com',
  password: 'test',
  role: 'admin' as const,
}

const SHOULD_REFRESH_STARTER_CONTENT = process.env.KOVASZ_REFRESH_SEED === 'true'

type SeedDoc = Record<string, unknown> & {
  __created?: boolean
  id?: number | string
}

const STARTER_RESOURCES = [
  {
    audience: 'New believers',
    ctaLabel: 'Open study guide',
    description:
      'A guided entry point for readers who want to understand the whole shape of Christian growth through Scripture.',
    featured: true,
    format: 'Guided study',
    highlights: ['Scripture observation', 'reflection prompts', 'weekly rhythm'],
    relatedArticleSlugs: ['how-to-read-the-bible-for-the-first-time'],
    relatedSeriesSlugs: ['foundations-for-new-believers'],
    slug: 'bible-study-aids',
    status: 'published',
    steps: [
      'Read the passage twice before opening notes or commentaries.',
      'Write one observation, one question, and one response of prayer.',
      'Return to the related article or series when a theme needs deeper study.',
    ],
    title: 'Bible study aids',
    topic: 'Bible reading',
    type: 'study-guide',
    usefulness: 'Helps readers slow down, observe the text, and keep the passage at the center.',
  },
  {
    audience: 'New and growing believers',
    ctaLabel: 'View series path',
    description:
      'A focused reading path for new and growing believers who want structure instead of scattered links.',
    format: 'Series companion',
    highlights: ['ordered reading', 'doctrine basics', 'discussion-ready'],
    relatedArticleSlugs: ['how-to-read-the-bible-for-the-first-time'],
    relatedSeriesSlugs: ['foundations-for-new-believers'],
    slug: 'foundations-series-guide',
    status: 'published',
    steps: [
      'Start with the first article in the Foundations series.',
      'Use the summary questions after each reading.',
      'Repeat difficult sections with a mentor, group, or pastor.',
    ],
    title: 'Foundations series guide',
    topic: 'Discipleship',
    type: 'series',
    usefulness: 'Groups the articles into one path for learning and review.',
  },
  {
    audience: 'Daily readers',
    ctaLabel: 'Open archive',
    description: 'Short Scripture readings for the day with archive access and stable links.',
    format: 'Archive link',
    highlights: ['daily rhythm', 'shareable references', 'short readings'],
    relatedArticleSlugs: [],
    relatedSeriesSlugs: [],
    slug: 'daily-verse-archive',
    status: 'published',
    steps: [
      'Choose one reading for the morning or evening.',
      'Read the verse in its surrounding paragraph.',
      'Save the link when it helps a conversation or prayer time.',
    ],
    title: 'Daily Verse archive',
    topic: 'Devotional rhythm',
    type: 'link',
    usefulness: 'Keeps daily reading easy to revisit and share.',
  },
  {
    audience: 'Personal study',
    ctaLabel: 'Open file',
    description: 'A downloadable reading aid for keeping track of passages, notes, and questions.',
    externalUrl: '/home-hero.png',
    fileHref: '/home-hero.png',
    format: 'Printable file',
    highlights: ['printable', 'notes', 'questions'],
    relatedArticleSlugs: ['how-to-read-the-bible-for-the-first-time'],
    relatedSeriesSlugs: ['foundations-for-new-believers'],
    slug: 'printable-reading-plan',
    status: 'published',
    steps: [
      'Print one page per week or keep the file beside your Bible.',
      'Use the question space before reading secondary resources.',
      'Review the notes at the end of the week.',
    ],
    title: 'Printable reading plan',
    topic: 'Bible reading',
    type: 'file',
    usefulness: 'Useful for printed study and slower personal review.',
  },
  {
    audience: 'Small group leaders',
    ctaLabel: 'Open leader tool',
    description:
      'A practical outline for preparing a Bible discussion without turning it into a lecture.',
    format: 'Leader worksheet',
    highlights: ['group questions', 'text-first flow', 'pastoral application'],
    relatedArticleSlugs: ['how-to-read-the-bible-for-the-first-time'],
    relatedSeriesSlugs: ['foundations-for-new-believers'],
    slug: 'small-group-discussion-guide',
    status: 'published',
    steps: [
      'Mark the main movement of the passage before writing questions.',
      'Prepare one observation, one interpretation, and one application question.',
      'Leave space for prayer and concrete obedience.',
    ],
    title: 'Small group discussion guide',
    topic: 'Leadership',
    type: 'leader-tool',
    usefulness:
      'Helps leaders ask better questions and keep the group anchored in the biblical text.',
  },
  {
    audience: 'Married couples and families',
    ctaLabel: 'Open reading plan',
    description:
      'A short household reading rhythm for families who want Scripture to shape ordinary days.',
    format: 'Reading plan',
    highlights: ['family rhythm', 'short readings', 'conversation prompts'],
    relatedArticleSlugs: ['parenting-without-perfection'],
    relatedSeriesSlugs: [],
    slug: 'family-scripture-rhythm',
    status: 'published',
    steps: [
      'Pick a short passage that can be read aloud in a few minutes.',
      'Ask one simple question: what does this show about God?',
      'Close with one sentence of prayer from each person who wants to pray.',
    ],
    title: 'Family Scripture rhythm',
    topic: 'Family',
    type: 'reading-plan',
    usefulness: 'Gives families a repeatable pattern without requiring long preparation.',
  },
  {
    audience: 'Readers with hard questions',
    ctaLabel: 'Open resource',
    description:
      'A curated starting point for ethical questions where Scripture, wisdom, and pastoral care meet.',
    format: 'Curated link list',
    highlights: ['ethics', 'discernment', 'pastoral care'],
    relatedArticleSlugs: ['is-it-wrong-to-be-wealthy'],
    relatedSeriesSlugs: [],
    slug: 'ethics-question-starter',
    status: 'published',
    steps: [
      'Define the question as honestly and specifically as possible.',
      'Identify which biblical themes are directly involved.',
      'Bring unclear cases into prayerful conversation with mature believers.',
    ],
    title: 'Ethics question starter',
    topic: 'Ethics',
    type: 'article',
    usefulness: 'Helps readers frame moral questions carefully before looking for quick answers.',
  },
  {
    audience: 'Mature believers',
    ctaLabel: 'Open recommendation',
    description:
      'A compact book path for readers who want to grow in prayer, doctrine, and daily obedience.',
    externalUrl: 'https://www.desiringgod.org/books',
    format: 'Book list',
    highlights: ['recommended books', 'spiritual growth', 'doctrine'],
    relatedArticleSlugs: [],
    relatedSeriesSlugs: ['foundations-for-new-believers'],
    slug: 'spiritual-growth-book-list',
    status: 'published',
    steps: [
      'Choose one book that matches your current question or season.',
      'Read slowly with a notebook, not as a completion task.',
      'Pair the book with related Scripture passages.',
    ],
    title: 'Spiritual growth book list',
    topic: 'Personal growth',
    type: 'book',
    usefulness: 'Creates a next-step shelf for readers who need more than one article.',
  },
  {
    audience: 'Church leaders',
    ctaLabel: 'Open checklist',
    description:
      'A ministry checklist for evaluating whether a teaching plan serves formation, not only information.',
    format: 'Checklist',
    highlights: ['teaching planning', 'formation', 'leader review'],
    relatedArticleSlugs: ['the-elders-first-qualification-is-character-not-skill'],
    relatedSeriesSlugs: [],
    slug: 'teaching-plan-checklist',
    status: 'published',
    steps: [
      'Name the biblical text and the central truth clearly.',
      'Define the hoped-for response in belief, affection, and action.',
      'Remove material that is interesting but not necessary for the aim.',
    ],
    title: 'Teaching plan checklist',
    topic: 'Pastoral theology',
    type: 'leader-tool',
    usefulness:
      'Gives leaders a simple grid for connecting doctrine, Scripture, prayer, and practice.',
  },
  {
    audience: 'Readers in prayer',
    ctaLabel: 'Open study guide',
    description:
      'A quiet guide for using the Psalms when words are hard and prayer feels scattered.',
    format: 'Devotional guide',
    highlights: ['Psalms', 'prayer', 'lament and praise'],
    relatedArticleSlugs: ['what-to-do-when-you-dont-want-to-pray'],
    relatedSeriesSlugs: [],
    slug: 'praying-with-the-psalms',
    status: 'published',
    steps: [
      'Choose a psalm that matches the honest state of your heart.',
      'Pray one line at a time, turning the words toward God.',
      'End by naming one truth about God that the psalm gives you.',
    ],
    title: 'Praying with the Psalms',
    topic: 'Prayer',
    type: 'study-guide',
    usefulness:
      'Shows readers how Scripture can give language to grief, repentance, trust, and praise.',
  },
] as const

function slugifyLabel(label: string) {
  return label
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function textNode(text: string) {
  return {
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    text,
    type: 'text',
    version: 1,
  }
}

function lexicalParagraph(text: string) {
  return {
    children: [textNode(text)],
    direction: null,
    format: '',
    indent: 0,
    textFormat: 0,
    textStyle: '',
    type: 'paragraph',
    version: 1,
  }
}

function lexicalHeading(text: string) {
  return {
    children: [textNode(text)],
    direction: null,
    format: '',
    indent: 0,
    tag: 'h2',
    type: 'heading',
    version: 1,
  }
}

function articleBodyToLexical(article: EditorialArticleSeed) {
  return {
    root: {
      children: article.body.flatMap((section) => [
        lexicalHeading(section.heading),
        ...section.body.map(lexicalParagraph),
      ]),
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

async function upsertBySlug(
  payload: Payload,
  collection: string,
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection: collection as never,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const existingDoc = existing.docs[0] as SeedDoc | undefined

  if (existingDoc?.id) {
    if (!SHOULD_REFRESH_STARTER_CONTENT) {
      return { ...existingDoc, __created: false }
    }

    const updatedDoc = await payload.update({
      id: existingDoc.id,
      collection: collection as never,
      data,
      overrideAccess: true,
    })

    return { ...(updatedDoc as SeedDoc), __created: false }
  }

  const createdDoc = await payload.create({
    collection: collection as never,
    data,
    overrideAccess: true,
  })

  return { ...(createdDoc as SeedDoc), __created: true }
}

export async function seedDevAdminIfNeeded(payload: Payload): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    where: {
      email: {
        equals: DEV_ADMIN.email,
      },
    },
    overrideAccess: true,
  })

  const existingUser = existing.docs[0]

  if (existingUser?.id) {
    await payload.update({
      id: existingUser.id,
      collection: 'users',
      data: {
        password: DEV_ADMIN.password,
        role: DEV_ADMIN.role,
      },
      overrideAccess: true,
    })
  } else {
    try {
      await payload.create({
        collection: 'users',
        data: DEV_ADMIN,
        draft: true,
        overrideAccess: true,
      })
      payload.logger.info('Seeded local dev admin user dev@payloadcms.com / test')
    } catch (error) {
      if (!(error instanceof Error && error.message.includes('email'))) {
        throw error
      }
    }
  }

  if (process.env.NODE_ENV !== 'test') {
    await seedStarterContentIfNeeded(payload)
  }
}

async function seedStarterContentIfNeeded(payload: Payload): Promise<void> {
  const topicLabels = new Set<string>()
  const audienceLabels = new Set<string>()

  for (const article of editorialArticles) {
    article.topic.forEach((topic) => topicLabels.add(topic))
    article.audience.forEach((audience) => audienceLabels.add(audience))
  }

  for (const resource of STARTER_RESOURCES) {
    topicLabels.add(resource.topic)
    audienceLabels.add(resource.audience)
  }

  const topicDocs = new Map<string, SeedDoc>()
  const audienceDocs = new Map<string, SeedDoc>()

  for (const title of topicLabels) {
    const slug = slugifyLabel(title)
    const doc = await upsertBySlug(payload, 'topics', slug, {
      description: `${title} content and study material.`,
      slug,
      title,
    })
    topicDocs.set(title, doc)
  }

  for (const title of audienceLabels) {
    const slug = slugifyLabel(title)
    const doc = await upsertBySlug(payload, 'audiences', slug, {
      description: `Content prepared for ${title.toLowerCase()}.`,
      slug,
      title,
    })
    audienceDocs.set(title, doc)
  }

  const author = (await upsertBySlug(payload, 'authors', 'editorial-team', {
    articleSlugs: editorialArticles.map((article) => article.slug),
    bio: 'Editorial writing focused on Scripture, Christian growth, and the shape of ordinary faithfulness.',
    links: [],
    name: 'Editorial Team',
    role: 'Editorial Team',
    slug: 'editorial-team',
    status: 'published',
  })) as SeedDoc

  const resourceDocs = new Map<string, SeedDoc>()

  for (const resource of STARTER_RESOURCES) {
    const { fileHref: _fileHref, ...resourceData } = resource
    const doc = await upsertBySlug(payload, 'resources', resource.slug, {
      ...resourceData,
      audiences: [audienceDocs.get(resource.audience)?.id].filter(Boolean),
      topics: [topicDocs.get(resource.topic)?.id].filter(Boolean),
    })
    resourceDocs.set(resource.slug, doc)
  }

  const articleDocs = new Map<string, SeedDoc>()

  for (const article of editorialArticles) {
    const relatedResourceIds = [article.relatedResource]
      .map((title) => STARTER_RESOURCES.find((resource) => resource.title === title)?.slug)
      .filter(Boolean)
      .map((slug) => resourceDocs.get(slug as string)?.id)
      .filter(Boolean)

    const doc = await upsertBySlug(payload, 'articles', article.slug, {
      audiences: article.audience.map((audience) => audienceDocs.get(audience)?.id).filter(Boolean),
      author: author.id,
      body: articleBodyToLexical(article),
      excerpt: article.excerpt,
      format: article.format,
      mainScripture: article.mainScripture,
      publishedAt: article.publishedAt,
      pullQuote: article.pullQuote,
      relatedBooks: article.relatedBook ? [article.relatedBook] : [],
      relatedResources: relatedResourceIds,
      scriptureText: article.scriptureText,
      slug: article.slug,
      status: 'published',
      studyQuestions: article.studyQuestions,
      subtitle: article.subtitle,
      tags: article.tags,
      title: article.title,
      topics: article.topic.map((topic) => topicDocs.get(topic)?.id).filter(Boolean),
    })
    articleDocs.set(article.slug, doc)
  }

  const seriesBySlug = new Map<
    string,
    {
      description: string
      label: string
      articles: Array<{ articleSlug: string; order: number }>
      firstArticle: EditorialArticleSeed
    }
  >()

  for (const article of editorialArticles) {
    for (const membership of article.series) {
      const existingSeries = seriesBySlug.get(membership.slug)
      if (existingSeries) {
        existingSeries.articles.push({ articleSlug: article.slug, order: membership.order })
      } else {
        seriesBySlug.set(membership.slug, {
          articles: [{ articleSlug: article.slug, order: membership.order }],
          description: membership.description,
          firstArticle: article,
          label: membership.label,
        })
      }
    }
  }

  const seriesDocs = new Map<string, SeedDoc>()

  for (const [slug, series] of seriesBySlug.entries()) {
    const orderedArticles = series.articles
      .sort((left, right) => left.order - right.order)
      .map((item) => ({
        article: articleDocs.get(item.articleSlug)?.id,
        order: item.order,
      }))
      .filter((item) => item.article)

    const doc = await upsertBySlug(payload, 'series', slug, {
      articleSlugs: orderedArticles
        .map((item) => {
          const source = series.articles.find((article) => article.order === item.order)
          return source?.articleSlug
        })
        .filter(Boolean),
      audience: series.firstArticle.audience
        .map((audience) => audienceDocs.get(audience)?.id)
        .filter(Boolean),
      description: series.description,
      longDescription: series.description,
      orderedArticles,
      seoDescription: series.description,
      seoTitle: series.label,
      slug,
      status: 'published',
      title: series.label,
      topic: series.firstArticle.topic.map((topic) => topicDocs.get(topic)?.id).filter(Boolean),
    })

    seriesDocs.set(slug, doc)
  }

  for (const article of editorialArticles) {
    const memberships = article.series
      .map((membership) => ({
        order: membership.order,
        series: seriesDocs.get(membership.slug)?.id,
      }))
      .filter((membership) => membership.series)

    if (memberships.length > 0) {
      const articleDoc = articleDocs.get(article.slug)
      if (articleDoc?.id && (articleDoc.__created || SHOULD_REFRESH_STARTER_CONTENT)) {
        await payload.update({
          id: articleDoc.id,
          collection: 'articles',
          data: {
            seriesMemberships: memberships,
          },
          overrideAccess: true,
        })
      }
    }
  }

  payload.logger.info('Seeded starter Kovasz content for local development')
}
