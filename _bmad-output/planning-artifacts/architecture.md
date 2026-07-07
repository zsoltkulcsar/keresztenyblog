---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
starter_evaluation: 'create-payload-app'
decisions:
  - database: PostgreSQL
inputDocuments:
  - kovasz-prd.md
  - kovasz-ux-design.md
  - kovasz-screen-by-screen-prototype-spec.md
  - kovasz-design-handoff.md
  - kovasz-implementation-design-brief.md
workflowType: architecture
project_name: bbb
user_name: Zsolt.kulcsar
date: 2026-06-16
lastStep: 8
status: complete
completedAt: 2026-06-16
---

# Architecture Decision Document

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Kovasz has 20 functional requirements spanning homepage curation, archive/search, article reading, series, Daily Verse, resources, authors/about, admin auth and publishing, SEO/syndication, and newsletter capture.

Architecturally, this means the system needs:

- a public editorial website with multiple content-driven routes
- a scripture-first article rendering model
- series as a first-class content structure
- CMS-managed articles, series, authors, resources, daily verse, and media
- real admin authentication and publishing workflow
- route-level metadata, RSS, sitemap, and redirects
- support for translated content as a first-class publishing flow

**Non-Functional Requirements:**
The PRD defines a strong set of quality constraints:

- server-rendered or statically generated public pages
- strong Core Web Vitals for long-form reading
- WCAG 2.2 AA accessibility
- secure admin access with role-based controls
- stable public URLs with redirect support
- observability and analytics with minimal privacy impact
- routine backups and recoverability
- maintainable typed code with validation and tests

These constraints push the architecture toward a content-first web stack with strong routing, metadata, access control, preview, and media support.

**Scale & Complexity:**
This is a high-complexity, content-heavy full-stack publication.

- Primary domain: web publication / CMS-backed editorial platform
- Complexity level: high
- Estimated architectural components: 8-10

The main complexity drivers are:

- article, series, and resource relationships
- scripture-first rich content rendering
- translations and source metadata
- admin/editor workflow
- future moderation and user posting
- SEO, metadata, RSS, sitemap, redirects
- performance and accessibility expectations for long-form reading

### Technical Constraints & Dependencies

- The current direction favors `Next.js App Router` plus a CMS rather than a custom backend from scratch.
- The CMS must support admin UI, auth, roles, collections, preview, uploads, and publication workflow.
- PostgreSQL is the committed production persistence layer.
- Media storage needs an object-storage or upload-backed plan.
- Search can start database-backed and stay abstracted for future upgrade.
- Translated content from Desiring God and The Gospel Coalition is allowed and should be modeled clearly in the CMS.
- The site needs route-level metadata, RSS, sitemap, and redirect support from the start.
- Future moderation/user-posting should be anticipated in the architecture, even if not in MVP.

### Cross-Cutting Concerns Identified

- SEO and syndication
- content modeling and editorial workflow
- scripture-first rich text rendering
- access control and auth
- translation source tracking
- future moderation and user posting
- media handling and image optimization
- accessibility across public and admin surfaces
- performance for long-form reading
- stable URLs and redirects
- observability and backups

## Notes

The separate draft file at `kovasz-architecture.md` contains the more opinionated architecture direction that will be reconciled during the decision steps. This document is the canonical workflow artifact.

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web publication backed by a CMS.

### Starter Options Considered

`create-payload-app` is the best fit for Kovasz because it establishes the editor/admin, auth, access control, preview, media, and database foundation in one TypeScript codebase. It is better aligned with the project than a blank Next.js app because the project is CMS-heavy and editorially complex.

`create-next-app` would be the alternate path if we wanted to build a fully custom CMS integration by hand, but that would add avoidable implementation work.

### Selected Starter: `create-payload-app`

**Rationale for Selection:**
This project needs a CMS-first foundation. Payload provides the admin panel, collections, auth, preview, file storage, and API layer that Kovasz needs immediately.

**Initialization Command:**

