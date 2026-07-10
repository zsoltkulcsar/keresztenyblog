# Sprint Change Proposal

## Issue Summary

The public site had two linked problems:

- navigation was incomplete or weak between the main editorial surfaces
- the visual system drifted away from the approved `des1` reference and read too much like a generic CMS front end

This showed up after the first implementation batches: the content worked, but readers could not move cleanly between the publication surfaces, and the public chrome did not yet feel like a dark editorial journal.

## Impact Analysis

### Epic Impact

- Epic 1: discovery and front page navigation needed stronger route coverage
- Epic 2: article pages needed more explicit back-links and surrounding surface links
- Epic 3: series and Daily Verse pages needed clearer cross-route movement
- Epic 5: resources and about pages needed to exist as real public destinations

### Story Impact

- Existing implemented stories needed navigation and frame alignment updates
- The correction did not require re-scoping the epics; it required tightening the current implementation

### Artifact Conflicts

- UX direction required a stronger publication frame and denser editorial chrome
- PRD/epics already assumed `resources` and `about` as real surfaces, so the implementation needed to catch up

### Technical Impact

- Added site-wide chrome with shared header and footer
- Added missing public `resources` and `about` routes
- Added explicit page-level route links on article, series, and Daily Verse detail pages
- Updated sitemap/discovery coverage for the new public pages

## Recommended Approach

Direct adjustment was the right path.

Reason:

- the existing implementation was structurally sound
- the missing pieces were route coverage and visual framing, not a rollback-worthy architecture problem
- the fix could be applied without changing the CMS foundation or content model

Effort:

- small to moderate

Risk:

- low, because the changes were limited to public navigation, page chrome, and two missing public pages

## Detailed Change Proposals

### Navigation

- Add persistent site chrome with a visible primary navigation
- Add footer links to the same major editorial surfaces
- Add page-level route links on article, series, and Daily Verse detail pages

### Design System Alignment

- Introduce a stronger publication frame around the public site
- Use a darker masthead/footer and denser editorial spacing
- Keep cards sparse and reserve them for repeated content blocks
- Reduce the generic CMS feel in the public reader surfaces

### Public Routes

- Add `/resources`
- Add `/about`
- Keep the existing article, series, Daily Verse, archive, and search routes connected through explicit links

## Implementation Handoff

Scope classification: Minor-to-moderate

Handoff:

- Developer agent can implement directly

Success criteria:

- readers can move between the major public surfaces without dead ends
- the homepage and detail pages read like a unified publication
- the public frame feels materially closer to the reference design
