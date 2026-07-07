---
baseline_commit: 5b27759c9ca161b6f66b0c221c263e257eda1980
---

# Story 1.4: Browse and filter the article archive

Status: review

## Story

As a reader,
I want to browse the article archive with filters and sorting,
so that I can find articles by topic, series, author, tag, or publication order.

## Acceptance Criteria

1. The archive page lists published articles in a readable editorial layout.
2. Each archive item surfaces the essential browsing cues: title, category, series, author, date, reading time, and excerpt.
3. Readers can filter the archive by category, series, author, tag, and sort order.
4. The current filter state is reflected in the URL and can be reloaded or shared.
5. When no articles match the current filters, the page shows a clear empty state with a reset action.
6. Pagination or equivalent archived browsing controls are present for longer lists.
7. The archive remains aligned with the dark editorial system established on the homepage.
8. The implementation stays lightweight and prepares the archive for future CMS-backed article data.

## Tasks / Subtasks

- [x] Add a typed archive data helper.
  - [x] Define the article record shape needed for browsing, filtering, and sorting.
  - [x] Provide a reusable archive helper that accepts filter inputs and returns visible results.
  - [x] Keep the helper local and easy to replace with CMS data later.
- [x] Build the article archive page.
  - [x] Add a public `/articles` route under the site app group.
  - [x] Render the article list with editorial hierarchy and article cards or rows.
  - [x] Update the homepage navigation to point to the archive route where appropriate.
- [x] Implement URL-driven archive filters.
  - [x] Support category, series, author, tag, and sort query parameters.
  - [x] Keep filter controls shareable through the URL.
  - [x] Preserve the current filter state when pagination changes.
- [x] Add archive empty and fallback states.
  - [x] Show a clear empty state when no articles match.
  - [x] Provide a reset action that clears filters.
  - [x] Preserve layout stability in both populated and empty states.
- [x] Validate archive behavior.
  - [x] Confirm the archive page serves HTTP 200.
  - [x] Confirm filter combinations, empty states, and sorting behave as expected.
  - [x] Confirm the page remains responsive in the dark editorial system.

## Dev Agent Record

### Debug Log

- Added `src/lib/article-archive.ts` with typed archive records, filter parsing, sorting, pagination, and URL builder helpers.
- Created the `/articles` route in the `(frontend)` app group with a server-rendered filter form and editorial archive grid.
- Updated the homepage navigation and call-to-action links to point readers toward the archive route.
- Extended the shared front-page stylesheet with archive-specific layout, filter, empty state, and pagination rules.
- Added unit coverage for archive filtering, sorting, empty-state handling, and URL generation.
- Verified `npm run lint` passes in the canonical `bbb/kovasz` workspace.
- Verified `/articles` and filtered archive URLs return HTTP 200 and render the expected archive content.
- Verified the archive helper directly with an in-process TypeScript transpilation check because Vitest loading in this Windows/OneDrive environment still fails with `spawn EPERM` during Vite config resolution.

### Completion Notes

- Story 1.4 now provides a usable archive browsing surface with URL-driven filters, stable pagination, and an empty state/reset path.
- The implementation remains local and typed, so it can be replaced with CMS-driven data later without changing the page contract.
- The archive page reuses the existing dark editorial frame rather than introducing a new layout system.

### File List

- `kovasz/src/lib/article-archive.ts`
- `kovasz/src/app/(frontend)/articles/page.tsx`
- `kovasz/src/app/(frontend)/page.tsx`
- `kovasz/src/app/(frontend)/styles.css`
- `kovasz/tests/unit/article-archive.spec.ts`

### Change Log

- 2026-06-16: Added a reusable typed archive helper with filtering, sorting, pagination, and URL generation.
- 2026-06-16: Created the public article archive route with server-rendered filter controls and editorial results grid.
- 2026-06-16: Updated homepage routing to send readers to the archive.
- 2026-06-16: Added styling and tests for archive browsing behavior.

## Dev Notes

### Architecture Guardrails

- Keep the archive server-rendered by default and driven by URL search params.
- Use client-side interaction only where the filter controls truly need it.
- Do not introduce the CMS article model yet; this story is the archive browsing surface, not the full content management layer.
- Preserve the dark editorial frame and dense publication rhythm from Story 1.2.
- Keep the data helper local and typed so it can be swapped for Payload/CMS data later.

### Current Repo State

- Story 1.1 initialized the Payload/Next.js starter in the canonical `bbb/kovasz` workspace.
- Story 1.2 replaced the starter homepage with the publication-style front page.
- Story 1.3 added typed homepage curation and fallback module orchestration.
- The archive route now exists in `src/app/(frontend)/articles`.
- The homepage navigation now points readers to `/articles` for discovery.

### Technical Requirements

- Prefer route search params over global state for archive filters.
- Keep sort/filter behavior deterministic and predictable.
- Use semantic HTML for archive items and filter controls.
- Avoid layout shifts when filters change or results empty out.
- Keep the archive list accessible on keyboard and screen readers.

### Project Structure Notes

- Put archive browsing logic in a small shared helper so later CMS work can reuse the same shape.
- Put the archive page in the Next.js App Router site surface.
- Keep any interactive filter controls isolated from the server-rendered page shell.
- Reuse the existing editorial layout language from the homepage instead of inventing a second visual system.

### Testing Requirements

- Verify the archive helper returns the correct visible set for each filter combination.
- Verify sorting is stable and predictable across the supported options.
- Verify the archive page renders and responds with HTTP 200.
- Verify the empty state and reset behavior are covered.
- Verify the homepage navigation still points readers to the archive route.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` - Epic 1, Story 1.4]
- [Source: `_bmad-output/planning-artifacts/kovasz-implementation-design-brief.md` - Homepage and discovery direction]
- [Source: `_bmad-output/planning-artifacts/kovasz-ux-design.md` - Publication front page and archive direction]
- [Source: `_bmad-output/planning-artifacts/architecture.md` - App Router, server rendering, URL state, and shared helper patterns]
