import { describe, expect, it } from 'vitest'

import { createHomepageContent } from '@/lib/homepage-content'

describe('createHomepageContent', () => {
  it('uses curated content when it is present', () => {
    const content = createHomepageContent({
      leadStory: {
        category: 'Curated',
        excerpt: 'Curated excerpt',
        slug: 'curated-lead',
        title: 'Curated lead story',
        time: '5 min read',
      },
      modules: {
        series: {
          body: 'Curated series body',
          eyebrow: 'Series',
          href: '#series',
          key: 'series',
          title: 'Curated series module',
        },
      },
    })

    expect(content.leadStory.title).toBe('Curated lead story')
    expect(content.modules[0].title).toBe('Curated series module')
  })

  it('falls back to the latest content when curated content is missing', () => {
    const content = createHomepageContent({
      modules: {},
    })

    expect(content.leadStory.title).toBe('Pásztori teológia hétköznapi gyülekezeteknek')
    expect(content.modules).toHaveLength(4)
    expect(content.modules[1].title).toBe('Ige a mai napra')
  })
})