```bash
npx create-payload-app
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript in a Next.js-based full-stack web application.

**Styling Solution:**
Not fully prescribed by the starter; we will layer the Kovasz editorial design system on top.

**Build Tooling:**
Next.js App Router project structure with Payload integration.

**Testing Framework:**
Not a complete opinionated test stack; we will add the project’s tests explicitly.

**Code Organization:**
Payload expects its app structure inside Next.js `/app`, with `(payload)` and application route groups.

**Development Experience:**
Live preview, admin panel, REST/GraphQL APIs, auth, and access control are built in; that reduces custom infrastructure work substantially.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- Production database is PostgreSQL.
- The application uses Next.js App Router plus Payload CMS.
- The CMS owns content, auth, preview, media, and access control.

**Important Decisions (Shape Architecture):**

- The content model is relational: articles, series, authors, resources, daily verse, tags, and translation sources.
- Search starts database-backed and remains abstracted for future replacement.
- Translated content is a first-class publishing flow with source metadata.
- Public pages are server-rendered or statically generated where appropriate.

**Deferred Decisions (Post-MVP):**

- user posting
- comment moderation workflow
- blocking / approving users
- external search engine integration
- any dedicated moderation queue UI

### Data Architecture

- Database: PostgreSQL
- Adapter: `@payloadcms/db-postgres`
- Content model: relational and CMS-managed
- Validation: enforce required editorial fields at the CMS layer and in application rendering
- Migration approach: schema migrations through the CMS/project migration tooling
- Caching strategy: server rendering plus route revalidation for published content

### Authentication & Security

- Authentication method: Payload auth with the default auth-enabled User collection for admin access
- Authorization pattern: collection/global/field access control in Payload, with role-based permissions for Admin and Editor
- Session strategy: secure auth cookies for admin sessions, with JWT/API key options available if later needed
- Public content access: unauthenticated public reads, authenticated writes and admin operations only
- Preview access: restricted preview routes for authenticated editorial users
- Security posture: keep secrets in environment variables and avoid custom auth unless later needed
- Moderation groundwork: keep access control and admin visibility flexible so future comment/user-posting moderation can be added cleanly

### API & Communication Patterns

- Primary API layer: Payload’s REST and GraphQL APIs plus local APIs for app integration
- Route handlers: Next.js route handlers for sitemap, RSS, robots, and metadata-related outputs
- Error handling: route-level not-found and error states for public content, inline validation for editor forms
- Rate limiting: defer unless abuse pressure appears

### Frontend Architecture

- Routing: Next.js App Router
- Rendering: server components by default for public pages, client components only for interactive filters, search, and admin controls
- Component model: server-first public pages with client components only where interaction demands it
- State management: local component state and URL state first; avoid global state until needed
- Performance: lean pages, route-level data fetching, careful image handling, and unobtrusive progress indicators

### Infrastructure & Deployment

- Hosting strategy: deployment-ready Next.js app with CMS and PostgreSQL
- Environment configuration: standard `.env` / deployment secrets
- Monitoring and logging: add error tracking and basic analytics before launch
- Scaling strategy: start as a single app plus managed Postgres and object storage, then split services only if needed

### Decision Impact Analysis

**Implementation Sequence:**

1. initialize the Payload/Next.js starter
2. define content collections and relationships
3. wire auth and access control
4. implement public routes and metadata
5. implement admin dashboard/editor
6. add search, sitemap, RSS, and redirects
7. add tests and production readiness checks

**Cross-Component Dependencies:**

- PostgreSQL influences collection design, relationships, migration strategy, and search.
- Payload auth influences admin UI, preview, and moderation groundwork.
- Next.js App Router influences public routing, metadata, RSS, and sitemap generation.
- Translation source modeling affects article schema, editor fields, and public article rendering.

## Starter Template and Technology Foundation

### Starter Choice

`create-payload-app`

### Why This Starter

The project is CMS-heavy and editorially complex. Payload gives the admin panel, auth, access control, preview, media, and database foundation in one TypeScript codebase. That is a stronger base than a blank Next.js app with manual CMS wiring.

### Initialization Command

```bash
npx create-payload-app
```

### Foundation Decisions Implied by the Starter

- Next.js App Router structure
- Payload CMS integrated into the same codebase
- TypeScript as the primary language
- Payload auth and access control available from the start
- live preview / editorial workflow support
- REST and GraphQL APIs available without custom scaffolding
- route groups and app structure expected in `/app`

### Version Notes

- Next.js documentation currently lists App Router installation docs at version 16.2.2.
- Payload installation docs currently require Next.js `16.2.6+` and Node.js `20.9.0+`.
- Payload docs explicitly support Postgres through `@payloadcms/db-postgres`.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
11 areas where AI agents could make different choices

### Naming Patterns

**Database Naming Conventions:**
- Payload collection slugs use lowercase singular nouns: `article`, `series`, `author`, `resource`, `dailyVerse`, `translationSource`, `category`, `tag`, `user`
- TypeScript field names and config keys use `camelCase`
- Route segments use lowercase kebab-case plural URLs: `/articles`, `/series`, `/daily-verse`, `/resources`, `/authors`
- Database-derived relation fields keep the semantic name, not technical prefixes: `author`, `series`, `tags`, `scriptureReferences`
- Index and migration names use lowercase snake_case with a stable prefix: `articles_slug_idx`, `series_order_idx`

**API Naming Conventions:**
- Route handlers are named by route purpose, not by HTTP verb in the filename
- Public JSON endpoints use plural resource names where possible: `/api/articles`, `/api/series`
- Query params use `camelCase` in the app layer: `searchQuery`, `seriesSlug`, `authorSlug`
- Route params use `slug` for editorial content and `id` only for internal admin or lookup operations
- Headers and low-level protocol names stay standards-based; no custom header naming unless necessary

**Code Naming Conventions:**
- React components use `PascalCase`: `ArticleCard`, `SeriesFilterBar`, `AdminDashboard`
- Hooks use `useCamelCase`: `useReadingProgress`, `useArticleSearch`
- Functions use `camelCase`: `formatScriptureReference`, `buildArticleMetadata`
- Files for components use `PascalCase.tsx` when they export a single component
- Feature modules use lowercase folder names: `articles`, `series`, `resources`, `admin`
- Route folders use Next.js conventions and remain lowercase/kebab-case where user-facing

### Structure Patterns

**Project Organization:**
- Public routes live in the Next.js App Router under route groups
- Payload configuration and collection definitions live at project root or a clearly named config area
- Shared UI components live separately from route-specific components
- Feature-specific logic stays near the feature, not in a global utility bucket
- Server-only helpers are separated from client-safe helpers

**File Structure Patterns:**
- `app/` contains route groups, layouts, pages, and route handlers
- `src/components/` contains reusable UI components
- `src/features/` contains feature-oriented code such as article rendering, series navigation, search, and admin tools
- `src/lib/server/` contains server-only helpers, data access, and CMS integration
- `src/lib/shared/` contains pure utilities that can run on server or client
- `public/` contains static assets only
- `tests/` or `playwright/` contains E2E coverage; unit tests stay co-located or in a nearby `__tests__` folder

### Format Patterns

**API Response Formats:**
- Route handlers use a consistent JSON wrapper: `{ data, error, meta }`
- Errors use `{ error: { code, message, details? } }`
- Success responses include `meta` only when pagination or context matters
- Public content rendering in server components should prefer typed domain objects over ad hoc response wrappers

**Data Exchange Formats:**
- JSON field names use `camelCase`
- Dates use ISO 8601 strings
- Booleans use `true` / `false`
- Empty optional fields are `null`, not empty strings
- Single-related entities are objects or references; lists are arrays
- Translated content includes explicit source metadata fields: `originalTitle`, `originalAuthor`, `originalUrl`, `translationNote`

### Communication Patterns

**Event System Patterns:**
- No app-wide event bus unless introduced later
- Component callbacks use `onX` naming: `onSearch`, `onPublish`, `onFilterChange`
- Derived UI actions use `handleX` naming in component bodies
- Any future content events should be noun-based past tense: `articlePublished`, `seriesUpdated`, `resourceLinked`

**State Management Patterns:**
- Local component state first
- URL state for filters, search, and pagination
- Server state fetched on the server where possible
- Use `isLoading`, `isSaving`, `isPublishing`, `isPreviewing` for async state
- Use immutable updates only; no direct mutation of shared state objects

### Process Patterns

**Error Handling Patterns:**
- Validation errors stay inline near the field that caused them
- Non-blocking system messages may use toast or banner
- Missing content returns a proper not-found state, not a blank page
- Failed save/publish actions preserve editor input
- Retry actions must be idempotent or guarded against double submission
- Public errors should be readable, short, and non-technical

**Loading State Patterns:**
- Use skeletons for page-level loading
- Use button spinners for local actions
- Keep reading pages stable while loading related content
- Search/filter states should not reset scroll unless explicitly intended
- Loading state names must be consistent across the app: `isLoading`, `isSubmitting`, `isSaving`, `isPublishing`

### Enforcement Guidelines

**All AI Agents MUST:**
- Use the same content model names, route names, and field naming conventions
- Keep server-only logic out of client components
- Preserve camelCase in TypeScript and JSON, kebab-case in public URLs
- Use the same async state and error patterns across features
- Treat translations, series ordering, and scripture references as first-class model concerns

**Pattern Enforcement:**
- Verify new code against these rules during review
- Record any violation in the architecture decision log
- Update patterns only when a real conflict appears across multiple files or agents

### Pattern Examples

**Good Examples:**
- `ArticleCard.tsx`
- `/articles/[slug]`
- `isPublishing`
- `{ error: { code: 'VALIDATION_ERROR', message: 'Title is required.' } }`
- `translationSource.originalUrl`
- `onFilterChange`
- `useReadingProgress`

**Anti-Patterns:**
- `article-card.tsx` exporting multiple unrelated components
- `/article/[id]` for public editorial content
- snake_case JSON in the app layer
- mixing server-only DB calls inside client components
- inconsistent loading names like `loadingState`, `saving`, `pendingSave`
- one-off response shapes that differ by route

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
bbb/
├── README.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts
├── components.json
├── .env.example
├── .env.local
├── .gitignore
├── .nvmrc
├── .editorconfig
├── .prettierignore
├── .prettierrc.json
├── payload.config.ts
├── payload-types.ts
├── middleware.ts
├── next-env.d.ts
├── vitest.config.ts
├── playwright.config.ts
├── docker-compose.yml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── e2e.yml
│       └── deploy.yml
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── icons/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── articles/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [slug]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── not-found.tsx
│   │   │   ├── series/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [slug]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── not-found.tsx
│   │   │   ├── napi-ige/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [date]/
│   │   │   │       └── page.tsx
│   │   │   ├── resources/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── authors/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── kereses/
│   │   │   │   └── page.tsx
│   │   │   ├── rss.xml/
│   │   │   │   └── route.ts
│   │   │   ├── sitemap.xml/
│   │   │   │   └── route.ts
│   │   │   ├── robots.txt/
│   │   │   │   └── route.ts
│   │   │   └── preview/
│   │   │       └── [slug]/
│   │   │           └── route.ts
│   │   ├── (payload)/
│   │   │   ├── admin/
│   │   │   │   └── [[...segments]]/
│   │   │   │       └── page.tsx
│   │   │   └── api/
│   │   │       ├── graphql/
│   │   │       │   └── route.ts
│   │   │       ├── graphql-playground/
│   │   │       │   └── route.ts
│   │   │       └── payload/
│   │   │           └── [api]/
│   │   │               └── route.ts
│   │   ├── api/
│   │   │   ├── search/
│   │   │   │   └── route.ts
│   │   │   ├── newsletter/
│   │   │   │   └── route.ts
│   │   │   └── revalidate/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Separator.tsx
│   │   │   └── Tooltip.tsx
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   ├── MainNav.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── PageShell.tsx
│   │   ├── features/
│   │   │   ├── article/
│   │   │   │   ├── ArticleCard.tsx
│   │   │   │   ├── ArticleHero.tsx
│   │   │   │   ├── ArticleBody.tsx
│   │   │   │   ├── ScriptureBlock.tsx
│   │   │   │   ├── StudyPanel.tsx
│   │   │   │   ├── ArticleMetadata.tsx
│   │   │   │   ├── RelatedArticles.tsx
│   │   │   │   └── ReadingProgress.tsx
│   │   │   ├── series/
│   │   │   │   ├── SeriesCard.tsx
│   │   │   │   ├── SeriesGrid.tsx
│   │   │   │   ├── SeriesFilterBar.tsx
│   │   │   │   ├── SeriesDetailHeader.tsx
│   │   │   │   └── SeriesPartList.tsx
│   │   │   ├── homepage/
│   │   │   │   ├── LeadStory.tsx
│   │   │   │   ├── LatestArticlesGrid.tsx
│   │   │   │   ├── FeaturedSeriesRail.tsx
│   │   │   │   ├── DailyVerseTeaser.tsx
│   │   │   │   └── ResourceHighlights.tsx
│   │   │   ├── search/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── SearchResults.tsx
│   │   │   │   └── SearchFilters.tsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── ContentList.tsx
│   │   │   │   ├── QuickCreateActions.tsx
│   │   │   │   ├── PublishQueue.tsx
│   │   │   │   └── ModerationPanel.tsx
│   │   │   └── resources/
│   │   │       ├── ResourceCard.tsx
│   │   │       └── ResourceGrid.tsx
│   │   ├── content/
│   │   │   ├── RichTextRenderer.tsx
│   │   │   ├── ImageBlock.tsx
│   │   │   ├── QuoteBlock.tsx
│   │   │   ├── CalloutBlock.tsx
│   │   │   └── ScriptureReference.tsx
│   │   └── forms/
│   │       ├── SearchForm.tsx
│   │       ├── NewsletterForm.tsx
│   │       └── AdminContentForm.tsx
│   ├── collections/
│   │   ├── Articles.ts
│   │   ├── Series.ts
│   │   ├── Authors.ts
│   │   ├── Resources.ts
│   │   ├── DailyVerse.ts
│   │   ├── Categories.ts
│   │   ├── Tags.ts
│   │   ├── Media.ts
│   │   ├── Redirects.ts
│   │   ├── NewsletterSignups.ts
│   │   ├── Users.ts
│   │   └── SiteSettings.ts
│   ├── globals/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   ├── Navigation.ts
│   │   ├── HomepageSettings.ts
│   │   └── EditorialSettings.ts
│   ├── payload/
│   │   ├── access/
│   │   │   ├── isAdmin.ts
│   │   │   ├── isEditor.ts
│   │   │   ├── isPublished.ts
│   │   │   └── canPreview.ts
│   │   ├── hooks/
│   │   │   ├── revalidatePublishedContent.ts
│   │   │   └── syncRedirects.ts
│   │   ├── fields/
│   │   │   ├── slug.ts
│   │   │   ├── seo.ts
│   │   │   ├── scriptureReferences.ts
│   │   │   ├── translationSource.ts
│   │   │   └── publicationStatus.ts
│   │   └── utils/
│   │       ├── collectionLabels.ts
│   │       └── formatPreviewUrl.ts
│   ├── lib/
│   │   ├── server/
│   │   │   ├── payload.ts
│   │   │   ├── db.ts
│   │   │   ├── auth.ts
│   │   │   ├── preview.ts
│   │   │   ├── search.ts
│   │   │   ├── metadata.ts
│   │   │   ├── rss.ts
│   │   │   ├── sitemap.ts
│   │   │   ├── redirects.ts
│   │   │   ├── media.ts
│   │   │   └── analytics.ts
│   │   ├── shared/
│   │   │   ├── constants.ts
│   │   │   ├── dates.ts
│   │   │   ├── readingTime.ts
│   │   │   ├── scripture.ts
│   │   │   ├── slug.ts
│   │   │   └── validation.ts
│   │   └── client/
│   │       ├── storage.ts
│   │       └── searchParams.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   └── theme.css
│   ├── types/
│   │   ├── payload.ts
│   │   ├── content.ts
│   │   └── navigation.ts
│   └── hooks/
│       ├── useReadingProgress.ts
│       ├── useSearchState.ts
│       └── useViewport.ts
├── tests/
│   ├── unit/
│   │   ├── readingTime.test.ts
│   │   ├── slug.test.ts
│   │   ├── scripture.test.ts
│   │   └── metadata.test.ts
│   ├── integration/
│   │   ├── articles.test.ts
│   │   ├── series.test.ts
│   │   ├── redirects.test.ts
│   │   └── search.test.ts
│   ├── e2e/
│   │   ├── homepage.spec.ts
│   │   ├── article.spec.ts
│   │   ├── series.spec.ts
│   │   ├── search.spec.ts
│   │   ├── admin-auth.spec.ts
│   │   └── publish-flow.spec.ts
│   ├── fixtures/
│   │   ├── articles.ts
│   │   ├── series.ts
│   │   ├── authors.ts
│   │   └── media.ts
│   └── mocks/
│       ├── payload.ts
│       └── server.ts
├── scripts/
│   ├── seed.ts
│   ├── migrate.ts
│   ├── generate-types.ts
│   └── import-translations.ts
└── types/
    └── global.d.ts
```

