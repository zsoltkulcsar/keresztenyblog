import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/server/payload', () => ({
  getCmsPayload: vi.fn(),
}))

import { getCmsPayload } from '@/lib/server/payload'
import {
  buildResourceUrl,
  getResourceItemBySlug,
  listResourceItems,
  loadResourceItem,
  loadResourceItems,
} from '@/lib/resources'

describe('resources', () => {
  it('builds resource urls and exposes fallback resources', () => {
    expect(buildResourceUrl('bible-study-aids')).toBe('/resources/bible-study-aids')
    expect(getResourceItemBySlug('bible-study-aids')?.type).toBe('study-guide')
    expect(listResourceItems()).toHaveLength(4)
  })

  it('merges cms resources with the fallback set', async () => {
    vi.mocked(getCmsPayload).mockResolvedValue({
      find: vi.fn().mockResolvedValue({
        docs: [
          {
            description: 'CMS resource description',
            externalUrl: 'https://example.com/resource',
            file: null,
            relatedArticleSlugs: ['scripture-shapes-christian-growth'],
            relatedSeriesSlugs: ['foundations'],
            slug: 'cms-resource',
            status: 'published',
            title: 'CMS Resource',
            type: 'link',
            usefulness: 'Useful for readers.',
          },
        ],
      }),
    } as never)

    const resources = await loadResourceItems()
    const cmsResource = await loadResourceItem('cms-resource')

    expect(resources.some((resource) => resource.slug === 'bible-study-aids')).toBe(true)
    expect(resources.some((resource) => resource.slug === 'cms-resource')).toBe(true)
    expect(cmsResource?.externalUrl).toBe('https://example.com/resource')
    expect(cmsResource?.relatedArticleSlugs).toContain('scripture-shapes-christian-growth')
  })
})
