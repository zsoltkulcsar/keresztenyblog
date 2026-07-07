---
baseline_commit: d051d46
---

# Story 3.4: Render Daily Verse archive

Status: review

## Story

As a reader,
I want to browse past Daily Verse entries,
so that I can revisit Scripture from previous days.

## Acceptance Criteria

1. The public site exposes a Daily Verse archive page.
2. The archive shows entries by date with stable URLs.
3. The archive supports browsing or pagination for older entries.

## Tasks / Subtasks

- [x] Add the public Daily Verse archive route.
- [x] Render the archive list and date context.
- [x] Add stable links for individual Daily Verse entries when needed.
- [x] Validate page rendering and archive behavior.

## Dev Agent Record

### Debug Log

- Created from Epic 3 backlog.

### Completion Notes

- Added `/napi-ige` and `/napi-ige/[slug]` public routes for the Daily Verse archive and detail view.
- Rendered date-based pagination, stable entry links, and the verse reading layout.
- Added metadata support and archive browsing for the new routes.
- Verified the routes over HTTP and confirmed the expected content renders.

### File List

- `_bmad-output/implementation-artifacts/3-4-render-daily-verse-archive.md`
- `src/app/(frontend)/napi-ige/page.tsx`
- `src/app/(frontend)/napi-ige/[slug]/page.tsx`
- `src/app/(frontend)/napi-ige/loading.tsx`
- `src/app/(frontend)/napi-ige/not-found.tsx`
- `src/app/(frontend)/styles.css`
- `src/lib/daily-verse.ts`
- `src/lib/discovery-metadata.ts`

### Change Log

- 2026-06-16: Created Story 3.4.
- 2026-06-16: Implemented Daily Verse archive and detail routes.
