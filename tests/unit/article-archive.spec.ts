import { describe, expect, it } from 'vitest'

import { buildArchiveUrl, createArchiveContent } from '@/lib/article-archive'

describe('createArchiveContent', () => {
  it('returns the latest articles by default', () => {
    const content = createArchiveContent()

    expect(content.totalFilteredArticles).toBeGreaterThan(0)
    expect(content.articles[0].title).toBe('Why Scripture must shape every part of Christian growth')
    expect(content.pagination.currentPage).toBe(1)
  })

  it('filters by category, tag, and series', () => {
    const content = createArchiveContent({
      series: 'home-and-covenant',
      tag: 'family',
    })

    expect(content.totalFilteredArticles).toBe(2)
    expect(content.articles.every((article) => article.series.value === 'home-and-covenant')).toBe(
      true,
    )
    expect(content.articles.every((article) => article.tags.some((tag) => tag.value === 'family'))).toBe(true)
  })

  it('sorts by reading time and paginates the visible results', () => {
    const content = createArchiveContent({
      page: '2',
      sort: 'reading-time',
    })

    expect(content.pagination.currentPage).toBe(2)
    expect(content.articles).toHaveLength(4)
    expect(content.articles[0].readingMinutes).toBeLessThanOrEqual(
      content.articles[content.articles.length - 1].readingMinutes,
    )
  })

  it('exposes an empty state when nothing matches', () => {
    const content = createArchiveContent({
      author: 'no-such-author',
    })

    expect(content.totalFilteredArticles).toBe(0)
    expect(content.articles).toHaveLength(0)
  })
})

describe('buildArchiveUrl', () => {
  it('omits default values and preserves active filters', () => {
    expect(
      buildArchiveUrl({
        category: 'marriage',
        page: 2,
        sort: 'latest',
      }),
    ).toBe('/articles?category=marriage&page=2')
  })
})
