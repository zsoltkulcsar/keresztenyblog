---
baseline_commit: d051d46
---

# Story 3.2: Publish series pages

Status: review

## Story

As a reader,
I want a series page that shows the title, short description, ordered parts, and fuller context,
so that I can decide whether to follow the series and keep reading through it.

## Acceptance Criteria

1. Published series pages render by slug.
2. The page shows title and short description first.
3. The page shows ordered article parts and progress cues.
4. Opening the series detail shows fuller context and a longer description.

## Tasks / Subtasks

- [x] Add the public series page route.
- [x] Render the series list and detail state.
- [x] Add topic-based filtering and audience routing cues.
- [x] Validate the page rendering and metadata.

## Dev Agent Record

### Debug Log

- Created from Epic 3 backlog.

### Completion Notes

- Added `/series` and `/series/[slug]` public routes with archive, filtering, and detail views.
- Rendered ordered series parts, topic/audience cues, and related series links.
- Added metadata for the series archive and detail routes.
- Verified the routes over HTTP and confirmed the expected content renders.

### File List

- `_bmad-output/implementation-artifacts/3-2-publish-series-pages.md`
- `src/app/(frontend)/series/page.tsx`
- `src/app/(frontend)/series/[slug]/page.tsx`
- `src/app/(frontend)/series/loading.tsx`
- `src/app/(frontend)/series/not-found.tsx`
- `src/app/(frontend)/styles.css`
- `src/lib/discovery-metadata.ts`
- `src/lib/series.ts`

### Change Log

- 2026-06-16: Created Story 3.2.
- 2026-06-16: Implemented public series archive and detail routes.
