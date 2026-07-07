---
baseline_commit: d051d46
---

# Story 3.3: Manage Daily Verse entries

Status: review

## Story

As an editor,
I want to create date-bound Daily Verse entries,
so that readers can receive a recurring Scripture rhythm.

## Acceptance Criteria

1. The CMS exposes a Daily Verse collection that editors can manage.
2. A Daily Verse entry can store Scripture text, reference, note, date, and status.
3. The model supports date-bound publishing and simple archive browsing.

## Tasks / Subtasks

- [x] Add the Daily Verse content model to Payload.
- [x] Define helper data for public archive rendering.
- [x] Keep the model ready for date-bound publishing.
- [x] Validate the collection shape and generated types.

## Dev Agent Record

### Debug Log

- Created from Epic 3 backlog.

### Completion Notes

- Added the `daily-verse` Payload collection with date, reference, text, note, and status fields.
- Added typed Daily Verse helper data for the public archive and detail pages.
- Synced `src/payload-types.ts` manually after `payload generate:types` hit the Windows/OneDrive spawn limitation.
- Added unit coverage for the helper layer and the collection shape.

### File List

- `_bmad-output/implementation-artifacts/3-3-manage-daily-verse-entries.md`
- `src/collections/DailyVerse.ts`
- `src/lib/daily-verse.ts`
- `src/payload.config.ts`
- `src/payload-types.ts`
- `tests/unit/daily-verse.spec.ts`
- `tests/unit/daily-verse-collection.spec.ts`

### Change Log

- 2026-06-16: Created Story 3.3.
- 2026-06-16: Implemented Daily Verse collection, helper data, and validation coverage.