### Architectural Boundaries

**API Boundaries**

- Public read routes live in `src/app/(site)` and are server-rendered by default.
- Admin and CMS APIs live under `src/app/(payload)` and `payload.config.ts`.
- Route handlers in `src/app/api/*` are reserved for app-level concerns such as search, newsletter signup, and content revalidation.
- Payload collection access controls own all authenticated write boundaries.
- Preview access is isolated under `src/app/(site)/preview/[slug]/route.ts`.
- `src/lib/server/*` is the only layer allowed to call Payload/local APIs directly from app code.

**Component Boundaries**

- Server components are the default for all public pages.
- Client components are limited to filters, search interaction, reading progress, admin controls, and other user-driven state.
- Shared UI lives in `src/components/ui`.
- Feature components stay inside `src/components/features/<domain>`.
- Public page composition is done in route-level `page.tsx` files; feature components handle local presentation only.
- Admin UI does not leak into the public reader surface.

**Service Boundaries**

- Content retrieval, metadata building, search, RSS, and sitemap generation belong in `src/lib/server`.
- Validation and presentation helpers belong in `src/lib/shared`.
- Payload hooks handle publish-time side effects like revalidation and redirect syncing.
- External integrations stay behind thin wrappers in `src/lib/server` or collection hooks, not inside components.
- Translation import logic is isolated in `scripts/import-translations.ts` and related helpers.

