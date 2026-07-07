---
baseline_commit: 6cfb88909b7b3d1ce54b0c76bbf8f53371f97b5f
---

# Story 1.5: Search editorial content

Status: review

## Story

As a reader,
I want to search the publication across articles, series, authors, resources, and Daily Verse,
so that I can quickly find content I remember or explore a topic more deeply.

## Acceptance Criteria

1. The publication exposes a public search surface that works from the current site shell.
2. Readers can search by title and supporting metadata across editorial content types.
3. Search results can include articles, series, authors, resources, and Daily Verse when matching content exists.
4. The search query is reflected in the URL and can be shared or reloaded.
5. When a query has no matches, the page shows a clear empty state with guidance to broaden the search.
6. Search results remain aligned with the dark editorial system established on the homepage and archive.
7. The search experience stays lightweight and prepares the site for a future CMS-backed search implementation.

## Tasks / Subtasks

- [x] Add a typed editorial search helper.
  - [x] Define the searchable content record shape.
  - [x] Provide a reusable search helper that accepts a query and returns ranked results.
  - [x] Keep the helper local and easy to swap for CMS or external search later.
- [x] Build the public search page.
  - [x] Add a public `/search` route under the site app group.
  - [x] Render a clear search input, recent-search empty state, and results list.
  - [x] Update the homepage search entry point to route readers to search.
- [x] Implement query-driven search behavior.
  - [x] Reflect the current search term in the URL.
  - [x] Normalize input so case and whitespace do not break search.
  - [x] Keep the page reloadable and shareable by query string.
- [x] Add empty, loading, and no-query states.
  - [x] Show a helpful prompt when no query is entered.
  - [x] Show a no-results state when nothing matches.
  - [x] Keep the layout stable across all search states.
- [x] Validate search behavior.
  - [x] Confirm the search page serves HTTP 200.
  - [x] Confirm the helper returns expected matches across content types.
  - [x] Confirm empty-state and no-query behavior are covered.

## Dev Notes

### Architecture Guardrails

- Keep search server-rendered by default and driven by URL search params.
- Do not introduce a dedicated external search engine yet; this story is the search surface, not the future scaling solution.
- Keep the search helper typed and local so it can be replaced later with Payload-backed or external search data.
- Preserve the dark editorial frame and the dense publication rhythm from the homepage and archive stories.

### Current Repo State

- Story 1.1 initialized the Payload/Next.js starter in the canonical `bbb/kovasz` workspace.
- Story 1.2 implemented the publication-style front page.
- Story 1.3 added homepage content orchestration and fallback logic.
- Story 1.4 added the article archive route and URL-driven filters.
- The public search route does not exist yet in `src/app/(frontend)`.
- The homepage search entry point still routes to the archive and needs to be updated to point at search.

### Technical Requirements

- Prefer route search params over local component state for query persistence.
- Normalize search input before matching.
- Make search results deterministic and stable.
- Use semantic HTML for the search form, results, and empty states.
- Keep the page accessible on keyboard and screen readers.

### Project Structure Notes

- Put search matching logic in a small shared helper so later CMS/search-provider work can replace it cleanly.
- Put the public search page in the Next.js App Router site surface.
- Keep the existing editorial layout language rather than inventing a separate search UI style.

### Testing Requirements

- Verify the search helper returns matches for common editorial queries.
- Verify the search page renders and responds with HTTP 200.
- Verify the query string is preserved in the URL.
- Verify empty and no-query states are covered.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` - Epic 1, Story 1.5]
- [Source: `_bmad-output/planning-artifacts/kovasz-implementation-design-brief.md` - Discovery and archive direction]
- [Source: `_bmad-output/planning-artifacts/kovasz-ux-design.md` - Search as first-class discovery]
- [Source: `_bmad-output/planning-artifacts/architecture.md` - URL-driven state, server rendering, and shared helper patterns]

## Dev Agent Record

### Debug Log

- Added a local editorial search corpus and a typed helper in `src/lib/editorial-search.ts`.
- Added a public `/search` route with URL-driven query handling and dark editorial presentation.
- Added a route-level loading state for the search surface.
- Updated the homepage search entry point to point at the new search surface.
- Ran `npm run lint` successfully.
- Verified `GET /search` and `GET /search?q=scripture` both return HTTP 200.

### Completion Notes

- Implemented a lightweight, typed search surface for articles, series, authors, resources, and Daily Verse.
- Search state is query-string driven, reloadable, and shareable.
- Added a loading state and explicit no-query / no-results states.
- Search remains local and replaceable for future CMS or external search integration.
- Validation completed with lint and local HTTP checks.

### File List

- `_bmad-output/implementation-artifacts/1-5-search-editorial-content.md`
- `src/app/(frontend)/page.tsx`
- `src/app/(frontend)/search/loading.tsx`
- `src/app/(frontend)/search/page.tsx`
- `src/app/(frontend)/styles.css`
- `src/lib/editorial-search.ts`
- `tests/unit/editorial-search.spec.ts`

### Change Log

- 2026-06-16: Created Story 1.5 for the publication search experience.
- 2026-06-16: Implemented the search surface, query handling, loading state, and validation.
