---
baseline_commit: 53d2f97
---

# Story 2.1: Render article detail page

Status: review

## Story

As a reader,
I want a scripture-first article detail page,
so that I can read long-form teaching with the right theological structure.

## Acceptance Criteria

1. Published article pages render by slug.
2. The Scripture block appears before the article body and metadata.
3. The page includes title, subtitle, author, date, reading time, cover image, and related content.
4. The page supports headings and subheadings without layout jumps.

## Tasks / Subtasks

- [x] Add article detail data and lookup helpers.
- [x] Build the public article detail route.
- [x] Add the scripture-first article layout and related content.
- [x] Validate page rendering and metadata behavior.

## Dev Agent Record

### Debug Log

- Created from Epic 2 backlog.
- Added a typed article detail corpus with scripture block, study panel, series context, and related content.
- Built the public `/articles/[slug]` route and wired it to article metadata.
- Added scripture-first layout sections, cover image, and related article links.
- Verified the article route returns HTTP 200 and renders the expected utility elements.
- Ran `npm run lint` successfully.

### Completion Notes

- Article pages now render by slug with scripture, study, metadata, cover, and related content.
- The route is wired to page metadata and remains server-rendered.
- The page layout follows the approved scripture-first editorial hierarchy.

### File List

- `_bmad-output/implementation-artifacts/2-1-render-article-detail-page.md`
- `src/app/(frontend)/articles/[slug]/not-found.tsx`
- `src/app/(frontend)/articles/[slug]/page.tsx`
- `src/app/(frontend)/articles/page.tsx`
- `src/app/(frontend)/styles.css`
- `src/components/features/article/ReadingProgress.tsx`
- `src/components/features/article/ShareTools.tsx`
- `src/lib/article-detail.ts`
- `src/lib/discovery-metadata.ts`
- `tests/unit/article-detail.spec.ts`

### Change Log

- 2026-06-16: Created Story 2.1.
- 2026-06-16: Implemented the scripture-first article detail route and supporting article data.
