---
title: Kovasz Hungarian Christian Blog PRD
status: draft
created: 2026-06-16
updated: 2026-06-16
sources:
  - ../../PROJECT.md
  - ../../des1.png
  - https://nextjs.org/docs/app
  - https://payloadcms.com/docs/getting-started/installation
  - https://payloadcms.com/docs/database/overview
---

# PRD: Kovasz

## 0. Document Purpose

This PRD captures the product scope for Kovasz, a Hungarian Christian theological blog and editorial journal for articles, series, daily Scripture, and practical Christian resources. It is intended for product planning, UX specification, architecture, and implementation breakdown. This is a fast-path BMad draft based on `PROJECT.md`, the `des1.png` design reference, and current official framework documentation. Assumptions are marked inline and collected at the end.

## 1. Vision

Kovasz should feel like a serious Hungarian theological journal that happens to live on the web. It is not a generic church blog, a marketing site, or a social feed. It should foreground long-form reading, coherent series, daily Scripture, and trusted authors.

The visual identity should keep the existing Hungarian samizdat editorial character, while borrowing from `des1.png` the strong black masthead, dense magazine modules, large typographic confidence, compact cards, grayscale imagery, and issue-like rhythm. The result should be sharper and more contemporary than the current prototype without losing the paper-and-ink theological journal feeling.

The product should be easy to maintain by editors. A writer should be able to create an article, assign it to a series, attach Scripture references, upload a cover image, preview it, publish it, and trust that SEO, RSS, sitemap, and archive pages update without manual work.

## 2. Target Users

### 2.1 Jobs To Be Done

- As a Hungarian reader, I want thoughtful Christian essays and studies presented in a calm reading environment so I can reflect without feeling like I am scrolling a feed.
- As a returning reader, I want to follow theological series in order so I can build understanding across multiple articles.
- As a reader with limited time, I want a daily Scripture surface and curated highlights so I can quickly receive something useful.
- As an editor, I want a structured admin interface so I can publish articles, series, authors, daily verses, and resources without touching code.
- As the site owner, I want the site to be distinctive, searchable, indexable, and durable so it can grow into a real publication.

### 2.2 Non-Users for MVP

- Anonymous commenters and debate participants. Comments are deferred until moderation policy is clear.
- Multi-language editorial teams. MVP is Hungarian-first.
- Paid subscribers. Monetization is out of scope for MVP.
- Large publishing organizations with complex workflow approvals. MVP supports simple editor/admin publishing.

### 2.3 Key User Journeys

- **UJ-1. Anna reads a long theological essay on Sunday afternoon.**
  - **Persona + context:** Anna is a Hungarian Christian reader who wants more depth than short devotional posts.
  - **Entry state:** She arrives from search, newsletter, or direct link.
  - **Path:** She lands on an article page, sees title, author, series, reading time, and Scripture references, then reads in a quiet long-form layout with reading progress.
  - **Climax:** The article gives her enough structure to finish reading and continue to the next series part.
  - **Resolution:** She can save, share, or continue with related articles.

- **UJ-2. Peter follows a series on grace.**
  - **Persona + context:** Peter wants a coherent sequence, not isolated posts.
  - **Entry state:** He opens the series index from the homepage or article sidebar.
  - **Path:** He sees series description, parts in order, completion count, and latest entry.
  - **Climax:** He can identify the next article in sequence and resume reading.
  - **Resolution:** The series page becomes a stable study hub.

- **UJ-3. Eszter checks Napi Ige before work.**
  - **Persona + context:** Eszter has two minutes and wants a daily Scripture text.
  - **Entry state:** She opens the homepage or `/napi-ige` on mobile.
  - **Path:** She sees today's verse, reference, short note, and archive link.
  - **Climax:** The verse is readable without navigation friction.
  - **Resolution:** She can browse older daily verses when she has more time.

- **UJ-4. An editor publishes a new article.**
  - **Persona + context:** A trusted editor is preparing a theological essay for publication.
  - **Entry state:** Authenticated admin session.
  - **Path:** She creates an article, fills title, excerpt, body, author, category, series, tags, Scripture references, cover image, SEO fields, and publication status.
  - **Climax:** Preview matches the final article page closely enough to catch formatting problems.
  - **Resolution:** Publishing updates public pages, search, RSS, sitemap, and series navigation.

