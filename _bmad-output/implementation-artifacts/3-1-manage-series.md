---
baseline_commit: d051d46
---

# Story 3.1: Manage series

Status: review

## Story

As an editor,
I want to create and organize series with ordered article parts and editorial metadata,
so that I can build guided learning paths for readers.

## Acceptance Criteria

1. The CMS exposes a series collection that editors can manage.
2. A series can store title, slug, short description, longer description, status, cover image, and SEO data.
3. A series can store an ordered list of articles or article references.
4. The series model remains ready for public series pages and filtering.

## Tasks / Subtasks

- [x] Add the series content model to Payload.
- [x] Define the series data helpers used by the public site.
- [x] Keep the model ready for ordering, filtering, and public rendering.
- [x] Validate the series collection shape and generated types.

## Dev Agent Record

### Debug Log

- Created from Epic 3 backlog.

### Completion Notes

- Added the `series` Payload collection with topic, audience, slug, ordered article references, and SEO fields.
- Added typed series helpers for public rendering and filtering.
- Synced `src/payload-types.ts` manually after `payload generate:types` hit the Windows/OneDrive spawn limitation.
- Added unit coverage for the helper layer and the collection shape.

### File List

- `_bmad-output/implementation-artifacts/3-1-manage-series.md`
- `src/collections/Series.ts`
- `src/lib/series.ts`
- `src/payload.config.ts`
- `src/payload-types.ts`
- `tests/unit/series.spec.ts`
- `tests/unit/series-collection.spec.ts`

### Change Log

- 2026-06-16: Created Story 3.1.
- 2026-06-16: Implemented series collection, public helpers, and validation coverage.
