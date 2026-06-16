import { describe, expect, it } from 'vitest'

import { buildDailyVerseUrl, createDailyVerseEntry, listDailyVerseEntries } from '@/lib/daily-verse'

describe('daily verse helpers', () => {
  it('lists entries in reverse chronological order', () => {
    const entries = listDailyVerseEntries()

    expect(entries).toHaveLength(5)
    expect(entries[0].slug).toBe('2026-06-16')
    expect(entries[entries.length - 1].slug).toBe('2026-06-12')
  })

  it('returns a single daily verse entry by slug', () => {
    const entry = createDailyVerseEntry('2026-06-14')

    expect(entry?.reference).toBe('2 Timothy 3:16-17')
    expect(entry?.note).toContain('God uses the Word')
  })

  it('builds stable daily verse urls', () => {
    expect(buildDailyVerseUrl('2026-06-16')).toBe('/napi-ige/2026-06-16')
  })
})
