---
baseline_commit: c8332cb
---

# Story 5.2: Publish About page content

Status: review

## Story

As a reader,
I want an editable About page with mission and theological posture,
so that I can understand the publication's identity and trust it.

## Acceptance Criteria

1. The About page content is editable from the CMS.
2. The page blends mission, doctrine, editorial posture, team, and contact information.
3. The public About page reflects the CMS-backed content when present.
4. The page keeps the existing editorial tone and dark-frame layout.
5. The page has a fallback so the site still renders cleanly before CMS content exists.

## Tasks / Subtasks

- [x] Add the About page data model to the CMS.
- [x] Update the public About page to read CMS content.
- [x] Keep the existing fallback content for empty CMS state.
- [x] Add tests for the About page content helper.

## Dev Agent Record

### Debug Log

- Created from Epic 5 backlog.
- Implemented the About global, CMS-backed page content, fallback handling, and tests.
- Validated with lint, TypeScript, and compiled-JS runtime checks because Vitest is blocked in this Windows/OneDrive workspace.

### Completion Notes

- Added the `about-page` global model to Payload.
- Updated the public About page to render CMS-backed content while preserving the fallback copy.
- Added unit coverage for fallback and CMS-loaded about content.

### File List

- `src/globals/About.ts`
- `src/lib/about.ts`
- `src/app/(frontend)/about/page.tsx`
- `src/payload.config.ts`
- `src/payload-types.ts`
- `tests/unit/about.spec.ts`
- `_bmad-output/implementation-artifacts/5-2-publish-about-page-content.md`

### Change Log

- 2026-06-17: Created Story 5.2.
- 2026-06-17: Implemented CMS-backed About page content and fallback handling.
