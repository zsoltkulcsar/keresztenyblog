---
baseline_commit: 8c27bebeb6f02fceb5eb11fe8c9c02175ee32036
---

# Story 1.1: Initialize the Payload/Next.js starter

Status: review

## Story

As a developer,
I want the project scaffolded from the approved starter template,
so that the public site and CMS share a working foundation before feature work begins.

## Acceptance Criteria

1. The repository is initialized from `create-payload-app` rather than a custom Next.js or Vite scaffold.
2. Running the local development command starts both the Next.js app and the Payload admin route successfully.
3. The production database adapter is configured for PostgreSQL using `@payloadcms/db-postgres`.
4. Environment templates exist for local development, including database connection settings and any required app secrets.
5. The starter includes baseline linting, formatting, and test scripts suitable for the rest of the implementation work.
6. The project structure reflects the approved architecture, including the Next.js App Router and Payload integration.
7. A quick smoke check confirms the app boots cleanly after install and the admin route is reachable.

## Tasks / Subtasks

- [x] Initialize the repository with `create-payload-app` and verify the generated app structure matches the approved starter.
  - [x] Preserve the chosen project naming and wire it into the generated config.
  - [x] Remove any placeholder Vite-only assumptions from the current repo shell.
- [x] Configure Payload to use PostgreSQL in development and prepare the connection settings for production.
  - [x] Add the `@payloadcms/db-postgres` adapter.
  - [x] Wire the database connection through environment variables.
- [x] Establish the base application layout for Next.js App Router plus Payload admin access.
  - [x] Ensure the public app and admin route can coexist in the same codebase.
  - [x] Confirm route groups and file placement match the architecture.
- [x] Add baseline tooling required for implementation.
  - [x] Lint script.
  - [x] Format script.
  - [x] Test script.
  - [x] Environment example file.
- [x] Run a smoke validation of the starter.
  - [x] Start the app locally.
  - [x] Confirm the public app renders.
  - [x] Confirm the Payload admin route loads.

## Dev Notes

### Architecture Guardrails

- This story must use the approved starter: `create-payload-app`.
- The public site is built on Next.js App Router and should follow server-components-first defaults.
- Payload owns the CMS/admin surface, auth, access control, and content foundation.
- PostgreSQL is the committed production database.
- Do not introduce a custom backend or a separate CMS layer for this story.
- Keep the scaffold aligned with the architecture's route group expectations rather than inventing a new directory layout.

### Current Repo State

- The current repository shell is still a minimal placeholder package with a Vite-era `package.json`.
- This story should replace that placeholder setup with the approved Payload/Next.js starter shape.
- Implementation work later stories expect the starter scaffold, so do not defer the core bootstrap decisions.

### Technical Requirements

- Use TypeScript from the start.
- Keep the starter compatible with the project’s long-form publication requirements: route metadata, RSS/sitemap later, and editorial content modeling.
- Use PostgreSQL adapter wiring that expects a `DATABASE_URL`-style connection string.
- Keep admin and public routes in one application so preview and editorial workflows remain simple.
- Prefer conventional Next.js/App Router conventions for layouts, pages, and route handlers.

### Project Structure Notes

- Public routes should live under the Next.js App Router surface.
- Payload config and CMS collections will live in the same codebase, not a separate service repo.
- This story is the root scaffold; later stories will add collections, collections access rules, and public feature pages on top of it.
- The initial file tree should leave room for the architecture’s `src/app`, `src/components`, `src/collections`, `src/globals`, and `src/lib` organization.

### Testing Requirements

- Verify the app starts with the intended local dev command.
- Verify the admin route loads without a broken build or missing adapter error.
- Add only lightweight starter checks here; deeper feature tests belong to later stories.
- Preserve room for later Playwright and unit test additions, but do not overbuild a test harness that is not yet needed.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` - Epic 1, Story 1.1]
- [Source: `_bmad-output/planning-artifacts/architecture.md` - Selected Starter: `create-payload-app`]
- [Source: `_bmad-output/planning-artifacts/architecture.md` - Project Structure & Boundaries]
- [Source: `_bmad-output/planning-artifacts/architecture.md` - First Implementation Priority]
- [Source: `_bmad-output/planning-artifacts/kovasz-prd.md` - 4.8 Admin and Editorial Workflow]
- [Source: `_bmad-output/planning-artifacts/kovasz-ux-design.md` - Direction]
- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Payload installation documentation](https://payloadcms.com/docs/getting-started/installation)
- [Payload PostgreSQL adapter documentation](https://payloadcms.com/docs/database/postgres)

## Dev Agent Record

### Agent Model Used

GPT-5

### Debug Log References

- Mirrored the approved Payload/Next.js starter into the canonical `bbb/kovasz` workspace.
- Replaced the broken `node_modules` junction with a real local dependency tree in `bbb/kovasz`.
- Configured PostgreSQL adapter wiring and preserved the CMS/public route split.
- Fixed ESLint configuration so `npm run lint` passes.
- Removed the redundant root `src/app/layout.tsx` that caused nested `html`/`body` rendering.
- Verified the dev server boots cleanly and serves both `/` and `/admin`.

### Completion Notes List

- Canonical scaffold is in place under `bbb/kovasz`.
- Lint passes cleanly.
- `npm run dev` boots successfully.
- Public homepage and Payload admin route both return HTTP 200.
- Temporary mirror workspace and transient build/log artifacts were removed.

### File List

- `kovasz/package.json`
- `kovasz/package-lock.json`
- `kovasz/docker-compose.yml`
- `kovasz/.env`
- `kovasz/.env.example`
- `kovasz/eslint.config.mjs`
- `kovasz/next.config.ts`
- `kovasz/src/app/(frontend)/layout.tsx`
- `kovasz/src/app/(frontend)/page.tsx`
- `kovasz/src/payload.config.ts`
- `kovasz/src/payload-types.ts`
- `kovasz/src/collections/Users.ts`
- `kovasz/src/collections/Media.ts`
- `kovasz/tests/e2e/admin.e2e.spec.ts`
- `kovasz/tests/e2e/frontend.e2e.spec.ts`
- `kovasz/tests/int/api.int.spec.ts`
- `kovasz/src/app/layout.tsx` deleted

### Change Log

- 2026-06-16: Implemented the approved Payload/Next.js starter in the canonical `bbb/kovasz` workspace, configured PostgreSQL, fixed linting, validated local boot, and removed the duplicate mirror workspace.
