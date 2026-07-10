---
title: 'Topic and audience discovery flows'
type: 'feature'
created: '2026-07-10'
status: 'done'
context:
  - '{project-root}/_bmad-output/implementation-artifacts/spec-cms-backed-content-flows.md'
  - '{project-root}/_bmad-output/planning-artifacts/kovasz-prd.md'
  - '{project-root}/_bmad-output/planning-artifacts/kovasz-epics.md'
---

## Intent

**Problem:** Kovasz now has shared Topic and Audience concepts in the CMS/content model, but the BMAD plan did not document the public discovery pages that were implemented after the CMS-backed Articles, Series, and Resources work.

**Approach:** Treat Topics and Audiences as cross-content discovery hubs. They aggregate Articles, Series, and Resources using the existing CMS-backed loaders with static fallback so the public site remains useful when Payload is empty or unavailable.

## Boundaries & Constraints

**Always:** Preserve the existing public navigation. Keep Articles, Series, and Resources as the primary content sections. Keep Topic and Audience pages available for discovery, sitemap, and internal linking. Use static starter data as fallback. Normalize obvious taxonomy aliases such as `new-believer` and `new-believers`.

**Ask First:** Any change that puts Topics or Audiences into the primary navbar; any rename of Books to Reading; any public comments or user-generated taxonomy.

**Never:** Do not remove static fallback data. Do not make Topic/Audience pages article-archive clones. Do not revive Daily Verse scope in this slice.

## Code Map

- `src/lib/taxonomy.ts` -- builds Topic/Audience indexes and detail pages from Articles, Series, and Resources.
- `src/lib/article-archive.ts` -- exposes article topic/audience facets used by taxonomy aggregation.
- `src/lib/series.ts` -- supplies series topic/audience metadata.
- `src/lib/resources.ts` -- supplies resource topic/audience metadata and filters drafts out of public CMS results.
- `src/lib/discovery-metadata.ts` -- includes Topic/Audience routes in public discovery output.
- `src/app/(frontend)/topics/page.tsx` -- Topic index page.
- `src/app/(frontend)/topics/[slug]/page.tsx` -- Topic detail page.
- `src/app/(frontend)/audiences/page.tsx` -- Audience index page.
- `src/app/(frontend)/audiences/[slug]/page.tsx` -- Audience detail page.
- `tests/unit/taxonomy.spec.ts` -- taxonomy URL, count, alias, and detail filtering coverage.

## Tasks & Acceptance

**Execution:**

- [x] Add reusable taxonomy loader for Topic and Audience summaries/details.
- [x] Add public `/topics`, `/topics/[slug]`, `/audiences`, and `/audiences/[slug]` routes.
- [x] Aggregate Articles, Series, and Resources under each taxonomy detail page.
- [x] Include Topic and Audience routes in discovery metadata/sitemap generation.
- [x] Add focused unit tests for taxonomy behavior.

**Acceptance Criteria:**

- Given starter content only, when visiting Topic and Audience pages, then indexes and details render without a CMS connection.
- Given CMS-backed content, when content exposes topics/audiences, then taxonomy pages aggregate matching Articles, Series, and Resources.
- Given common singular/plural audience variants, when building taxonomy groups, then equivalent values resolve to the same public slug.
- Given a sitemap/discovery build, when taxonomy entries have content, then their public routes are included.

## Verification

**Commands:**

- `npm run lint` -- passed.
- `npm run test:int` -- passed, 18 files and 51 tests.
- HTTP smoke checks passed for `/topics`, `/topics/pastoral-theology`, `/audiences`, and `/audiences/new-believers`.

## Documentation Reconciliation Notes

- This spec is intentionally separate from `spec-cms-backed-content-flows.md` because that earlier approved slice explicitly excluded new public pages.
- Planning docs were updated on 2026-07-10 to add FR-4A and Story 2.4 for Topic/Audience discovery.
- Daily Verse remains deferred even though older PRD/epic text still lists it as planned MVP scope.
