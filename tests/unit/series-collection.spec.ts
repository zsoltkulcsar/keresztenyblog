import { describe, expect, it } from 'vitest'

import { Series } from '@/collections/Series'

describe('Series collection', () => {
  it('exposes the expected payload shape', () => {
    expect(Series.slug).toBe('series')
    expect(Series.fields.some((field) => 'name' in field && field.name === 'title')).toBe(true)
    expect(Series.fields.some((field) => 'name' in field && field.name === 'slug')).toBe(true)
    expect(Series.fields.some((field) => 'name' in field && field.name === 'articleSlugs')).toBe(true)
    expect(Series.fields.some((field) => 'name' in field && field.name === 'seoDescription')).toBe(true)
  })
})
