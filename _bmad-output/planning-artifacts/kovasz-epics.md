---
title: Kovasz Epics and Stories
status: draft
created: 2026-06-16
updated: 2026-07-10
inputDocuments:
  - kovasz-prd.md
  - kovasz-architecture.md
  - kovasz-ux-design.md
---

# Kovasz Epics and Stories

This is a fast-path implementation plan, not a fully confirmed BMad epics workflow output. It is based on the PRD, UX direction, and architecture draft.

## Extracted Requirement Groups

### Functional Requirements

- FR-1: Render publication masthead.
- FR-2: Curate homepage sections.
- FR-3: Browse article archive.
- FR-4: Search editorial content.
- FR-4A: Browse by Topic and Audience.
- FR-5: Render article detail page.
- FR-6: Support series navigation inside articles.
- FR-7: Provide reader utilities.
- FR-8: Manage series.
- FR-9: Publish series pages.
- FR-10: Manage Daily Verse entries.
- FR-11: Render Daily Verse archive.
- FR-12: Publish resource items.
- FR-13: Manage authors.
- FR-14: Publish About page content.
- FR-15: Authenticate admins.
- FR-16: Draft, preview, and publish content.
- FR-17: Upload and manage media.
- FR-18: Generate metadata per route.
- FR-19: Generate RSS and sitemap.
- FR-20: Capture newsletter interest.

### Non-Functional Requirements

- Public content must be server-rendered or statically generated.
- Public pages target strong Core Web Vitals.
- Public and admin UI target WCAG 2.2 AA.
- Admin access uses real auth and role-based access.
- Slug changes require redirects.
- Published content has stable URLs.
- Database and media require backup strategy.
- Critical editorial flows require automated tests.

### Architecture Requirements

- Use Next.js App Router with TypeScript.
- Use Payload CMS for admin, content collections, auth, media, and APIs.
- Use PostgreSQL as the default database.
- Use object storage for production media.
- Keep search database-backed in MVP, behind an abstraction.
- Generate route metadata, sitemap, and RSS from published content.
- Use route revalidation after publish/unpublish.

### UX Requirements

- Homepage uses a strong publication masthead and dense magazine modules inspired by `des1.png`.
- Article pages prioritize calm, readable long-form typography.
- Admin is dense and operational, not decorative.
- Search and filters reflect state in URL.
- Mobile layout is single-column and keeps brand visible in first viewport.
- No card-in-card layouts or marketing-style landing page.

## Epic 1: Foundation and Content Platform

**Goal:** Establish the application shell, CMS, database, content model, and development standards.

### Story 1.1: Scaffold Next.js and Payload app

As a developer, I can scaffold the Next.js App Router application with Payload integrated so the public site and CMS share one codebase.

**Acceptance Criteria**

- Next.js TypeScript app runs locally.
- Payload admin route runs locally.
- PostgreSQL adapter is configured for local development.
- Environment variable template exists.
- Lint, format, and test scripts exist.

### Story 1.2: Define core collections

As an editor, I can manage Authors, Categories, Tags, Articles, Series, Daily Verses, Resources, Media, Redirects, Newsletter Signups, and Site Settings.

**Acceptance Criteria**

- Collections exist with required fields and relationships.
- Required fields prevent invalid publication.
- Admin labels are editor-friendly.
- Roles are represented in Users.

### Story 1.3: Seed prototype content

As a developer, I can seed initial Hungarian mock content so public pages can be built against realistic data.

**Acceptance Criteria**

- Seed script creates sample authors, categories, series, articles, daily verses, resources, and media placeholders.
- Seed can be rerun safely in development.

## Epic 2: Public Editorial Site

**Goal:** Build the reader-facing website with Kovasz identity and core navigation.

### Story 2.1: Implement global layout and masthead

As a reader, I see Kovasz immediately as a distinctive publication.

**Acceptance Criteria**

- Header/masthead follows `DESIGN.md` tokens.
- Navigation works on desktop and mobile.
- Search entry point routes to `/kereses`.
- First viewport hints at next section.

### Story 2.2: Implement homepage modules

As a reader, I can discover featured articles, series, daily verse, resources, and newsletter signup from the homepage.

**Acceptance Criteria**

- Homepage renders curated slots from Site Settings.
- Missing curated slots fall back to latest published content.
- Layout is responsive and visually aligned with `des1.png` direction without copying it.

### Story 2.3: Implement archive and filters

