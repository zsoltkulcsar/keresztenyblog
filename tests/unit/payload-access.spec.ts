import { describe, expect, it, vi } from 'vitest'

import {
  allowEditorOrAdmin,
  allowFirstAdminOrAdminOnly,
  canManageCollection,
  isAdmin,
  isAdminOrEditor,
  isEditor,
  allowPublicRead,
} from '@/payload/access'
import { buildPreviewUrl } from '@/payload/preview'

describe('payload access helpers', () => {
  it('detects user roles consistently', () => {
    expect(isAdmin({ role: 'admin' })).toBe(true)
    expect(isEditor({ role: 'editor' })).toBe(true)
    expect(isAdminOrEditor({ role: 'editor' })).toBe(true)
    expect(canManageCollection({ role: 'admin' })).toBe(true)
    expect(canManageCollection({ role: 'editor' })).toBe(true)
    expect(isAdmin({ role: 'editor' })).toBe(false)
    expect(isEditor({ role: 'admin' })).toBe(false)
  })

  it('builds the published-read filter for public users', () => {
    const readAccess = allowPublicRead()
    expect(readAccess({ req: { user: null } as never })).toBe(true)
  })

  it('allows editors through collection access gates', () => {
    const access = allowEditorOrAdmin()
    expect(access({ req: { user: { role: 'editor' } } as never })).toBe(true)
  })

  it('allows the first admin creation while blocking later public creation', async () => {
    const createAccess = allowFirstAdminOrAdminOnly()
    const payload = {
      count: vi.fn().mockResolvedValueOnce({ totalDocs: 0 }).mockResolvedValueOnce({ totalDocs: 2 }),
    }

    await expect(createAccess({ req: { payload, user: null } as never })).resolves.toBe(true)
    await expect(createAccess({ req: { payload, user: null } as never })).resolves.toBe(false)
  })

  it('builds preview urls from slug or date', () => {
    expect(buildPreviewUrl('/series', { slug: 'foundations' })).toBe('/series/foundations')
    expect(buildPreviewUrl('/napi-ige', { date: '2026-06-16' })).toBe('/napi-ige/2026-06-16')
    expect(buildPreviewUrl('/series', {})).toBeNull()
  })
})