**Data Boundaries**

- PostgreSQL is the single production source of truth.
- Payload collections define the authoritative schema for editorial content.
- `Articles`, `Series`, `Authors`, `Resources`, `DailyVerse`, `Categories`, `Tags`, `Redirects`, `NewsletterSignups`, `Users`, and `SiteSettings` are distinct data boundaries.
- Media lives in the `Media` collection and is treated separately from editorial content.
- Translation source metadata must stay attached to article records rather than being inferred later.
- Search can query the database directly for MVP, but the app should keep it abstracted so an external search service can be swapped in later.

### Requirements to Structure Mapping

**Feature/Epic Mapping**

**Epic 1: Foundation and Content Platform**
- Lives in: `payload.config.ts`, `src/collections/*`, `src/globals/*`, `src/payload/*`, `scripts/*`
- Shared components: `src/lib/server/payload.ts`, `src/lib/server/db.ts`, `src/lib/shared/validation.ts`
- Tests: `tests/unit/*`, `tests/integration/*`, `tests/e2e/admin-auth.spec.ts`

**Epic 2: Public Editorial Site**
- Lives in: `src/app/(site)`, `src/components/layout/*`, `src/components/features/home/*`, `src/components/features/search/*`
- Shared components: `SiteHeader`, `SiteFooter`, `PageShell`, `SearchBar`
- Tests: `tests/e2e/homepage.spec.ts`, `tests/e2e/search.spec.ts`

