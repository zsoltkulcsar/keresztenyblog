import { describe, expect, it } from 'vitest'

import { buildArticleUrl, createArticleDetail } from '@/lib/article-detail'

describe('article detail', () => {
  it('returns article detail and series navigation for a known slug', () => {
    const detail = createArticleDetail('how-to-read-the-bible-when-stuck')

    expect(detail).not.toBeNull()
    expect(detail?.title).toBe('How to read the Bible when you feel stuck')
    expect(detail?.series?.label).toBe('Foundations')
    expect(detail?.seriesNavigation.previous?.slug).toBe('scripture-shapes-christian-growth')
    expect(detail?.seriesNavigation.next?.slug).toBe('the-slow-work-of-grace')
  })

  it('builds a stable article url', () => {
    expect(buildArticleUrl('leaders-need-more-than-charisma')).toBe('/articles/leaders-need-more-than-charisma')
  })
})

