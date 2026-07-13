import Link from 'next/link'

import { buildDiscoveryMetadata } from '@/lib/discovery-metadata'
import { getTranslations, translateResourceLabel } from '@/lib/i18n'
import {
  buildResourceUrl,
  loadResourceItems,
  type ResourceItem,
  type ResourceType,
} from '@/lib/resources'

export const dynamic = 'force-dynamic'

const t = getTranslations()

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

const defaultShelfTypes: ResourceType[] = ['study-guide', 'reading-plan', 'leader-tool']
const defaultShelfLimit = 2

function typeLabel(value: string) {
  return t.resources.typeLabels[value as ResourceType] ?? value
}

function resourceMetaLabel(value: string | undefined, fallback: string) {
  return value ? translateResourceLabel(value) : fallback
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
      {resource.ctaLabel ?? t.resources.openResource}
    </Link>
  )
}

export function generateMetadata() {
  return buildDiscoveryMetadata({
    description: t.resources.description,
    path: '/resources',
    title: t.resources.title,
  })
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
  const selectedType = activeType(resolvedSearchParams)
  const allResources = await loadResourceItems()
  const visibleResources = selectedType
    ? allResources.filter((resource) => resource.type === selectedType)
    : allResources
  const featuredResource = allResources.find((resource) => resource.featured) ?? allResources[0]
  const newBelieverResource = findByAudience(allResources, 'new') ?? allResources[0]
  const leaderResource =
    findByAudience(allResources, 'leader') ??
    allResources.find((resource) => resource.type === 'leader-tool')
  const familyResource =
    findByAudience(allResources, 'famil') ??
    allResources.find((resource) => resource.topic === 'Család' || resource.topic === 'Family')
  const groupedResources = groupByType(visibleResources)
  const libraryShelves = selectedType
    ? groupedResources
    : groupedResources
        .filter(([type]) => defaultShelfTypes.includes(type))
        .map(([type, resources]) => [type, resources.slice(0, defaultShelfLimit)] as const)
  const availableTypes = groupByType(allResources).map(([type]) => type)

  return (
    <main className="resources-toolbox-page">
      <header className="toolbox-header">
        <div>
          <p className="eyebrow">{t.resources.headerEyebrow}</p>
          <h1>{t.resources.headerTitle}</h1>
        </div>
        <div className="toolbox-header-note">
          <span>
            {allResources.length} {t.resources.resourcesCount}
          </span>
          <p>{t.resources.headerBody}</p>
        </div>
      </header>

      <section className="toolbox-start">
        <article className="toolbox-feature">
          <div className="toolbox-feature-marker">
            <span>{t.resources.start}</span>
          </div>
          <div>
            <p className="eyebrow">{t.resources.startHere}</p>
            <h2>{featuredResource.title}</h2>
            <p>{featuredResource.description}</p>
            <div className="toolbox-tags">
              <span>{typeLabel(featuredResource.type)}</span>
              <span>
                {resourceMetaLabel(featuredResource.audience, t.resources.featuredFallbackAudience)}
              </span>
              <span>{resourceMetaLabel(featuredResource.topic, t.resources.featuredFallbackTopic)}</span>
            </div>
            <ResourceAction resource={featuredResource} />
          </div>
        </article>

        <div className="toolbox-need-panel" aria-label="Resource routes by need">
          <p className="eyebrow">{t.resources.findByNeed}</p>
          <div className="toolbox-need-grid">
            {newBelieverResource ? (
              <Link href={buildResourceUrl(newBelieverResource.slug)}>
                <span>{t.resources.newInFaith}</span>
                <strong>{newBelieverResource.title}</strong>
              </Link>
            ) : null}
            {leaderResource ? (
              <Link href={buildResourceUrl(leaderResource.slug)}>
                <span>{t.resources.leaderSupport}</span>
                <strong>{leaderResource.title}</strong>
              </Link>
            ) : null}
            {familyResource ? (
              <Link href={buildResourceUrl(familyResource.slug)}>
                <span>{t.resources.familyRhythm}</span>
                <strong>{familyResource.title}</strong>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="toolbox-controls" aria-label="Resource type filters">
        <div>
          <p className="eyebrow">{t.resources.type}</p>
          <h2>
            {selectedType
              ? `${typeLabel(selectedType)} ${t.resources.shelfSuffix}`
              : t.resources.filterTitleAll}
          </h2>
          <p className="toolbox-controls-note">
            {selectedType
              ? t.resources.filterNoteSelected
              : t.resources.filterNoteAll}
          </p>
        </div>
        <nav className="toolbox-filter-tabs">
          <Link aria-current={!selectedType ? 'page' : undefined} href={filterUrl()}>
            {t.resources.all}
          </Link>
          {availableTypes.map((type) => (
            <Link
              aria-current={selectedType === type ? 'page' : undefined}
              href={filterUrl(type)}
              key={type}
            >
              {typeLabel(type)}
            </Link>
          ))}
        </nav>
      </section>

      <section className="toolbox-library" aria-label="Resource library shelves">
        {libraryShelves.map(([type, resources]) => (
          <section className="toolbox-shelf" key={type}>
            <div className="toolbox-shelf-heading">
              <div>
                <p className="eyebrow">{typeLabel(type)}</p>
                <h2>
                  {resources.length}{' '}
                  {resources.length === 1
                    ? t.resources.resourceSingular
                    : t.resources.resourcePlural}
                </h2>
              </div>
              {!selectedType ? <Link href={filterUrl(type)}>{t.resources.viewFullShelf}</Link> : null}
            </div>

            <div className="toolbox-shelf-list">
              {resources.map((resource) => (
                <article className="toolbox-resource-row" key={resource.slug}>
                  <div className="toolbox-resource-type">
                    <span>{typeLabel(resource.type)}</span>
                    <small>
                      {resourceMetaLabel(
                        resource.format ?? resource.topic,
                        t.resources.featuredFallbackTopic,
                      )}
                    </small>
                  </div>
                  <div className="toolbox-resource-main">
                    <h3>{resource.title}</h3>
                    <p>{resource.usefulness}</p>
                    <div className="toolbox-tags">
                      <span>{resourceMetaLabel(resource.audience, t.resources.allReaders)}</span>
                      <span>{resourceMetaLabel(resource.topic, t.resources.featuredFallbackTopic)}</span>
                    </div>
                  </div>
                  <ResourceAction resource={resource} />
                </article>
              ))}
            </div>
          </section>
        ))}

        {!libraryShelves.length ? (
          <div className="toolbox-empty">
            <h2>{t.resources.emptyTitle}</h2>
            <p>{t.resources.emptyBody}</p>
            <Link className="toolbox-card-link" href="/resources">
              {t.resources.emptyReset}
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  )
}