**Epic 3: Reading, Series, and Daily Verse**
- Lives in: `src/app/(site)/articles`, `src/app/(site)/series`, `src/app/(site)/napi-ige`, `src/components/features/article/*`, `src/components/features/series/*`
- Shared components: `RichTextRenderer`, `ScriptureBlock`, `StudyPanel`, `ReadingProgress`
- Tests: `tests/e2e/article.spec.ts`, `tests/e2e/series.spec.ts`, `tests/unit/scripture.test.ts`

**Epic 4: Admin Publishing Workflow**
- Lives in: `src/app/(payload)/admin`, `src/components/features/admin/*`, `src/collections/Users.ts`, `src/payload/access/*`
- Shared components: `AdminDashboard`, `ContentList`, `QuickCreateActions`, `ModerationPanel`
- Tests: `tests/e2e/admin-auth.spec.ts`, `tests/e2e/publish-flow.spec.ts`

**Epic 5: Discovery, SEO, and Launch Readiness**
- Lives in: `src/app/(site)/rss.xml`, `src/app/(site)/sitemap.xml`, `src/app/(site)/robots.txt`, `src/lib/server/metadata.ts`, `src/lib/server/rss.ts`, `src/lib/server/sitemap.ts`
- Shared components: `src/lib/server/redirects.ts`, `src/collections/Redirects.ts`
- Tests: `tests/unit/metadata.test.ts`, `tests/integration/redirects.test.ts`

