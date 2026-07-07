---
baseline_commit: 53d2f97
---

# Story 2.2: Support series navigation inside articles

Status: review

## Story

As a reader,
I want article pages to show the surrounding series context,
so that I can move through a learning path instead of reading each piece in isolation.

## Acceptance Criteria

1. Article pages show series context when the article belongs to a series.
2. Previous and next series links are available when they exist.
3. The series block includes short explanatory context.

## Tasks / Subtasks

- [x] Add series navigation data for article pages.
- [x] Render previous/next series links in the article layout.
- [x] Add supporting series context copy.
- [x] Validate series navigation behavior.

## Dev Agent Record

### Debug Log

- Created from Epic 2 backlog.
- Added ordered series navigation in the article detail helper.
- Rendered previous/next article links and a series context block in the article page.
- Verified the series navigation appears on a published article page.
- Ran `npm run lint` successfully.

### Completion Notes

- Series navigation now appears inside article pages when the article belongs to a series.
- Previous/next links are derived from the ordered series corpus.
- The series block includes short context copy to orient the reader.

### File List

- `_bmad-output/implementation-artifacts/2-2-support-series-navigation-inside-articles.md`
- `src/app/(frontend)/articles/[slug]/page.tsx`
- `src/app/(frontend)/styles.css`
- `src/lib/article-detail.ts`

### Change Log

- 2026-06-16: Created Story 2.2.
- 2026-06-16: Implemented series navigation inside article pages.
