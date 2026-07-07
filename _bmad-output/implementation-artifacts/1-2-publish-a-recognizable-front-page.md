---
baseline_commit: 8c27bebeb6f02fceb5eb11fe8c9c02175ee32036
---

# Story 1.2: Publish a recognizable front page

Status: review

## Story

As a reader,
I want the homepage to present Kovasz as a clear publication front page,
so that I can immediately understand what the site is and where to start reading.

## Acceptance Criteria

1. The homepage presents a publication front page, not a generic marketing landing page.
2. The first viewport includes the masthead, primary navigation, search entry point, and a featured lead story.
3. The lead story spans the full width of the content frame and acts as the visual anchor of the page.
4. The latest articles grid appears directly below the lead story.
5. Secondary modules for series, Daily Verse, and resources are present without overwhelming the editorial hierarchy.
6. The homepage uses the approved dark editorial frame and the visual tone matches the des1 reference direction.
7. The page remains responsive and readable on mobile and desktop.

## Tasks / Subtasks

- [x] Replace the starter homepage with a publication-style front page layout.
  - [x] Add a masthead and primary navigation.
  - [x] Add a visible search entry point.
  - [x] Add a full-width featured lead story.
- [x] Add the latest articles grid below the lead story.
  - [x] Show a clear list/grid of recent items.
  - [x] Preserve the editorial hierarchy on smaller screens.
- [x] Add secondary editorial modules.
  - [x] Include series, Daily Verse, and resources modules.
  - [x] Keep the modules subordinate to the lead story and latest articles.
- [x] Apply the dark editorial visual treatment.
  - [x] Use strong typography and restrained color.
  - [x] Keep the layout dense but readable.
- [x] Validate the homepage in the running app.
  - [x] Confirm the public homepage renders.
  - [x] Confirm layout is usable at common viewport sizes.

## Dev Notes

### Architecture Guardrails

- The homepage should follow the approved dark editorial direction.
- Keep the design publication-first, not product-marketing-first.
- Do not add CMS complexity for this story; the content model comes later.
- Keep the implementation server-rendered where practical.

### Current Repo State

- The starter scaffold is already in place and the app boots.
- The homepage now renders a publication-style front page and should remain aligned with the dark editorial direction.

### Technical Requirements

- Use semantic HTML and accessible navigation.
- Keep the homepage lightweight and fast.
- Avoid decorative gradients or card-in-card composition.
- Use a full-width lead story with clear visual hierarchy.

### Project Structure Notes

- Homepage changes should remain inside the Next.js App Router surface.
- Keep reusable layout and section patterns available for later article and series screens.

### Testing Requirements

- Verify the homepage responds with HTTP 200.
- Verify the lead story and latest article sections appear in the rendered page.
- Validate mobile/desktop layout behavior by inspection.

## Dev Agent Record

### Agent Model Used

GPT-5

### Debug Log References

- Created Story 1.2 from Epic 1 to continue implementation after Story 1.1.
- Replaced the default starter homepage with a publication-style front page.
- Added a local hero image asset and tuned `next.config.ts` so `next/image` accepts it.
- Verified the app boots and the homepage and admin route both return HTTP 200.

### Completion Notes List

- Homepage now presents a dark editorial front page with masthead, nav, search entry point, full-width lead story, latest grid, and secondary modules.
- Smoke validation passed on the running app.

### File List

- `kovasz/src/app/(frontend)/page.tsx`
- `kovasz/src/app/(frontend)/styles.css`
- `kovasz/next.config.ts`
- `kovasz/public/home-hero.png`
- `kovasz/dev.log` removed

### Change Log

- 2026-06-16: Implemented the publication-style front page for Story 1.2 and validated the homepage/admin routes in the running app.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md` - Epic 1, Story 1.2]
- [Source: `_bmad-output/planning-artifacts/kovasz-implementation-design-brief.md` - Homepage Direction]
- [Source: `_bmad-output/planning-artifacts/kovasz-ux-design.md` - Direction]
- [Source: `des1.png`]
