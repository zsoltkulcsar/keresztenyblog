---
title: Page Pattern Correction
status: approved-for-implementation
created: 2026-07-06
scope: minor
---

# Sprint Change Proposal: Page Pattern Correction

## 1. Issue Summary

The current public pages are drifting toward one repeated pattern: large intro, filter controls, card grid, and similar detail blocks. This creates visual consistency, but it weakens the product because Articles, Series, Resources, and detail pages serve different reader jobs.

The triggering evidence is the Resources implementation: although functionally correct, it visually behaves like the Articles archive. The same risk applies across the broader public surface if every page continues to reuse archive/card/detail blocks.

## 2. Impact Analysis

### Epic Impact

- Epic 2 remains valid, but its public editorial surfaces need stronger page-specific patterns.
- Epic 3 remains valid, but Series and Article Detail should not share generic archive conventions.
- Epic 5 remains valid, but Resources should be treated as a practical study library/toolbox, not another archive.

### Story Impact

- Article archive can keep the editorial archive pattern.
- Series list/detail should move toward guided study paths and ordered learning structure.
- Resources list/detail should move toward library/toolbox and usage guidance.
- Article detail should stay Scripture-first and reading-oriented.

### Artifact Impact

- PRD: no MVP scope change.
- Architecture: no system architecture change.
- UX/design: update implementation interpretation so shared components do not force identical page structures.
- Code: adjust Resources first as the proving slice.

## 3. Recommended Approach

Use direct adjustment. Do not rollback current work and do not reopen MVP scope.

The correction is a UX implementation rule:

- Articles = editorial archive and reading flow.
- Series = guided study paths.
- Resources = curated study library/toolbox.
- Article Detail = Scripture-first reading artifact.
- Resource Detail = usage/instruction artifact.

Effort is low to medium. Risk is low because this can be done page by page without changing the CMS foundation.

## 4. Detailed Change Proposals

### UX Direction

OLD:

- Reuse archive/card/detail blocks across public content surfaces for consistency.

NEW:

- Reuse tokens, typography, spacing, and navigation, but use distinct information patterns per content type.
- Avoid making Resources, Series, and Articles visually interchangeable.

Rationale:

Consistency should come from the design system, not from repeating the same page skeleton.

### Resources Page

OLD:

- Featured resource plus type filters plus grid cards, similar to Articles.

NEW:

- Compact library header.
- Start-here toolbox panel.
- Need-based quick routes.
- Type shelves grouped by use.
- Compact utility cards emphasizing audience, use, and action.

Rationale:

Resources are practical aids. The page should help readers choose the right tool, not browse a publication archive.

### Resource Detail

OLD:

- Detail page resembles article detail through hero, visual, facts, and related cards.

NEW:

- Treat resource detail as an instruction page: what it is, who it helps, how to use it, and where it connects.

Rationale:

Resource detail is not long-form reading. It should support action and usage.

## 5. Implementation Handoff

Scope: Minor.

Immediate implementation:

1. Redesign `/resources` as a curated study library/toolbox.
2. Preserve existing CMS-backed resource data.
3. Keep filters URL-driven.
4. Avoid changing Articles or Series code in this slice.

Success criteria:

- Resources no longer feels like the Articles archive.
- Readers can scan by need, type, audience, and action.
- The page remains responsive and uses the same visual identity without repeating the article grid pattern.
