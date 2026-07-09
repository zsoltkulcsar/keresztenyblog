import { beforeEach, describe, expect, it, vi } from 'vitest'

import { loadArchiveContent } from '@/lib/article-archive'
import { loadArticleDetail } from '@/lib/article-detail'
import { loadSeriesOverview } from '@/lib/series'
import { getCmsPayload } from '@/lib/server/payload'

vi.mock('@/lib/server/payload', () => ({
  getCmsPayload: vi.fn(),
}))

const cmsSeries = {
  audience: [{ slug: 'new-believers', title: 'New Believers' }],
  description: 'A first discipleship path.',
  longDescription: 'A first discipleship path.',
  orderedArticles: [] as Array<{ article: unknown; order: number }>,
  seoDescription: 'A first discipleship path.',
  seoTitle: 'CMS Foundations',
  slug: 'cms-foundations',
  status: 'published',
  title: 'CMS Foundations',
  topic: [{ slug: 'salvation', title: 'Salvation' }],
}

const cmsArticle = {
  audiences: [{ slug: 'new-believers', title: 'New Believers' }],
  author: { slug: 'editorial-team', title: 'Editorial Team' },
  body: {
    root: {
      children: [
        {
          children: [{ text: 'CMS Section', type: 'text' }],
          type: 'heading',
        },
        {
          children: [{ text: 'CMS article paragraph.', type: 'text' }],
          type: 'paragraph',
        },
      ],
    },
  },
  excerpt: 'CMS excerpt',
  format: 'teaching',
  mainScripture: 'Ephesians 2:1-10',
  publishedAt: '2026-01-01',
  pullQuote: 'CMS pull quote',
  relatedBooks: ['CMS Book'],
  relatedResources: [{ slug: 'cms-resource', title: 'CMS Resource' }],
  scriptureText: 'CMS scripture text',
  seriesMemberships: [{ order: 1, series: cmsSeries }],
  slug: 'cms-article',
  status: 'published',
  studyQuestions: ['CMS question?'],
  subtitle: 'CMS subtitle',
  tags: ['cms'],
  title: 'CMS Article',
  topics: [{ slug: 'salvation', title: 'Salvation' }],
}

cmsSeries.orderedArticles = [{ article: cmsArticle, order: 1 }]

function mockCmsPayload() {
  vi.mocked(getCmsPayload).mockResolvedValue({
    find: vi.fn(async ({ collection }: { collection: string }) => {
      if (collection === 'articles') return { docs: [cmsArticle] }
      if (collection === 'series') return { docs: [cmsSeries] }
      return { docs: [] }
    }),
  } as never)
}

describe('CMS-backed public content flows', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('uses CMS articles for the article archive and detail when available', async () => {
    mockCmsPayload()

    const archive = await loadArchiveContent()
    const detail = await loadArticleDetail('cms-article')

    expect(archive.articles[0].title).toBe('CMS Article')
    expect(detail?.title).toBe('CMS Article')
    expect(detail?.series?.label).toBe('CMS Foundations')
  })

  it('uses CMS ordered series relationships when available', async () => {
    mockCmsPayload()

    const overview = await loadSeriesOverview('cms-foundations')

    expect(overview?.title).toBe('CMS Foundations')
    expect(overview?.articles).toHaveLength(1)
    expect(overview?.articles[0].article.slug).toBe('cms-article')
  })

  it('falls back to static starter content when Payload is unavailable', async () => {
    vi.mocked(getCmsPayload).mockResolvedValue(null)

    const archive = await loadArchiveContent()
    const detail = await loadArticleDetail('what-happened-when-you-believed')

    expect(archive.articles.length).toBeGreaterThan(0)
    expect(detail?.title).toBe('What Happened When You Believed')
  })
})
