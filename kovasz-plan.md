# Kovasz Plan

## Product Summary

Kovasz is a Hungarian Christian discipleship and formation publication. It is not a generic blog. The site is meant to deepen Bible understanding, support daily Christian life, and serve both new believers and mature believers through articles, series, Daily Verse, and practical resources.

## Locked Direction

- Public site feels like a dark, magazine-style theological publication.
- Homepage opens as a full publication front page, not a marketing landing page.
- Article pages are scripture-first with a strong editorial/study hybrid.
- Series are the main learning-path structure.
- Admin is CMS-first and practical.
- Visual direction is a deliberate hybrid of samizdat and magazine discipline.

## Technical Direction

- Starter: `create-payload-app`
- Frontend: Next.js App Router
- CMS: Payload CMS
- Database: PostgreSQL via `@payloadcms/db-postgres`
- Public rendering: server components by default
- Search: database-backed in MVP, abstracted for future replacement
- Media: object storage or upload-backed provider
- SEO: metadata, RSS, sitemap, robots, redirects, and revalidation built in

## Epic Structure

### Epic 1: Discover the Publication
Readers can understand the brand, browse the archive, search content, subscribe, and reach content through stable discovery surfaces.

### Epic 2: Read and Study Articles
Readers can open an article and get a calm, scripture-first reading experience with series context, reading progress, and sharing tools.

### Epic 3: Follow Series and Daily Scripture
Readers can use series and Daily Verse as guided learning paths for growth, study, and recurring spiritual rhythm.

### Epic 4: Publish Content in a Practical CMS
Editors can sign in, draft, preview, publish, schedule, and manage media in a CMS-first editorial workspace with role-based access.

### Epic 5: Build Trust and Practical Support
Readers can learn who is behind the publication, understand the editorial posture, and access practical resources that support study and growth.

## Readiness

The planning package is ready for implementation after the starter-scaffold story was added to Epic 1.

## Canonical Planning Artifacts

- `docs/kovasz-plan/architecture.md`
- `docs/kovasz-plan/epics.md`
- `docs/kovasz-plan/implementation-readiness-report-2026-06-16.md`
- `docs/kovasz-plan/kovasz-prd.md`
- `docs/kovasz-plan/kovasz-ux-design.md`
- `docs/kovasz-plan/kovasz-implementation-design-brief.md`
