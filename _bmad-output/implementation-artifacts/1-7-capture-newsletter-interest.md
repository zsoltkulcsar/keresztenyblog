---
baseline_commit: 53d2f97
---

# Story 1.7: Capture newsletter interest

Status: review

## Story

As a reader,
I want to subscribe with my email from the public site,
so that I can receive new articles and series updates.

## Acceptance Criteria

1. The public homepage exposes a newsletter signup form.
2. Readers can submit a valid email address.
3. Invalid email input is rejected with a clear message.
4. Successful signups are stored through the CMS-backed data layer.
5. The homepage shows a visible success or error state after submission.

## Tasks / Subtasks

- [x] Add the newsletter signup data model.
- [x] Add a public newsletter submission endpoint.
- [x] Add the homepage newsletter form and status feedback.
- [x] Validate the signup flow and basic input handling.

## Dev Agent Record

### Debug Log

- Created from Epic 1 backlog.
- Added a Payload-backed `newsletter-signups` collection.
- Added a public newsletter submission endpoint and homepage signup form.
- Added success and invalid-input states on the homepage.
- Validated the signup flow by posting a sample email through the public endpoint.
- Ran `npm run lint` successfully.

### Completion Notes

- Newsletter capture now runs through a CMS-backed data model.
- The homepage signup form posts to a public endpoint and returns a visible success or error state.
- Input normalization and validation are handled before persistence.

### File List

- `_bmad-output/implementation-artifacts/1-7-capture-newsletter-interest.md`
- `.env.example`
- `src/app/(frontend)/page.tsx`
- `src/app/api/newsletter/route.ts`
- `src/collections/NewsletterSignups.ts`
- `src/lib/newsletter.ts`
- `src/payload-types.ts`
- `src/payload.config.ts`
- `src/app/(frontend)/styles.css`
- `tests/unit/newsletter.spec.ts`

### Change Log

- 2026-06-16: Created Story 1.7.
- 2026-06-16: Implemented newsletter capture through the homepage and Payload-backed signup collection.
