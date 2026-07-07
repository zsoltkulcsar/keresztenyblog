---
baseline_commit: 06d5f3bbcf9ddb090c1b78cd111b9e927c0fd2f0
---

# Story 4.1: Authenticate editors with role-based access

Status: review

## Story

As an admin or editor,
I want secure sign-in and role-based access,
so that only authorized people can manage the publication.

## Acceptance Criteria

1. The CMS user model includes explicit roles for admin and editor.
2. Admin-only areas are restricted to admin users.
3. Editors can access the content areas they are allowed to manage.
4. Unauthenticated users cannot access admin pages.
5. The access rules are centralized and reusable across collections.

## Tasks / Subtasks

- [x] Add a role field to the CMS user model.
- [x] Create shared role-based access helpers for admin/editor/public use.
- [x] Apply role-based access rules to the CMS collections.
- [x] Add tests for role checks and collection access behavior.

## Dev Agent Record

### Debug Log

- Created from Epic 4 backlog.
- Added an explicit `role` field to the CMS user model.
- Centralized role checks and admin/editor access helpers.
- Applied role-based access and admin visibility rules to users, media, newsletter signups, series, and daily verse.
- Added unit coverage for the shared role helpers and collection configuration.
- Validated with `npm run lint` and `npx tsc --noEmit`.

### Completion Notes

- Role-based CMS access is now enforced from a shared helper layer.
- Admin-only collections and editor-managed content collections are separated in the admin UI.
- The first-user bootstrap path remains intact while new users default to the admin role.
- Validation passed with lint and TypeScript.

### File List

- `_bmad-output/implementation-artifacts/4-1-authenticate-editors-with-role-based-access.md`
- `src/collections/DailyVerse.ts`
- `src/collections/Media.ts`
- `src/collections/NewsletterSignups.ts`
- `src/collections/Series.ts`
- `src/collections/Users.ts`
- `src/payload/access.ts`
- `src/payload-types.ts`
- `tests/unit/payload-access.spec.ts`
- `tests/unit/payload-collections.spec.ts`
- `tests/helpers/seedUser.ts`

### Change Log

- 2026-06-17: Created Story 4.1.
- 2026-06-17: Implemented role-based CMS access and user role modeling.
