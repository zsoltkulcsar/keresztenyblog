import type { Metadata } from 'next'
import type { MetadataRoute } from 'next'

import { createArchiveContent } from '@/lib/article-archive'
import { listDailyVerseEntries } from '@/lib/daily-verse'
import { listSeries } from '@/lib/series'

export type DiscoveryMetadataInput = {
  description: string
  noIndex?: boolean
  path: string
  title: string
  type?: 'article' | 'website'
}

export type RedirectManifestEntry = {
  destination: string
  permanent: boolean
  source: string
}

type DiscoveryRoute = {
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  path: string
  priority: number
}

type RssItem = {
  description: string
  link: string
  pubDate: string
  title: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000'
const siteName = 'Kovasz'
const siteDescription = 'Kovasz is a Hungarian Christian publication for articles, series, and study resources.'

const discoveryRoutes: DiscoveryRoute[] = [
  { changeFrequency: 'weekly', path: '/', priority: 1 },
  { changeFrequency: 'daily', path: '/articles', priority: 0.9 },
  { changeFrequency: 'daily', path: '/search', priority: 0.5 },
  { changeFrequency: 'weekly', path: '/series', priority: 0.8 },
  { changeFrequency: 'daily', path: '/napi-ige', priority: 0.8 },
  { changeFrequency: 'monthly', path: '/resources', priority: 0.6 },
  { changeFrequency: 'monthly', path: '/about', priority: 0.4 },
]

const redirectManifest: RedirectManifestEntry[] = [
  { destination: '/', permanent: true, source: '/home' },
  { destination: '/articles', permanent: true, source: '/archive' },
  { destination: '/search', permanent: true, source: '/discover' },
]

function buildAbsoluteUrl(path: string, searchParams?: Record<string, string | number | undefined>) {
  const url = new URL(path, siteUrl)

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined || value === '') continue
      url.searchParams.set(key, String(value))
    }
  }

  return url.toString()
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function getLatestPublishedDate() {
  const archive = createArchiveContent()
  return archive.articles[0]?.publishedAt ?? '2026-06-14'
}

function buildRssItems(): RssItem[] {
  const archive = createArchiveContent()

  return archive.articles.slice(0, 4).map((article) => ({
    description: article.excerpt,
    link: buildAbsoluteUrl('/articles', { category: article.category.value, series: article.series.value }),
    pubDate: new Date(`${article.publishedAt}T00:00:00Z`).toUTCString(),
    title: article.title,
  }))
}

export function buildDiscoveryMetadata(input: DiscoveryMetadataInput): Metadata {
  const canonicalUrl = buildAbsoluteUrl(input.path)
  const title = input.title === siteName ? siteName : `${input.title} | ${siteName}`

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description: input.description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      description: input.description,
      images: [
        {
          alt: siteName,
          url: buildAbsoluteUrl('/home-hero.png'),
        },
      ],
      siteName,
      title,
      type: input.type ?? 'website',
      url: canonicalUrl,
    },
    robots: input.noIndex
      ? {
          follow: false,
          index: false,
        }
      : {
          follow: true,
          index: true,
        },
    title: input.title === siteName ? { absolute: siteName } : title,
    twitter: {
      card: 'summary_large_image',
      description: input.description,
      title,
    },
  }
}

export function buildSitemap(): MetadataRoute.Sitemap {
  const latestPublishedDate = new Date(`${getLatestPublishedDate()}T00:00:00Z`)
  const seriesRoutes = listSeries().map((series) => ({
    changeFrequency: 'weekly' as const,
    lastModified: latestPublishedDate,
    priority: 0.7,
    url: buildAbsoluteUrl(`/series/${series.slug}`),
  }))
  const dailyVerseRoutes = listDailyVerseEntries().map((entry) => ({
    changeFrequency: 'daily' as const,
    lastModified: new Date(`${entry.date}T00:00:00Z`),
    priority: 0.6,
    url: buildAbsoluteUrl(`/napi-ige/${entry.slug}`),
  }))

  return [
    ...discoveryRoutes.map((route) => ({
      changeFrequency: route.changeFrequency,
      lastModified: latestPublishedDate,
      priority: route.priority,
      url: buildAbsoluteUrl(route.path),
    })),
    ...seriesRoutes,
    ...dailyVerseRoutes,
  ]
}

export function buildRobots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        allow: '/',
        userAgent: '*',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: buildAbsoluteUrl('/sitemap.xml'),
  }
}

export function buildRssXml() {
  const items = buildRssItems()
  const updated = new Date(`${getLatestPublishedDate()}T00:00:00Z`).toUTCString()
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `<title>${escapeXml(siteName)}</title>`,
    `<link>${escapeXml(buildAbsoluteUrl('/'))}</link>`,
    `<description>${escapeXml(siteDescription)}</description>`,
    `<lastBuildDate>${escapeXml(updated)}</lastBuildDate>`,
    ...items.flatMap((item) => [
      '<item>',
      `<title>${escapeXml(item.title)}</title>`,
      `<link>${escapeXml(item.link)}</link>`,
      `<guid isPermaLink="true">${escapeXml(item.link)}</guid>`,
      `<description>${escapeXml(item.description)}</description>`,
      `<pubDate>${escapeXml(item.pubDate)}</pubDate>`,
      '</item>',
    ]),
    '</channel>',
    '</rss>',
  ]

  return lines.join('')
}

export function buildRedirectManifest(): RedirectManifestEntry[] {
  return redirectManifest
}

export function buildDiscoveryUrl(path: string, searchParams?: Record<string, string | number | undefined>) {
  return buildAbsoluteUrl(path, searchParams)
}
