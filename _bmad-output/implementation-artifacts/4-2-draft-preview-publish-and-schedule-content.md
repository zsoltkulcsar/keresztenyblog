---
baseline_commit: 06d5f3bbcf9ddb090c1b78cd111b9e927c0fd2f0
---

# Story 4.2: Draft, preview, publish, and schedule content

Status: review

## Story

As an editor,
I want to draft, preview, publish, unpublish, and schedule content,
so that I can manage the publication lifecycle without developer help.

## Acceptance Criteria

1. The content collections support drafts and version history.
2. Editors can preview content before it is published.
3. Editors can publish, unpublish, and schedule content changes.
4. Public pages reflect the published state after revalidation.
5. Draft and publish controls are visible in the CMS workflow.

## Tasks / Subtasks

- [x] Enable draft/version support on the content collections that need editorial workflow.
- [x] Add preview URL helpers for the content collections.
- [x] Ensure the publish and unpublish workflow is configured in the CMS.
- [x] Add tests for draft, preview, and publish configuration.

## Dev Agent Record

### Debug Log

- Created from Epic 4 backlog.
- Enabled draft/version workflow with schedule-publish support on the editorial collections.
- Added reusable preview URL helper logic and wired it into series and daily verse.
- Kept the public publication URLs aligned with the CMS collection slugs.
- Added unit tests for the workflow config and preview URL generation.
- Validated with `npm run lint`, `npx tsc --noEmit`, and runtime assertions against the compiled modules.

### Completion Notes

- The CMS now supports drafts, publish/unpublish, scheduled publication, and preview entry points for the editorial collections that need workflow control.
- Preview URLs are routed through the collection config so the admin UI can open the matching public paths.
- Validation passed with lint, TypeScript, and a direct runtime assertion pass.

### File List

- `_bmad-output/implementation-artifacts/4-2-draft-preview-publish-and-schedule-content.md`
- `src/collections/DailyVerse.ts`
- `src/collections/Series.ts`
- `src/payload/preview.ts`
- `tests/unit/payload-access.spec.ts`
- `tests/unit/payload-collections.spec.ts`

### Change Log

- 2026-06-17: Created Story 4.2.
- 2026-06-17: Implemented draft, preview, and scheduling workflow support for the editorial collections.
