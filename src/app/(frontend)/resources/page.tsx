import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { buildResourceUrl, loadResourceItems, type ResourceItem, type ResourceType } from '@/lib/resources'

const typeLabels: Record<ResourceType, string> = {
  article: 'Article',
  book: 'Book',
  file: 'File',
  'leader-tool': 'Leader tool',
  link: 'Link',
  'reading-plan': 'Reading plan',
  series: 'Series',
  'study-guide': 'Study guide',
}

const typeOrder: ResourceType[] = [
  'study-guide',
  'reading-plan',
  'leader-tool',
  'series',
  'file',
  'book',
  'article',
  'link',
]

function typeLabel(value: string) {
  return typeLabels[value as ResourceType] ?? value
}

function filterUrl(type?: string) {
  return type ? `/resources?type=${encodeURIComponent(type)}` : '/resources'
}

function activeType(searchParams?: Record<string, string | string[] | undefined>) {
  const value = searchParams?.type
  return Array.isArray(value) ? value[0] : value
}

function groupByType(resources: ResourceItem[]) {
  const groups = new Map<ResourceType, ResourceItem[]>()

  for (const resource of resources) {
    const existing = groups.get(resource.type) ?? []
    groups.set(resource.type, [...existing, resource])
  }

  return Array.from(groups.entries()).sort(([first], [second]) => {
    const firstIndex = typeOrder.indexOf(first)
    const secondIndex = typeOrder.indexOf(second)
    return (firstIndex === -1 ? 99 : firstIndex) - (secondIndex === -1 ? 99 : secondIndex)
  })
}

function findByAudience(resources: ResourceItem[], keyword: string) {
  return resources.find((resource) => resource.audience?.toLowerCase().includes(keyword))
}

function ResourceAction({ resource }: { resource: ResourceItem }) {
  return (
    <Link className="toolbox-card-link" href={buildResourceUrl(resource.slug)}>
      {resource.ctaLabel ?? 'Open resource'}
    </Link>
  )
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: 'Study aids, books, and other practical resources for readers of Kovasz.',
    path: '/resources',
    title: 'Resources',
  })
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const selectedType = activeType(resolvedSearchParams)
  const allResources = await loadResourceItems()
  const visibleResources = selectedType
    ? allResources.filter((resource) => resource.type === selectedType)
    : allResources
  const featuredResource = allResources.find((resource) => resource.featured) ?? allResources[0]
  const newBelieverResource = findByAudience(allResources, 'new') ?? allResources[0]
  const leaderResource = findByAudience(allResources, 'leader') ?? allResources.find((resource) => resource.type === 'leader-tool')
  const familyResource = findByAudience(allResources, 'famil') ?? allResources.find((resource) => resource.topic === 'Family')
  const groupedResources = groupByType(visibleResources)
  const availableTypes = groupByType(allResources).map(([type]) => type)

  return (
    <main className="resources-toolbox-page">
      <header className="toolbox-header">
        <div>
          <p className="eyebrow">Resources</p>
          <h1>Study library and practical tools</h1>
        </div>
        <div className="toolbox-header-note">
          <span>{allResources.length} resources</span>
          <p>Choose by need, then use the resource with Scripture open.</p>
        </div>
      </header>

      <section className="toolbox-start">
        <article className="toolbox-feature">
          <div className="toolbox-feature-marker">
            <span>Start</span>
          </div>
          <div>
            <p className="eyebrow">Start here</p>
            <h2>{featuredResource.title}</h2>
            <p>{featuredResource.description}</p>
            <div className="toolbox-tags">
              <span>{typeLabel(featuredResource.type)}</span>
              <span>{featuredResource.audience ?? 'All readers'}</span>
              <span>{featuredResource.topic ?? 'Study'}</span>
            </div>
            <ResourceAction resource={featuredResource} />
          </div>
        </article>

        <div className="toolbox-need-panel" aria-label="Resource routes by need">
          <p className="eyebrow">Find by need</p>
          <div className="toolbox-need-grid">
            {newBelieverResource ? (
              <Link href={buildResourceUrl(newBelieverResource.slug)}>
                <span>New in faith</span>
                <strong>{newBelieverResource.title}</strong>
              </Link>
            ) : null}
            {leaderResource ? (
              <Link href={buildResourceUrl(leaderResource.slug)}>
                <span>Leader support</span>
                <strong>{leaderResource.title}</strong>
              </Link>
            ) : null}
            {familyResource ? (
              <Link href={buildResourceUrl(familyResource.slug)}>
                <span>Family rhythm</span>
                <strong>{familyResource.title}</strong>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="toolbox-controls" aria-label="Resource type filters">
        <div>
          <p className="eyebrow">Type</p>
          <h2>Library shelves</h2>
        </div>
        <nav className="toolbox-filter-tabs">
          <Link aria-current={!selectedType ? 'page' : undefined} href={filterUrl()}>
            All
          </Link>
          {availableTypes.map((type) => (
            <Link aria-current={selectedType === type ? 'page' : undefined} href={filterUrl(type)} key={type}>
              {typeLabel(type)}
            </Link>
          ))}
        </nav>
      </section>

      <section className="toolbox-library" aria-label="Resource library shelves">
        {groupedResources.map(([type, resources]) => (
          <section className="toolbox-shelf" key={type}>
            <div className="toolbox-shelf-heading">
              <div>
                <p className="eyebrow">{typeLabel(type)}</p>
                <h2>{resources.length} useful {resources.length === 1 ? 'resource' : 'resources'}</h2>
              </div>
              <Link href={filterUrl(type)}>Filter shelf</Link>
            </div>

            <div className="toolbox-shelf-list">
              {resources.map((resource) => (
                <article className="toolbox-resource-row" key={resource.slug}>
                  <div className="toolbox-resource-type">
                    <span>{typeLabel(resource.type)}</span>
                    <small>{resource.format ?? resource.topic ?? 'Resource'}</small>
                  </div>
                  <div className="toolbox-resource-main">
                    <h3>{resource.title}</h3>
                    <p>{resource.usefulness}</p>
                    <div className="toolbox-tags">
                      <span>{resource.audience ?? 'All readers'}</span>
                      <span>{resource.topic ?? 'Study'}</span>
                    </div>
                  </div>
                  <ResourceAction resource={resource} />
                </article>
              ))}
            </div>
          </section>
        ))}

        {!groupedResources.length ? (
          <div className="toolbox-empty">
            <h2>No resources found</h2>
            <p>Reset the type filter to return to the full study library.</p>
            <Link className="toolbox-card-link" href="/resources">
              Reset filters
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  )
}
