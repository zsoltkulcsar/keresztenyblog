import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/server/payload', () => ({
  getCmsPayload: vi.fn(),
}))

import { buildTaxonomyUrl, loadTaxonomyDetail, loadTaxonomyIndex } from '@/lib/taxonomy'

describe('taxonomy flows', () => {
  it('builds taxonomy urls', () => {
    expect(buildTaxonomyUrl('topic')).toBe('/topics')
    expect(buildTaxonomyUrl('topic', 'christian-life')).toBe('/topics/christian-life')
    expect(buildTaxonomyUrl('audience')).toBe('/audiences')
    expect(buildTaxonomyUrl('audience', 'new-believers')).toBe('/audiences/new-believers')
  })

  it('loads topic summaries from articles, series, and resources', async () => {
    const topics = await loadTaxonomyIndex('topic')
    const pastoralTheology = topics.find((topic) => topic.value === 'pastoral-theology')

    expect(pastoralTheology?.articleCount).toBeGreaterThan(0)
    expect(pastoralTheology?.seriesCount).toBeGreaterThan(0)
    expect(pastoralTheology?.resourceCount).toBeGreaterThan(0)
  })

  it('loads audience detail with matching content only', async () => {
    const detail = await loadTaxonomyDetail('audience', 'new-believers')

    expect(detail?.articles.length).toBeGreaterThan(0)
    expect(
      detail?.articles.every((article) =>
        article.audiences.some((audience) => audience.value === 'new-believers'),
      ),
    ).toBe(true)
    expect(detail?.series.some((series) => series.audience === 'new-believer')).toBe(true)
  })
})
