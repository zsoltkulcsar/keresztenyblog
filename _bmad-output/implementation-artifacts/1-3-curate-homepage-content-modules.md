---
baseline_commit: 8c27bebeb6f02fceb5eb11fe8c9c02175ee32036
---

# Story 1.3: Curate homepage content modules

Status: review

## Story

As an editor,
I want to curate homepage modules for articles, series, Daily Verse, resources, and newsletter signup,
so that the front page reflects editorial priorities while still staying current.

## Acceptance Criteria

1. The homepage can present curated lead and supporting content modules.
2. The lead story and supporting modules use curated items when available.
3. If a curated module is removed, the homepage falls back to the most recent appropriate published content.
4. The latest published content still appears where no curated item exists.
5. The module structure remains compatible with the dark editorial front page from Story 1.2.
6. The implementation is lightweight and prepares the homepage for future CMS-backed curation.

## Tasks / Subtasks

- [x] Add a homepage content orchestration layer.
  - [x] Define the lead story and supporting module data shape.
  - [x] Keep the curation model easy to swap for CMS data later.
- [x] Implement fallback behavior for homepage modules.
  - [x] Use curated items when present.
  - [x] Fall back to recent content when a curated item is missing.
- [x] Wire the homepage to the orchestration layer.
  - [x] Update the front page to read from the helper.
  - [x] Keep the current editorial layout intact.
- [x] Validate the homepage still renders correctly.
  - [x] Confirm the page builds and serves HTTP 200.
  - [x] Confirm the curated and fallback modules both render.

## Dev Agent Record

### Debug Log

- Added a dedicated homepage content helper in `src/lib/homepage-content.ts` with typed lead story and module fallbacks.
- Updated the homepage route to consume the helper while preserving the dark editorial layout from Story 1.2.
- Added unit coverage for curated and fallback homepage content behavior.
- Fixed ESLint configuration so build output under `dist/` is ignored during lint runs.
- Verified `npm run lint` passes in the canonical `bbb/kovasz` workspace.
- Verified the homepage responds with HTTP 200 at `/` and `/admin`.
- Verified the helper logic directly with an in-process TypeScript transpilation check because Vitest loading in this Windows/OneDrive environment fails with `spawn EPERM` during Vite config resolution.

### Completion Notes

- Story 1.3 now has a lightweight content orchestration layer that can be swapped for CMS-backed homepage curation later.
- The homepage still renders with the existing editorial composition and now consumes a typed module helper rather than hardcoded page-local values.
- The fallback data ensures the front page stays populated even when curated content is absent.
- The direct helper validation confirmed curated lead/module values are returned when supplied and fallback content fills gaps when omitted.

### File List

- `kovasz/src/lib/homepage-content.ts`
- `kovasz/src/app/(frontend)/page.tsx`
- `kovasz/tests/unit/homepage-content.spec.ts`
- `kovasz/eslint.config.mjs`
- `kovasz/.gitignore`

### Change Log

- Added typed homepage curation and fallback orchestration.
- Wired the homepage to the shared content helper.
- Added unit tests for curated and fallback homepage content.
- Ignored `dist/` in ESLint and repository ignores to keep validation focused on source files.

## Dev Notes

### Architecture Guardrails

- This is still a homepage story, not the CMS story.
- Keep the curation layer simple and explicit.
- Preserve the dark editorial front-page design from Story 1.2.
- Do not introduce database or admin modeling yet.

### Current Repo State

- Story 1.2 is implemented in the canonical `bbb/kovasz` workspace.
- The homepage currently uses hardcoded content modules and needs a lightweight orchestration layer.

### Technical Requirements

- Keep the curation data local and typed.
- Avoid layout shifts when a module falls back.
- Preserve the current responsive behavior.

### Project Structure Notes

- Put the content orchestration in a small shared helper so later CMS work can replace it.
- Keep the homepage page component focused on rendering.

### Testing Requirements

- Verify the helper returns a full set of modules when curated content exists.
- Verify fallback content fills gaps when curated items are missing.
- Verify the homepage still returns HTTP 200 after the refactor.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` - Epic 1, Story 1.3]
- [Source: `_bmad-output/planning-artifacts/kovasz-implementation-design-brief.md` - Homepage Direction]
- [Source: `_bmad-output/planning-artifacts/kovasz-ux-design.md` - Direction]
