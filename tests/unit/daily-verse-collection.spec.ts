import { describe, expect, it } from 'vitest'

import { DailyVerse } from '@/collections/DailyVerse'

describe('DailyVerse collection', () => {
  it('exposes the expected payload shape', () => {
    expect(DailyVerse.slug).toBe('daily-verse')
    expect(DailyVerse.fields.some((field) => 'name' in field && field.name === 'date')).toBe(true)
    expect(DailyVerse.fields.some((field) => 'name' in field && field.name === 'reference')).toBe(true)
    expect(DailyVerse.fields.some((field) => 'name' in field && field.name === 'text')).toBe(true)
    expect(DailyVerse.fields.some((field) => 'name' in field && field.name === 'note')).toBe(true)
  })
})
