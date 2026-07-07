---
baseline_commit: c8332cb
---

# Story 5.1: Publish author profiles

Status: review

## Story

As a reader,
I want to open author pages and understand who wrote the content,
so that I can build trust in the publication.

## Acceptance Criteria

1. The public site exposes author profile pages.
2. Author profiles show name, role, bio, photo, and links.
3. Author pages list the published articles associated with that author.
4. Each article page links back to the author profile.
5. Author content is managed through the CMS-backed data model.

## Tasks / Subtasks

- [x] Add the author data model to the CMS.
- [x] Add public author list and detail routes.
- [x] Link article detail pages to author profiles.
- [x] Add tests for author profile data and article linking.

## Dev Agent Record

### Debug Log

- Created from Epic 5 backlog.
- Implemented the author collection, author list/detail routes, article linking, and sitemap coverage.
- Validated with lint, TypeScript, and compiled-JS runtime checks because Vitest is blocked in this Windows/OneDrive workspace.

### Completion Notes

- Added the CMS-backed author collection and merged it with fallback author profiles.
- Added `/authors` and `/authors/[slug]` public routes.
- Linked article pages to author profiles and expanded sitemap coverage.
- Added unit tests for author helpers and CMS merge behavior.

### File List

- `src/collections/Authors.ts`
- `src/lib/authors.ts`
- `src/lib/discovery-metadata.ts`
- `src/app/(frontend)/authors/page.tsx`
- `src/app/(frontend)/authors/[slug]/page.tsx`
- `src/app/(frontend)/articles/[slug]/page.tsx`
- `src/components/layout/SiteChrome.tsx`
- `src/payload-types.ts`
- `src/app/sitemap.ts`
- `tests/unit/authors.spec.ts`
- `tests/unit/discovery-metadata.spec.ts`
- `src/lib/server/payload.ts`
- `_bmad-output/implementation-artifacts/5-1-publish-author-profiles.md`

### Change Log

- 2026-06-17: Created Story 5.1.
- 2026-06-17: Implemented author profiles, article linking, and sitemap coverage.
