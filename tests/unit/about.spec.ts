import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/server/payload', () => ({
  getCmsPayload: vi.fn(),
}))

import { getCmsPayload } from '@/lib/server/payload'
import { getFallbackAboutPage, loadAboutPageContent } from '@/lib/about'

describe('about page content', () => {
  it('exposes the fallback about content', () => {
    expect(getFallbackAboutPage().mission).toContain('Teach new Christians')
    expect(getFallbackAboutPage().contactLinks).toHaveLength(2)
  })

  it('loads cms content when available', async () => {
    vi.mocked(getCmsPayload).mockResolvedValue({
      findGlobal: vi.fn().mockResolvedValue({
        contactLinks: [{ label: 'Email', url: 'mailto:team@example.com' }],
        doctrine: 'CMS doctrine',
        editorialPosture: 'CMS editorial posture',
        manifesto: 'CMS manifesto',
        mission: 'CMS mission',
        teamMembers: [{ bio: 'Bio', name: 'Name', role: 'Role' }],
        visualIdentity: 'CMS visual identity',
      }),
    } as never)

    const about = await loadAboutPageContent()

    expect(about.manifesto).toBe('CMS manifesto')
    expect(about.teamMembers[0]?.name).toBe('Name')
    expect(about.contactLinks[0]?.url).toBe('mailto:team@example.com')
  })
})