- **UJ-5. A search visitor finds an older article.**
  - **Persona + context:** A reader remembers a topic or Bible reference but not the article title.
  - **Entry state:** Search page or header search.
  - **Path:** They search by title, tag, author, category, body text, or Scripture reference.
  - **Climax:** Results show enough context to choose the right article.
  - **Resolution:** They land on the article or series page.

## 3. Glossary

- **Article**: A published or draft editorial item. Includes essay, devotional, sermon, Bible study, church history, culture article, or resource.
- **Series**: Ordered group of Articles around one theme. An Article can belong to zero or one primary Series in MVP.
- **Daily Verse**: Date-bound Scripture entry shown on the homepage and `/napi-ige`.
- **Issue**: Editorial grouping inspired by printed journals. In MVP this is visual and archival, not a paid magazine product.
- **Author**: Public writer profile attached to Articles.
- **Category**: Editorial classification such as theology, devotion, sermon, Bible study, church history, or culture.
- **Tag**: Flexible keyword used for search and related content.
- **Scripture Reference**: Bible book, chapter, and verse reference attached to an Article or Daily Verse.
- **Resource**: Useful non-article content, such as reading lists, PDFs, study aids, or curated links. [ASSUMPTION: Resources are needed because the user asked for "other useful things."]

## 4. Features

### 4.1 Public Editorial Homepage

**Description:** The homepage presents Kovasz as a distinctive publication. It should open with a strong masthead, latest/featured article, compact magazine modules, Napi Ige, series highlights, resource links, newsletter signup, and archive cues. It should borrow `des1.png`'s dense editorial structure while preserving Kovasz's paper, ink, red-signal identity.

#### FR-1: Render publication masthead

The system must render a first-viewport publication masthead with brand, issue/imprint metadata, primary navigation, search entry point, and featured content.

**Consequences:**
- Brand name is prominent on mobile and desktop.
- First viewport hints at at least one content section below the fold.
- Navigation includes Articles, Series, Napi Ige, Resources, About, and Search.

#### FR-2: Curate homepage sections

Editors can mark Articles, Series, Daily Verse, and Resources for homepage placement.

**Consequences:**
- Homepage can show latest content automatically.
- Homepage can override latest ordering with explicit editorial picks.
- Empty editorial slots degrade to latest published content.

### 4.2 Article Archive and Search

**Description:** Readers can browse and search content by category, author, series, tag, Scripture reference, and text query.

#### FR-3: Browse article archive

Readers can view a paginated Article archive with filters for Category, Series, Author, Tag, and sort order.

**Consequences:**
- Filter state is reflected in the URL.
- Empty filtered results show a helpful state and reset option.

#### FR-4: Search editorial content

Readers can search Articles, Series, Authors, Daily Verses, and Resources.

**Consequences:**
- Search results include title, excerpt, type, author, date, category, and matched context.
- MVP may use database-backed full-text search; external search service is deferred until content volume requires it.

### 4.3 Article Reading Experience

**Description:** Article pages are optimized for long-form theological reading.

#### FR-5: Render article detail page

The system must render title, subtitle, author, date, category, reading time, cover image, body, Scripture references, pull quotes, footnotes, and related content.

**Consequences:**
- Article body supports headings, block quotes, lists, links, footnotes, images, and callouts.
- Article page includes structured metadata for SEO and sharing.

#### FR-6: Support series navigation inside articles

When an Article belongs to a Series, the article page must show previous/next parts and the full series context.

**Consequences:**
- Series order is deterministic.
- Article page links back to Series detail.

#### FR-7: Provide reader utilities

Readers can copy/share article links and see reading progress.

**Consequences:**
- Share uses browser-native share when available and clipboard fallback when not.
- Reading progress is non-blocking and does not shift layout.

### 4.4 Series

**Description:** Series are first-class editorial objects, not only tags.

#### FR-8: Manage series

Editors can create and edit Series with title, slug, description, cover image, status, ordered Article list, and SEO fields.

**Consequences:**
- Public series list shows all published Series.
- Series detail shows Articles in configured order.

#### FR-9: Publish series pages