**Cross-Cutting Concerns**

**Authentication System**
- Components: `src/app/(payload)/admin`, `src/payload/access/*`
- Services: `src/lib/server/auth.ts`
- Tests: `tests/e2e/admin-auth.spec.ts`

**Scripture Rendering**
- Components: `src/components/content/ScriptureReference.tsx`, `src/components/features/article/ScriptureBlock.tsx`
- Helpers: `src/lib/shared/scripture.ts`
- Collection fields: `src/payload/fields/scriptureReferences.ts`

**Translations**
- Components: article page and admin editor side panels
- Fields: `src/payload/fields/translationSource.ts`
- Import tooling: `scripts/import-translations.ts`

**SEO and Syndication**
- Components: route handlers for metadata outputs
- Services: `src/lib/server/metadata.ts`, `src/lib/server/rss.ts`, `src/lib/server/sitemap.ts`

**Search and Filters**
- Components: `src/components/features/search/*`, `src/components/features/series/SeriesFilterBar.tsx`
- Services: `src/lib/server/search.ts`
- State: URL-driven query params

**Moderation and Future User Posting**
- Components: `src/components/features/admin/ModerationPanel.tsx`
- Access: `src/payload/access/*`
- Data: future comment/post collections can be added beside current editorial collections without changing the public site boundary

