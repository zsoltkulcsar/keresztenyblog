---
baseline_commit: c8332cb
---

# Story 5.3: Publish resources for study and growth

Status: review

## Story

As a reader,
I want to browse practical resources with clear usefulness cues,
so that I can find study aids, reading lists, files, and links that support growth.

## Acceptance Criteria

1. The public resources page shows title, type, and short usefulness copy.
2. Resources can link to related articles or series when relevant.
3. External links and downloadable files are clearly identified by type.
4. The resources content is editable through the CMS-backed model.
5. The page keeps a clean, readable editorial layout.

## Tasks / Subtasks

- [x] Add the resources data model to the CMS.
- [x] Update the public resources page to read CMS content.
- [x] Support external links and file-based resources.
- [x] Add tests for resource content and linking behavior.

## Dev Agent Record

### Debug Log

- Created from Epic 5 backlog.
- Implemented the resources collection, resource list/detail routes, and related linking.
- Validated with lint, TypeScript, and compiled-JS runtime checks because Vitest is blocked in this Windows/OneDrive workspace.

### Completion Notes

- Added the `resources` collection and merged CMS resources with the fallback set.
- Updated the public resources pages to support external links, downloadable files, and related series/articles.
- Added unit coverage for resource helpers and CMS merge behavior.

### File List

- `src/collections/Resources.ts`
- `src/lib/resources.ts`
- `src/app/(frontend)/resources/page.tsx`
- `src/app/(frontend)/resources/[slug]/page.tsx`
- `src/lib/discovery-metadata.ts`
- `src/app/sitemap.ts`
- `src/payload.config.ts`
- `src/payload-types.ts`
- `tests/unit/resources.spec.ts`
- `tests/unit/discovery-metadata.spec.ts`
- `_bmad-output/implementation-artifacts/5-3-publish-resources-for-study-and-growth.md`

### Change Log

- 2026-06-17: Created Story 5.3.
- 2026-06-17: Implemented CMS-backed resources pages and linking.
