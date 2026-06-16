import type { MetadataRoute } from 'next'

import { buildSitemap } from '@/lib/discovery-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap()
}
