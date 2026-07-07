---
baseline_commit: 4aa06ab
---

# Story 1.6: Generate discovery metadata and syndication outputs

Status: review

## Story

As a site owner,
I want public pages to generate metadata, RSS, sitemap, robots, and redirect outputs,
so that the publication is indexable, shareable, and stable over time.

## Acceptance Criteria

1. Public pages expose useful metadata for title, description, canonical URL, and social preview data.
2. Published public content can be represented in a sitemap output.
3. The publication exposes an RSS output for the latest public content.
4. The site exposes a robots output that points crawlers to the sitemap and keeps private routes out of indexing.
5. A redirect output exists for slug changes or moved content so old URLs can be mapped to new URLs.
6. The discovery outputs stay lightweight, typed, and easy to replace with CMS-backed data later.

## Tasks / Subtasks

- [x] Add a discovery metadata helper.
  - [x] Define the public page metadata shape.
  - [x] Provide reusable metadata builders for title, description, canonical URL, and social preview data.
  - [x] Keep the helper local and easy to replace with CMS content later.
- [x] Add sitemap and robots outputs.
  - [x] Add a sitemap output for published public pages.
  - [x] Add a robots output that points to the sitemap and blocks private routes.
  - [x] Keep the outputs static and deterministic for now.
- [x] Add an RSS output.
  - [x] Add a public RSS route for the latest editorial content.
  - [x] Include the essential item fields needed for feed readers.
  - [x] Keep the feed aligned with the publication's dark editorial system in the metadata.
- [x] Add redirect outputs.
  - [x] Define a redirect manifest for moved content.
  - [x] Keep slug changes representable without editing the frontend pages manually.
- [x] Validate the discovery outputs.
  - [x] Confirm the metadata helpers compile and return expected values.
  - [x] Confirm the sitemap, robots, and RSS routes return HTTP 200.
  - [x] Confirm the redirect manifest is deterministic.

## Dev Notes

### Architecture Guardrails

- Keep discovery outputs server-side and deterministic.
- Do not introduce a CMS dependency for this story; the outputs can stay local until content models are live.
- Preserve stable, shareable URLs and the dark editorial public site surface.
- Keep the metadata helpers typed so public routes can adopt them gradually.

### Current Repo State

- Story 1.5 implemented the search surface and search helper.
- Public pages currently include the homepage, article archive, search, and admin shell.
- The site already has a basic static metadata export, but not page-specific builders or syndication routes.
- A sitemap, robots, RSS, and redirect manifest do not exist yet.

### Technical Requirements

- Prefer Next.js App Router metadata route files where possible.
- Use deterministic content arrays for sitemap and feed output in the absence of CMS data.
- Keep redirect rules explicit and testable.
- Use semantic XML/plain-text outputs for RSS and robots.

### Testing Requirements

- Verify metadata helper output for key public pages.
- Verify sitemap, robots, and RSS routes return HTTP 200.
- Verify redirect manifest output is stable and parseable.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` - Epic 1, Story 1.6]
- [Source: `_bmad-output/planning-artifacts/kovasz-implementation-design-brief.md` - Discovery and syndication direction]
- [Source: `_bmad-output/planning-artifacts/architecture.md` - Route metadata and content discovery patterns]

## Dev Agent Record

### Debug Log

- Story created from Epic 1 as the next backlog item after search.
- Added a discovery metadata helper with canonical URL, Open Graph, and Twitter metadata support.
- Added sitemap, robots, RSS, and redirect outputs.
- Wired homepage, archive, and search pages to the shared metadata helper.
- Verified `GET /`, `GET /articles`, `GET /search?q=scripture`, `GET /sitemap.xml`, `GET /robots.txt`, `GET /rss.xml`, and `GET /api/redirects` all return HTTP 200.
- Ran `npm run lint` successfully.

### Completion Notes

- Implemented deterministic discovery outputs for the current public site shell.
- Metadata is now shared across the homepage, archive, and search pages.
- Sitemap and RSS are generated from the current editorial corpus and remain replaceable later with CMS-backed data.
- Redirects are exposed as a manifest endpoint for future slug or path migrations.
- The homepage now uses an absolute title so the site title does not duplicate through the global template.

### File List

- `_bmad-output/implementation-artifacts/1-6-generate-discovery-metadata-and-syndication-outputs.md`
- `.env.example`
- `src/app/(frontend)/articles/page.tsx`
- `src/app/(frontend)/page.tsx`
- `src/app/(frontend)/search/page.tsx`
- `src/app/api/redirects/route.ts`
- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/rss.xml/route.ts`
- `src/app/sitemap.ts`
- `src/lib/discovery-metadata.ts`
- `tests/unit/discovery-metadata.spec.ts`

### Change Log

- 2026-06-16: Created Story 1.6 for discovery metadata and syndication outputs.
- 2026-06-16: Implemented shared discovery metadata, RSS, robots, sitemap, and redirect outputs.
