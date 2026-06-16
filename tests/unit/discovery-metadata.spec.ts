import { describe, expect, it } from 'vitest'

import {
  buildDiscoveryMetadata,
  buildRedirectManifest,
  buildRobots,
  buildRssXml,
  buildSitemap,
} from '@/lib/discovery-metadata'

describe('discovery metadata', () => {
  it('builds page metadata with a canonical url and social preview data', () => {
    const metadata = buildDiscoveryMetadata({
      description: 'Browse the archive.',
      path: '/articles?category=marriage',
      title: 'Articles',
    })

    expect(metadata.title).toBe('Articles | Kovasz')
    expect(metadata.alternates?.canonical).toBe('http://localhost:3000/articles?category=marriage')
    expect(metadata.openGraph?.url).toBe('http://localhost:3000/articles?category=marriage')
  })

  it('builds sitemap, robots, rss, and redirect outputs', () => {
    const sitemap = buildSitemap()
    const robots = buildRobots()
    const rss = buildRssXml()
    const redirects = buildRedirectManifest()

    expect(sitemap).toHaveLength(14)
    expect(sitemap.some((entry) => entry.url.endsWith('/series/foundations'))).toBe(true)
    expect(sitemap.some((entry) => entry.url.endsWith('/napi-ige/2026-06-16'))).toBe(true)
    expect(robots.sitemap).toBe('http://localhost:3000/sitemap.xml')
    expect(rss).toContain('<rss version="2.0">')
    expect(rss).toContain('<channel>')
    expect(redirects).toHaveLength(3)
    expect(redirects[0]).toMatchObject({
      destination: '/',
      permanent: true,
      source: '/home',
    })
  })
})
