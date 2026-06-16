import type { MetadataRoute } from 'next'

import { buildRobots } from '@/lib/discovery-metadata'

export default function robots(): MetadataRoute.Robots {
  return buildRobots()
}
