import { describe, expect, it } from 'vitest'

import { buildSearchUrl, createEditorialSearch } from '@/lib/editorial-search'

describe('createEditorialSearch', () => {
  it('returns an empty state when no query is provided', () => {
    const state = createEditorialSearch()

    expect(state.hasQuery).toBe(false)
    expect(state.totalResults).toBe(0)
    expect(state.results).toHaveLength(0)
  })

  it('returns ranked results for editorial terms', () => {
    const state = createEditorialSearch({ q: 'scripture growth' })

    expect(state.hasQuery).toBe(true)
    expect(state.totalResults).toBeGreaterThan(0)
    expect(state.results[0].title).toBe('Why Scripture must shape every part of Christian growth')
  })

  it('finds author results and resource results', () => {
    const authors = createEditorialSearch({ q: 'pastoral desk' })
    const resources = createEditorialSearch({ q: 'study aids' })

    expect(authors.results.some((result) => result.type === 'author')).toBe(true)
    expect(resources.results.some((result) => result.type === 'resource')).toBe(true)
  })

  it('returns no results for an unmatched term', () => {
    const state = createEditorialSearch({ q: 'nonexistent term' })

    expect(state.totalResults).toBe(0)
    expect(state.results).toHaveLength(0)
  })
})

describe('buildSearchUrl', () => {
  it('encodes and preserves the search query', () => {
    expect(buildSearchUrl('scripture growth')).toBe('/search?q=scripture%20growth')
  })
})
