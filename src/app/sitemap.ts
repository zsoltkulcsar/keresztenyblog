import type { MetadataRoute } from 'next'

import { buildSitemap } from '@/lib/discovery-metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemap()
}
