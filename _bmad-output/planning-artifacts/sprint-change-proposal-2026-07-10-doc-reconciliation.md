---
title: BMAD documentation reconciliation for current Kovasz code
created: 2026-07-10
status: approved-applied
scope: minor
---

# Sprint Change Proposal: BMAD Documentation Reconciliation

## 1. Issue Summary

The current Kovasz codebase moved ahead of the BMAD documentation. The CMS-backed content flow spec is complete, but the implemented Topic and Audience public discovery routes were not represented in PRD, epics, architecture, UX, or implementation artifacts.

This was discovered while checking whether BMAD documentation matched the code after the CMS-backed content and taxonomy work.

## 2. Impact Analysis

**Epic Impact:** Epic 2 needs one additional story for Topic/Audience discovery hubs. Epic 5 discovery metadata scope needs to include Topic and Audience routes.

**Story Impact:** Existing stories remain valid. A new Story 2.4 documents the implemented `/topics`, `/topics/[slug]`, `/audiences`, and `/audiences/[slug]` flows.

**Artifact Conflicts:** The older CMS-backed flow spec intentionally said no new public pages. The correct fix is not to rewrite that approved intent, but to add a follow-up implementation spec for the taxonomy pages.

**Technical Impact:** No code changes are required for this reconciliation. Existing code already includes `src/lib/taxonomy.ts`, public Topic/Audience routes, discovery metadata updates, and unit tests.

## 3. Recommended Approach

Use **Direct Adjustment**.

Rationale: the implemented behavior is compatible with the product direction. It does not require rollback or MVP reduction. It only requires BMAD documentation to catch up with the code and make the taxonomy discovery surface explicit.

Effort: Low.

Risk: Low.

## 4. Detailed Change Proposals

**PRD**

- Add Topic and Audience to the glossary.
- Add reader journey for browsing by topic/audience.
- Add FR-4A for Topic/Audience discovery.
- Add Topic/Audience pages to MVP public scope.

**Epics**

- Add Story 2.4: Implement topic and audience discovery hubs.
- Expand discovery metadata acceptance to include Topics and Audiences.

**Architecture**

- Add Topic/Audience routes.
- Add Topics and Audiences collections to the content model.
- Document relationships from Articles, Series, and Resources to shared taxonomy.
- Document dynamic server rendering with static fallback for Topic/Audience pages.

**UX**

- Add Topic and Audience surfaces as cross-content discovery paths.
- Clarify that they should not become article archive clones.

**Implementation Artifacts**

- Add `spec-topic-audience-discovery-flows.md` with code map, acceptance criteria, verification, and reconciliation notes.

## 5. Implementation Handoff

Scope classification: **Minor**.

Handoff: Developer agent can continue from the updated docs. No product or architecture replan is required.

Success criteria:

- BMAD docs mention implemented Topic/Audience flows.
- The older CMS-backed content spec remains historically accurate.
- Future BMAD work can reference Story 2.4 and `spec-topic-audience-discovery-flows.md`.

## 6. Checklist Summary

- [x] Trigger identified: documentation/code drift after CMS-backed taxonomy implementation.
- [x] Epic impact assessed.
- [x] PRD, architecture, UX, and implementation artifact conflicts assessed.
- [x] Direct adjustment selected.
- [x] Documentation updates applied.
- [x] No rollback or MVP reduction required.