### Integration Points

**Internal Communication**

- Route pages fetch data through `src/lib/server/*` helpers or Payload local APIs.
- Route components compose feature components and pass typed content objects.
- Client-side filters update URL state; server components read query params and refetch.
- Payload collection hooks trigger cache revalidation and redirect sync after publish actions.
- Admin components submit through Payload-backed mutations, not ad hoc custom APIs.

**External Integrations**

- PostgreSQL via `@payloadcms/db-postgres`
- Object storage / upload provider for production media
- Search engine integration deferred, but the search service boundary is already isolated
- Analytics and error tracking accessed only from server/lib wrappers and deployment config
- Translation imports from Desiring God and The Gospel Coalition handled through scripts and editorial workflow, not embedded in rendering code

**Data Flow**

1. Editor creates or updates content in Payload admin.
2. Payload validates the collection schema and access rules.
3. Publish event triggers cache revalidation and any redirect updates.
4. Public routes read from Payload/PostgreSQL through server helpers.
5. Search, sitemap, RSS, and metadata generation derive from the same published content source.
6. Article pages render scripture-first content blocks with translation metadata when present.

### File Organization Patterns

**Configuration Files**
- Root config files stay at repository root for build and tool discovery.
- Payload config stays in `payload.config.ts`.
- App-level runtime config stays in `src/app/layout.tsx`, `next.config.ts`, and environment files.
- CI workflows live in `.github/workflows/`.

**Source Organization**
- `src/app` handles routing and page composition.
- `src/collections` handles CMS data definitions.
- `src/globals` handles site-wide editorial settings.
- `src/payload` handles access, hooks, and field helpers that belong to the CMS layer.
- `src/components` contains reusable UI and feature components.
- `src/lib/server` contains server-only integration and content retrieval.
- `src/lib/shared` contains pure utility logic reusable across the app.
- `src/lib/client` contains browser-only helpers.
- `src/hooks` contains React hooks that are not feature-specific.

