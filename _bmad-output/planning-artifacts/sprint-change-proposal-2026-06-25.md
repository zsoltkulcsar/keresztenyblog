# Sprint Change Proposal: Visual Alignment to Reference Board

## 1. Issue Summary

### Triggering issue

The current Kovasz implementation is functionally complete enough to read and navigate, but the public-facing design and information architecture no longer match the approved visual reference board at `C:\Users\zsolt.kulcsar\.codex\generated_images\019ed007-759f-7080-9071-f62167358a9e\ig_0bc45cdc40c65233016a31444a9e408191a3ecf3d0486897df.png`.

### What changed

The app drifted into a workable product shell, but the layout rhythm, density, masthead treatment, and page composition do not reflect the reference. The mismatch is most visible on:

- homepage hierarchy and module density
- article detail structure and scripture emphasis
- series page layout and filter treatment
- admin dashboard split-view composition

### Core problem

This is a design-system and navigation correction, not a feature request. The product direction is still valid, but the implementation needs to be reined back to the approved reference so the public surfaces feel like the same publication system.

### Evidence

- The reference board uses a strong dark publication frame, compact editorial modules, and denser hierarchy.
- The current implementation has already advanced beyond that visual system.
- The user explicitly wants the implementation corrected to match the reference before further feature work.

## 2. Impact Analysis

### 2.1 Current epic impact

**Epic 1: Foundation and Content Platform**

- No scope change required.
- The implementation foundation is still valid.

**Epic 2: Public Editorial Site**

- Impacted directly.
- Homepage, navigation, and visual frame need correction.
- Existing public routes should be visually aligned to the reference.

**Epic 3: Reading, Series, and Daily Verse**

- Impacted directly.
- Article detail and series pages need structural and hierarchy adjustments.

**Epic 4: Admin Publishing Workflow**

- Impacted directly.
- Admin overview, list, and editor views need layout alignment to the reference board.

**Epic 5: Discovery, SEO, and Launch Readiness**

- Minor indirect impact only.
- Navigation changes may slightly affect route labels and page metadata, but the core discovery model remains valid.

### 2.2 Required epic-level changes

- No epics need to be removed or redefined.
- Epic 2 should be treated as the primary correction target.
- Epic 3 and Epic 4 need visual layout refinement stories.
- Epic 5 remains valid but may need small label/link updates if navigation names are tightened.

### 2.3 Remaining epic dependency impact

- The homepage must link cleanly into the revised article, series, daily verse, resources, and about routes.
- Article pages must consistently link to series and related content.
- Series pages must expose filters and direct routes that match the reference layout.
- Admin navigation should reflect the same content model and route naming as the public site.

### 2.4 Obsolescence / new epics

- No planned epic is obsolete.
- No new epic is needed.
- This is a correction pass inside the existing epic structure.

### 2.5 Priority and ordering

- Public homepage alignment should happen first.
- Article detail alignment should follow.
- Series and admin layout work should follow after the public reading flow is corrected.

## 3. Artifact Conflict and Impact Analysis

### 3.1 PRD conflict check

The PRD still holds. The issue does not contradict the product goals. However, the PRD’s design intent around a strong publication identity should be emphasized more clearly during implementation.

### 3.2 Architecture conflict check

No architecture changes are required.

Impacted architecture areas:

- Route composition and navigation labels
- Component layout for the public site
- Admin page density and split view

No technology stack change is needed.

### 3.3 UI/UX conflict check

The UI/UX specification needs correction emphasis, not a rewrite.

Specific UX areas requiring revision:

- homepage visual hierarchy
- dark masthead and footer treatment
- article page block ordering
- scripture block prominence
- series filter density and layout
- admin dashboard layout split

### 3.4 Other artifacts

Potential secondary updates:

- story files for Epic 2, 3, and 4
- implementation notes for navigation labels
- design handoff doc
- visual QA checklist or screenshot acceptance criteria

## 4. Path Forward Evaluation

