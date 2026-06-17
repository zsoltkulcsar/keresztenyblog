import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/server/payload', () => ({
  getCmsPayload: vi.fn(),
}))

import { getCmsPayload } from '@/lib/server/payload'
import {
  buildAuthorUrl,
  getAuthorProfileBySlug,
  listAuthorProfiles,
  loadAuthorProfileByName,
  loadAuthorProfiles,
  listPublishedArticleRefsForAuthor,
} from '@/lib/authors'

describe('authors', () => {
  it('builds author urls and exposes fallback profiles', () => {
    expect(buildAuthorUrl('editorial-team')).toBe('/authors/editorial-team')
    expect(getAuthorProfileBySlug('editorial-team')?.name).toBe('Editorial Team')
    expect(listAuthorProfiles()).toHaveLength(3)
    expect(listPublishedArticleRefsForAuthor('Editorial Team')).toHaveLength(3)
  })

  it('merges cms author profiles with the fallback set', async () => {
    vi.mocked(getCmsPayload).mockResolvedValue({
      find: vi.fn().mockResolvedValue({
        docs: [
          {
            articleSlugs: ['scripture-shapes-christian-growth'],
            bio: 'CMS author bio',
            links: [{ label: 'Profile', url: 'https://example.com' }],
            name: 'Copy Desk',
            photo: null,
            role: 'Editorial',
            slug: 'copy-desk',
            website: '',
          },
        ],
      }),
    } as never)

    const profiles = await loadAuthorProfiles()
    const cmsProfile = await loadAuthorProfileByName('Copy Desk')

    expect(profiles.some((profile) => profile.slug === 'editorial-team')).toBe(true)
    expect(profiles.some((profile) => profile.slug === 'copy-desk')).toBe(true)
    expect(cmsProfile?.bio).toBe('CMS author bio')
    expect(cmsProfile?.links).toHaveLength(1)
  })
})
