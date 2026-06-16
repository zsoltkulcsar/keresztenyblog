import { describe, expect, it } from 'vitest'

import {
  buildSeriesUrl,
  createSeriesOverview,
  listSeries,
  listSeriesAudiences,
  listSeriesTopics,
} from '@/lib/series'

describe('series helpers', () => {
  it('lists published series in a stable order', () => {
    const series = listSeries()

    expect(series).toHaveLength(4)
    expect(series[0].title).toBe('Daily Rhythm')
    expect(series[series.length - 1].title).toBe('Shepherding the Church')
  })

  it('builds a series overview with ordered article parts', () => {
    const overview = createSeriesOverview('foundations')

    expect(overview).not.toBeNull()
    expect(overview?.articles).toHaveLength(3)
    expect(overview?.articles[0].order).toBe(1)
    expect(overview?.articles[0].article.slug).toBe('scripture-shapes-christian-growth')
    expect(overview?.articles[2].article.slug).toBe('the-slow-work-of-grace')
  })

  it('exposes topic and audience filters for the archive', () => {
    expect(listSeriesTopics()).toEqual(['christian-life', 'marriage', 'pastoral-theology'])
    expect(listSeriesAudiences()).toEqual(['new-believer', 'growing-believer', 'leader'])
  })

  it('builds stable series urls', () => {
    expect(buildSeriesUrl('home-and-covenant')).toBe('/series/home-and-covenant')
  })
})
