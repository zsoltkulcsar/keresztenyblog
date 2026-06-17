import { describe, expect, it } from 'vitest'

import { DailyVerse } from '@/collections/DailyVerse'
import { Media } from '@/collections/Media'
import { NewsletterSignups } from '@/collections/NewsletterSignups'
import { Series } from '@/collections/Series'
import { Users } from '@/collections/Users'

function fieldNames(collection: { fields: unknown[] }) {
  return collection.fields
    .map((field) => (typeof field === 'object' && field && 'name' in field ? String(field.name) : null))
    .filter(Boolean)
}

describe('CMS collections', () => {
  it('adds the editor role model to users', () => {
    expect(Users.slug).toBe('users')
    expect(fieldNames(Users)).toContain('role')
    expect(Users.access?.create).toBeDefined()
    expect(Users.admin?.group).toBe('Access')
  })

  it('enables draft workflow and preview on series', () => {
    expect(Series.slug).toBe('series')
    expect((Series.versions as { drafts?: unknown } | undefined)?.drafts).toEqual({
      autosave: false,
      schedulePublish: true,
      validate: true,
    })
    expect(Series.admin?.preview?.({ slug: 'foundations' } as never, {} as never)).toBe('/series/foundations')
    expect(Series.admin?.group).toBe('Content')
  })

  it('enables draft workflow and preview on daily verse', () => {
    expect(DailyVerse.slug).toBe('daily-verse')
    expect((DailyVerse.versions as { drafts?: unknown } | undefined)?.drafts).toEqual({
      autosave: false,
      schedulePublish: true,
      validate: true,
    })
    expect(DailyVerse.admin?.preview?.({ date: '2026-06-16' } as never, {} as never)).toBe('/napi-ige/2026-06-16')
    expect(DailyVerse.admin?.group).toBe('Content')
  })

  it('stores the required media metadata fields', () => {
    expect(Media.slug).toBe('media')
    expect(fieldNames(Media)).toEqual(expect.arrayContaining(['alt', 'caption', 'credit']))
    expect(Media.upload).toEqual(
      expect.objectContaining({
        displayPreview: true,
        focalPoint: true,
      }),
    )
  })

  it('keeps newsletter signups restricted to authenticated management', () => {
    expect(NewsletterSignups.slug).toBe('newsletter-signups')
    expect(NewsletterSignups.admin?.group).toBe('Submissions')
    expect(NewsletterSignups.access?.read).toBeDefined()
  })
})