### 4.1 Option 1: Direct Adjustment

**Viable:** Yes

The issue can be addressed by modifying existing stories and adding a correction story for the design system / navigation alignment. No rollback is needed.

**Effort estimate:** Medium  
**Risk level:** Medium

Why viable:

- The core product already exists.
- The mismatch is largely visual and structural.
- The approved reference is clear enough to guide correction.

### 4.2 Option 2: Potential Rollback

**Viable:** No

Rolling back implemented features would not solve the real problem. The issue is not a bad feature decision; it is that the current UI needs to be tightened to the source image.

**Effort estimate:** High  
**Risk level:** High

Why not viable:

- Rollback would destroy working product surface area.
- It would not guarantee a better match to the reference.
- It would slow momentum without improving the actual correction target.

### 4.3 Option 3: PRD MVP Review

**Viable:** No

The MVP scope is still sound. The problem is not scope, it is execution style and visual alignment.

**Effort estimate:** Low  
**Risk level:** Low

Why not needed:

- The planned product remains the same.
- The correction is inside the existing scope.
- No feature cuts are required.

### 4.4 Recommended path

**Selected approach:** Option 1 - Direct Adjustment

**Justification:**

- Keeps the current product momentum.
- Preserves the approved feature set.
- Focuses the next work on navigation and design-system alignment.
- Best matches the user’s request to correct the implementation to the reference board.

## 5. Detailed Change Proposals

### 5.1 Issue summary

The implementation needs a public UI correction so the homepage, article pages, series pages, and admin surfaces match the approved reference board. The correction should focus on hierarchy, density, masthead framing, and route-level navigation clarity.

### 5.2 Epic and artifact adjustment needs

**Epic 2 changes**

- Strengthen homepage as a dark publication front page.
- Tighten module spacing and hierarchy.
- Ensure public navigation matches the reference.

**Epic 3 changes**

- Rework article pages to make scripture, pull quote, and study panel more dominant.
- Rebalance article metadata and image placement.
- Make series pages read more like study paths and less like generic archives.

**Epic 4 changes**

- Rework admin dashboard into a denser split-view operational workspace.
- Improve list density and editor preview adjacency.

**Artifact updates**

- Update UX design notes with the corrected layout system.
- Update affected story files to include visual alignment acceptance criteria.

### 5.3 Recommended path rationale

Direct adjustment is the right path because the issue is constrained and visually specific. The implementation does not need a new architecture, new epic structure, or feature rollback. It needs a disciplined correction pass against a single approved reference.

### 5.4 MVP impact and action plan

The MVP remains intact.

High-level action plan:

1. Lock the reference image as the source of truth.
2. Correct public navigation and masthead treatment.
3. Recompose homepage, article, and series layouts to match the reference board.
4. Rework admin density and split view.
5. Validate with screenshots before resuming normal feature development.

### 5.5 Agent handoff plan

**Developer agent**

- Implement the layout and navigation corrections.
- Update the relevant route components and shared layout pieces.
- Validate visually against the reference board.

**Product Owner / Developer**

- Update story files and acceptance criteria if needed.
- Re-sequence remaining work if the correction affects priorities.

**Product Manager / Architect**

- Not required unless the correction reveals a deeper product scope issue.

## 6. Final Review and Handoff

### 6.1 Checklist completion

- Trigger understood: yes
- Epic impact assessed: yes
- Artifact conflicts reviewed: yes
- Path forward evaluated: yes
- Proposal drafted: yes

### 6.2 Proposal accuracy

This proposal is actionable and specific. It recommends direct correction, not rollback, and keeps the scope bounded to navigation and design alignment.

### 6.3 Approval request

Pending user approval to proceed with the correction implementation.

### 6.4 Sprint-status update

No sprint-status file is available in the current workspace. No automated status update was performed.

### 6.5 Next steps

If approved, the next work should be a visual correction pass on:

- homepage
- article detail
- series
- admin dashboard

Then the implementation can continue with normal development stories.