Readers can browse Series pages with description, part list, publication dates, and progress cues.

**Consequences:**
- Series pages are indexable.
- Series part order remains stable across archive sorting changes.

### 4.5 Napi Ige

**Description:** Daily Scripture is a simple recurring editorial object.

#### FR-10: Manage Daily Verse entries

Editors can create date-bound Daily Verse entries with Scripture text, reference, optional note, and status.

**Consequences:**
- Only one published Daily Verse should be primary for a date.
- Homepage shows today's verse or the latest published fallback.

#### FR-11: Render Daily Verse archive

Readers can browse past Daily Verse entries by date.

**Consequences:**
- Archive is paginated.
- Direct URLs are stable.

### 4.6 Resources

**Description:** Resources collect useful items beyond standard articles.

#### FR-12: Publish resource items

Editors can publish Resources with type, title, description, link or file, optional related Article or Series, and tags.

**Consequences:**
- Resource types include PDF, reading list, external link, study guide, and announcement.
- Resources are searchable and can appear on the homepage.

### 4.7 Authors and About

**Description:** Kovasz needs trust signals and author context.

#### FR-13: Manage authors

Editors can create Author profiles with name, slug, role, bio, photo, links, and active status.

**Consequences:**
- Article pages link to Author pages.
- Author pages list all published Articles by that Author.

#### FR-14: Publish About page content

Editors can manage manifesto, confession/positioning text, team overview, and contact information.

**Consequences:**
- About page content is editable without code deployment.
- The page remains visually aligned with editorial style.

### 4.8 Admin and Editorial Workflow

**Description:** Admin should be practical, dense, and reliable, not decorative.

#### FR-15: Authenticate admins

Editors and admins can sign in securely.

**Consequences:**
- MVP must replace mock session storage auth with real authenticated sessions.
- Roles include Admin and Editor.

#### FR-16: Draft, preview, and publish content

Editors can save drafts, preview content, publish, unpublish, and schedule publication.

**Consequences:**
- Draft content is not public.
- Preview requires authentication or a time-limited preview mechanism.

#### FR-17: Upload and manage media

Editors can upload images and files with alt text, caption, credit, and focal point.

**Consequences:**
- Image upload supports resizing/optimization path.
- Public pages never render images without alt text unless explicitly marked decorative.

### 4.9 SEO, Syndication, and Discovery

**Description:** A publication needs durable URLs and machine-readable output.

#### FR-18: Generate metadata per route

The system must generate title, description, canonical URL, Open Graph data, and Article schema where applicable.

**Consequences:**
- Article and Series pages have unique metadata.
- Missing custom SEO fields fall back to sensible editorial fields.

#### FR-19: Generate RSS and sitemap

The system must expose RSS feed and sitemap output for published public content.

**Consequences:**
- Sitemap includes public routes and last modified dates.
- RSS includes latest published Articles.

### 4.10 Newsletter and Contact

**Description:** Readers should be able to subscribe for updates, but newsletter delivery can integrate later.

#### FR-20: Capture newsletter interest

Readers can submit an email address for newsletter signup.

**Consequences:**
- MVP can store signups locally or forward to a provider.
- The form validates email format and shows success/failure states.

## 5. Non-Functional Requirements

- **NFR-1 Performance:** Public pages should target fast first contentful render and excellent Core Web Vitals. Long article pages must remain readable on low-end mobile devices.
- **NFR-2 SEO:** Public content must be server-rendered or statically generated, crawlable without client-only rendering.
- **NFR-3 Accessibility:** Public and admin UI must meet WCAG 2.2 AA for contrast, keyboard navigation, focus visibility, labels, and semantic structure.
- **NFR-4 Security:** Admin access must use secure session handling, role-based access control, CSRF protections where relevant, and secret management through environment variables.
- **NFR-5 Editorial Integrity:** Published URLs must be stable. Slug changes require redirects.
- **NFR-6 Data Integrity:** Articles must not publish without title, slug, author, category, excerpt, body, and publication date.
- **NFR-7 Observability:** Production should capture errors and basic web analytics without tracking more reader data than necessary.
- **NFR-8 Privacy:** Newsletter signups and admin accounts must collect the minimum data needed.
- **NFR-9 Backup and Recovery:** Database and media storage require routine backups before launch.
- **NFR-10 Maintainability:** Use TypeScript, schema validation, linting, formatting, and tests for critical editorial flows.