As a reader, I can browse all articles and filter them.

**Acceptance Criteria**

- Archive lists published articles only.
- Filters include category, author, series, tag, and sort.
- URL reflects filter state.
- Empty state includes reset.

### Story 2.4: Implement topic and audience discovery hubs

As a reader, I can browse content by first-class Topic and Audience so articles, series, and resources about the same need are discoverable together.

**Acceptance Criteria**

- `/topics` and `/audiences` render taxonomy indexes with content counts.
- `/topics/[slug]` and `/audiences/[slug]` render matching Articles, Series, and Resources grouped by type.
- Topic and Audience pages use CMS-backed content when available and static starter content as fallback.
- Topic and Audience detail routes are included in discovery metadata and sitemap output.
- Unit tests cover URL generation, summary counts, alias normalization, and detail filtering.

## Epic 3: Reading, Series, and Daily Verse

**Goal:** Deliver the core theological reading experience.

### Story 3.1: Implement article detail page

As a reader, I can read long-form articles comfortably.

**Acceptance Criteria**

- Article page renders rich text blocks, cover image, metadata, author, category, tags, Scripture references, and related content.
- Reading progress works without layout shift.
- Missing article returns editorial 404.

### Story 3.2: Implement series list and detail

As a reader, I can follow ordered theological series.

**Acceptance Criteria**

- Series list renders all published series.
- Series detail renders ordered article parts.
- Article detail shows previous/next series navigation.

### Story 3.3: Implement Napi Ige

As a reader, I can read today's Scripture and browse older entries.

**Acceptance Criteria**

- Homepage shows today's Daily Verse or latest fallback.
- `/napi-ige` renders today's entry and archive.
- Entries have stable URLs or date anchors.

## Epic 4: Admin Publishing Workflow

**Goal:** Replace mock admin with real editorial operations.

### Story 4.1: Implement auth and roles

As an admin, I can sign in securely and access only authorized CMS areas.

**Acceptance Criteria**

- Admin and Editor roles exist.
- Unauthenticated users cannot access admin.
- Auth errors are visible and safe.

### Story 4.2: Implement draft, preview, publish

As an editor, I can draft, preview, publish, schedule, and unpublish content.

**Acceptance Criteria**

- Drafts are not public.
- Preview route works for authenticated editors.
- Publish updates affected pages.
- Scheduled content is not public before publish date.

### Story 4.3: Implement media workflow

As an editor, I can upload images/files with required metadata.

**Acceptance Criteria**

- Media upload supports alt text, caption, credit, and focal point.
- Article publication blocks meaningful images without alt text.
- Public render uses responsive image handling.

## Epic 5: Discovery, SEO, and Launch Readiness

**Goal:** Make the publication discoverable, stable, and production-ready.

### Story 5.1: Implement search

As a reader, I can search content by query and filters.

**Acceptance Criteria**

- Search covers Articles, Series, Authors, Daily Verses, and Resources.
- Discovery metadata covers Articles, Series, Resources, Topics, and Audiences.
- Results show type, title, excerpt, and metadata.
- Search is tested with Hungarian text.

### Story 5.2: Implement metadata, sitemap, RSS, and redirects

As a site owner, I can publish content that is indexable and shareable.

**Acceptance Criteria**

- Article/Series pages generate metadata and OG fields.
- Sitemap includes public published content.
- RSS includes latest Articles.
- Redirect collection handles slug changes.

### Story 5.3: Add tests and production checks

As a maintainer, I can trust critical publishing and reading flows before launch.

**Acceptance Criteria**

- Playwright covers homepage, article, archive, search, mobile nav, and admin publish flow.
- Unit tests cover metadata, slug, reading time, and search parsing helpers.
- Production checklist covers env vars, backups, media storage, analytics, and error tracking.

## Suggested Build Order

1. Epic 1: Foundation and Content Platform.
2. Epic 2: Public Editorial Site, using seeded content.
3. Epic 3: Reading, Series, and Daily Verse.
4. Epic 4: Admin Publishing Workflow.
5. Epic 5: Discovery, SEO, and Launch Readiness.

## Open Implementation Questions

1. Confirm hosting and database provider before Story 1.1.
2. Confirm whether Payload admin route should replace or coexist with current mock admin URLs.
3. Confirm newsletter provider before Story 5.2 or split newsletter into a later story.
4. Confirm whether Resources need file uploads in MVP.
