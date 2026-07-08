import { describe, expect, it } from 'vitest'

import { buildArticleUrl, createArticleDetail } from '@/lib/article-detail'

describe('article detail', () => {
  it('returns article detail and series navigation for a known slug', () => {
    const detail = createArticleDetail('how-to-read-the-bible-for-the-first-time')

    expect(detail).not.toBeNull()
    expect(detail?.title).toBe('How to Read the Bible for the First Time')
    expect(detail?.series?.label).toBe('Foundations for New Believers')
    expect(detail?.seriesNavigation.previous?.slug).toBe('what-happened-when-you-believed')
    expect(detail?.seriesNavigation.next?.slug).toBe('why-the-church-is-not-optional')
  })

  it('builds a stable article url', () => {
    expect(buildArticleUrl('how-to-preach-when-you-feel-unqualified')).toBe(
      '/articles/how-to-preach-when-you-feel-unqualified',
    )
  })
})