## 6. MVP Scope

### 6.1 In Scope

- Public homepage, Articles, Article detail, Series, Series detail, Napi Ige, Search, Resources, About, Author pages.
- Admin authentication and CRUD for Articles, Series, Authors, Categories, Tags, Daily Verses, Resources, and Media.
- Rich text editing with theological long-form needs: headings, quotes, footnotes, Scripture references, images, and callouts.
- SEO metadata, sitemap, RSS, and basic analytics.
- Migration/seed from current mock content.
- Responsive visual direction based on Kovasz samizdat plus the better magazine structure from `des1.png`.

### 6.2 Out of Scope for MVP

- Public comments and moderation.
- Paid memberships.
- Native mobile apps.
- Multi-language content management.
- AI-generated content.
- Audio/TTS article versions.
- Monthly print issue PDF generation, except as a placeholder for future roadmap.

## 7. Success Metrics

**Primary**

- **SM-1:** Readers can complete article reading sessions without layout or performance friction. Validates FR-5, FR-7, NFR-1.
- **SM-2:** Editors can publish a complete Article without developer help. Validates FR-15, FR-16, FR-17.
- **SM-3:** Search and archive pages help readers reach older content. Validates FR-3, FR-4.
- **SM-4:** Public content is indexable and shareable. Validates FR-18, FR-19.

**Secondary**

- **SM-5:** Series pages create repeat reading sessions. Validates FR-8, FR-9.
- **SM-6:** Newsletter signup converts interested readers. Validates FR-20.

**Counter-Metrics**

- **SM-C1:** Do not optimize for feed-like scrolling at the expense of long-form reading.
- **SM-C2:** Do not add visual novelty that harms accessibility or editorial seriousness.
- **SM-C3:** Do not overbuild publishing workflow before there is a real editorial team.

## 8. Recommended BMad Path

- Optional already covered by this draft: `[CB] Create Brief` via existing `PROJECT.md`.
- Recommended next if visual decisions need more exploration: `[CU] Create UX` / `bmad-ux`.
- Required next for implementation readiness: `[CA] Create Architecture` / `bmad-create-architecture`.
- Required after architecture: `[CE] Create Epics and Stories` / `bmad-create-epics-and-stories`.
- Required before implementation: `[IR] Check Implementation Readiness` / `bmad-check-implementation-readiness`.

## 9. Open Questions

1. Should the MVP keep the Kovasz name with Hungarian accents in the rendered brand, or use ASCII internally only and accents publicly?
2. Is this intended for a single editor, a small editorial team, or public contributor submissions?
3. Should the admin live at `/admin`, `/studio`, or Payload's default route?
4. Should content be stored in a CMS database from day one, or should articles start as Git-managed MDX and move to CMS later?
5. Which newsletter provider should be used, if any?
6. Should Scripture text be manually entered for copyright/control reasons, or integrated from a Bible API later?
7. What theological statement or editorial policy should constrain published content?
8. Should comments be permanently excluded or planned for moderated v2?

## 10. Assumptions Index

- [ASSUMPTION] Resources are in scope because the user asked for "other useful things."
- [ASSUMPTION] MVP is public launch quality, not only a throwaway prototype.
- [ASSUMPTION] Hungarian is the only content language for MVP.
- [ASSUMPTION] The design should improve on `des1.png` without copying the art-blog brand.
- [ASSUMPTION] A built-in admin is more valuable than a separate custom FastAPI backend for v1.

## 11. Source Notes

- Next.js App Router official docs list metadata, OG images, route handlers, sitemap, RSS-adjacent route support, and current App Router version details: https://nextjs.org/docs/app
- Next.js metadata docs document `metadata` and `generateMetadata` for route-specific SEO: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js sitemap docs document `sitemap.(xml|js|ts)` conventions: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Payload installation docs list Next.js compatibility, database options, and packages for rich text and images: https://payloadcms.com/docs/getting-started/installation
- Payload database docs list MongoDB, Postgres, and SQLite adapters and guidance for relational data: https://payloadcms.com/docs/database/overview