**Test Organization**
- Unit tests live in `tests/unit`.
- Integration tests live in `tests/integration`.
- End-to-end tests live in `tests/e2e`.
- Shared fixtures and mocks live in `tests/fixtures` and `tests/mocks`.
- Critical editorial and reading flows get E2E coverage first.

**Asset Organization**
- Static public assets stay in `public/`.
- Design tokens and theme CSS stay in `src/styles/`.
- Media managed by the CMS stays out of `public/` and is treated as application content.

### Development Workflow Integration

**Development Server Structure**
- One local app serves both public site and CMS.
- Public routes and admin routes are available in the same Next.js process.
- Payload admin is reachable from the same codebase, so content and rendering stay aligned.
- Local development should support seeded content and editor preview without extra infrastructure.

**Build Process Structure**
- TypeScript compilation, linting, and tests run against the same source tree.
- Build output remains Next.js-managed; there is no separate front-end bundle pipeline.
- Content schema changes are centralized in collection definitions and Payload migrations/hooks.
- Revalidation, sitemap, RSS, and metadata generation happen from server routes or helpers.

**Deployment Structure**
- Deploy the Next.js app and the Payload runtime together as one application.
- Provision PostgreSQL and object storage as managed external services.
- Environment variables configure database, auth, preview, storage, and analytics.
- Production deploys should run the same app entry points as development, with CMS access restricted by auth and access control.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
Next.js App Router, Payload CMS, and PostgreSQL fit together cleanly for a CMS-first editorial platform. The decisions reinforce each other rather than competing: Payload owns content and auth, Next.js owns rendering and routing, and PostgreSQL supports the relational content model.

**Pattern Consistency:**
The naming, structure, formatting, and process rules all align with the stack. Server-first public rendering, URL-driven filtering, and CMS-owned validation are consistent with the chosen architecture.

**Structure Alignment:**
The project tree supports the public site, CMS, admin workflow, SEO outputs, media handling, tests, and future moderation boundaries without forcing cross-cutting logic into the wrong layer.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
All five epics are represented in the structure and boundary map. Articles, series, Daily Verse, resources, search, auth, publishing, SEO, and launch readiness all have explicit homes.

**Functional Requirements Coverage:**
All 20 functional requirements are architecturally supported through collections, routes, server helpers, CMS access rules, and feature components.

**Non-Functional Requirements Coverage:**
Performance, accessibility, security, URL stability, backups, observability, and maintainability are all addressed at the architectural level.

### Implementation Readiness Validation ✅

**Decision Completeness:**
Critical decisions are documented with technology choices, version notes, and clear ownership boundaries.

**Structure Completeness:**
The project tree is concrete and specific enough for implementation agents to place files and responsibilities without inventing new structure.

**Pattern Completeness:**
Naming, communication, error handling, loading states, and translation/source metadata conventions are explicit and enforceable.

### Gap Analysis Results

**Critical Gaps:**
None blocking. The architecture has enough detail to start implementation.

**Important Gaps:**
Hosting provider, object storage provider, and newsletter provider remain implementation choices. Those do not block the architecture because the boundaries are already isolated.

**Nice-to-Have Gaps:**
Future comment/post moderation workflow can be detailed later once the product actually adds user posting.

### Validation Issues Addressed

No unresolved architectural conflicts were found. The main future-facing concerns were intentionally deferred and isolated instead of being left ambiguous.

### Architecture Completeness Checklist

**Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** high

**Key Strengths:**
- Clear CMS-first architecture with a real admin and content model
- Strong separation between public reader experience and editorial tooling
- Relational data model fits the publication’s content and future growth
- Explicit translation/source handling for launch content
- Concrete project tree and file boundaries for implementation agents

**Areas for Future Enhancement:**
- Add a dedicated moderation workflow once user posting becomes real
- Swap in a dedicated search engine if content volume grows
- Refine infrastructure choices after deployment provider selection

### Implementation Handoff

**AI Agent Guidelines:**

- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Priority:**
Initialize the Payload/Next.js starter and define the core collections and access control.
