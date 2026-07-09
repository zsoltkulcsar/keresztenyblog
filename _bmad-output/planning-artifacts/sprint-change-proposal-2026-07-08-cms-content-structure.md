---
title: CMS Content Structure Correction
status: approved-for-implementation
created: 2026-07-08
scope: moderate
trigger: checkpoint after real starter article content
---

# Sprint Change Proposal: CMS Content Structure Correction

## 1. Issue Summary

The Kovasz starter site now has enough public pages and real article-shaped content to review the product as a publication. The checkpoint showed that the visual prototype is broadly usable, but the product direction has moved beyond the original story list in several important ways:

- Public pages no longer need Authors and Daily Verse as primary surfaces.
- Articles, Series, Resources, Books, and About now have distinct page identities.
- Articles, Topics, Audiences, and ordered Series relationships have been added to the codebase, but the public frontend still primarily reads from static starter data.
- Books should likely become a broader Reading section later, because curated reading lists will be more useful than a static book shelf.
- The original PRD still assumes Daily Verse, Author pages, newsletter capture, and broad launch-readiness work as MVP-level surfaces, which no longer matches the current practical path.

The core problem is not that the current implementation is broken. The problem is sequencing: continuing to add page features before connecting content to Payload CMS will create more static prototype code that later has to be replaced.

## 2. Checklist Findings

### 1. Understand Trigger and Context

- [x] 1.1 Triggering story identified: post-checkpoint implementation review after adding starter articles and taxonomy model.
- [x] 1.2 Core problem: strategic implementation correction. The site needs to shift from static prototype pages to CMS-backed editorial workflow.
- [x] 1.3 Evidence:
  - Checkpoint found public page identities are mostly working.
  - Current `Articles`, `Topics`, `Audiences`, and updated `Series` collections exist.
  - Static `editorial-articles.ts` still drives much of the public article/series experience.
  - PRD/epics still include Daily Verse and Author pages as MVP-level priorities, while the current direction removed them from primary navigation.

### 2. Epic Impact Assessment

- [x] 2.1 Current epics remain useful, but their priority should change.
- [x] 2.2 Epic 1 needs expansion from "seed prototype content" to "seed real starter editorial content and taxonomy".
- [x] 2.3 Epic 2 and Epic 3 should now prioritize CMS-backed content rendering over more static page polish.
- [x] 2.4 Daily Verse stories should be deferred from MVP unless the user explicitly brings the feature back.
- [x] 2.5 Epic order should shift to:
  1. CMS-backed editorial content
  2. Public page polish with real CMS data
  3. Search/discovery
  4. Launch hardening

### 3. Artifact Conflict and Impact Analysis

- [x] 3.1 PRD conflicts:
  - PRD still lists Daily Verse, Author pages, newsletter, RSS/sitemap, and broad admin publishing workflow as MVP scope.
  - Current product direction is more focused: articles, series, resources, reading/books, about, search, and admin content entry.
- [x] 3.2 Architecture conflicts:
  - Architecture is still valid: Next.js + Payload + PostgreSQL remains the right foundation.
  - Content model should be updated to treat Topics and Audiences as first-class shared taxonomies.
  - Article-to-Series membership should support zero or more series, with ordered series parts surfaced prominently.
- [x] 3.3 UX conflicts:
  - UX docs still mention optional Daily Verse modules and earlier homepage references.
  - Current correction should lock page identities and CMS-backed content flow as the next UX baseline.
- [x] 3.4 Secondary artifacts:
  - Sprint status/story list should mark Daily Verse work as deferred.
  - Future implementation stories should be reorganized around CMS-backed content.

### 4. Path Forward Evaluation

#### Option 1: Direct Adjustment

Viable.

Effort: Medium.

Risk: Low to Medium.

Use existing Payload setup, current collections, and static content as seed data. Update frontend loaders to read from Payload first with static fallback.

#### Option 2: Rollback

Not viable.

The current public page and content model work is useful. Rolling it back would lose valid design learning and implementation progress.

#### Option 3: PRD MVP Review

Viable.

Effort: Low.

Risk: Low.

The MVP should be narrowed: remove Daily Verse, public Author pages, newsletter, and comments from the immediate path unless they become needed again.

#### Recommended Path

Hybrid: Direct Adjustment plus MVP Review.

Keep the current prototype, but stop adding new public surfaces until the content system is CMS-backed.

## 3. Recommended Approach

Use a moderate correction. Do not rollback. Do not restart planning.

The next implementation slice should be:

1. Connect public Articles, Article Detail, Series, Series Detail, Resources, Books/Reading, and About to Payload-backed data where collections/globals already exist.
2. Keep static fallback data during development so the prototype still works without a populated database.
3. Seed the 11 starter articles, topics, audiences, and ordered series relationships.
4. Defer Daily Verse from active MVP navigation and implementation priority.
5. Treat Books as a temporary name; plan to rename or evolve it into Reading after the CMS-backed content slice is stable.

## 4. Detailed Change Proposals

### PRD MVP Scope

OLD:

- Public homepage, Articles, Article detail, Series, Series detail, Napi Ige, Search, Resources, About, Author pages.
- Admin CRUD for Articles, Series, Authors, Categories, Tags, Daily Verses, Resources, and Media.
- Newsletter signup in MVP.

NEW:

- Public homepage, Articles, Article detail, Series, Series detail, Resources, Books/Reading, Search, and About.
- Admin CRUD for Articles, Series, Topics, Audiences, Authors, Resources, Media, and About.
- Daily Verse, public Author pages, newsletter signup, and comments are deferred until the core publication workflow is stable.

Rationale:

The product is not blocked by Daily Verse or public author pages. It is blocked by the lack of CMS-backed editorial content flow.

### Content Model

OLD:

- Category, Tag, and Series carry most content organization.
- Article belongs to zero or one primary Series in MVP.

NEW:

- Topics and Audiences are shared taxonomies across Articles, Series, Resources, and Books/Reading.
- Series owns ordered article parts.
- Article should surface series membership near the article header, not only as related content.
- Article formats should be explicit: teaching, devotion, reflection, testimony.

Rationale:

The site is a discipleship publication. Readers should be able to browse by topic, maturity/audience, and structured learning path.

### Books / Reading

OLD:

- Books is a static recommended book catalogue.

NEW:

- Keep `/books` for the current prototype.
- Plan a later rename/evolution to Reading, covering book recommendations and curated reading lists.
- Do not implement Reading Lists until CMS-backed Articles and Series are stable.

Rationale:

A living Reading section will be more useful than a static shelf, but changing it now would distract from the CMS integration slice.

### Daily Verse

OLD:

- Daily Verse is a core MVP feature with archive and homepage module.

NEW:

- Defer Daily Verse from active MVP.
- Keep existing code only if already implemented, but do not spend more implementation time on it now.
- Remove it from primary navigation and next-step planning.

Rationale:

The user already removed Daily Verse from desired navigation and the main product value now comes from articles, series, and resources.

### Frontend Data Loading

OLD:

- Public pages use static library files for starter content.

NEW:

- Public loaders should query Payload first.
- If no database content exists, use static starter data as fallback.
- Seed scripts should create starter content idempotently.

Rationale:

This keeps local development practical while moving the product toward real editorial use.

## 5. Implementation Handoff

Scope classification: Moderate.

Route to: Developer / Quick Dev.

Approval: Approved by Zsolt.kulcsar on 2026-07-08.

### Implementation Tasks

1. Add seed records for Topics and Audiences.
2. Add seed/import path for the 11 starter articles.
3. Create or update Payload relationships so:
   - Articles reference Topics and Audiences.
   - Series references ordered Articles.
   - Resources can reference Articles, Series, Topics, and Audiences where useful.
4. Update public loaders:
   - Articles archive
   - Article detail
   - Series list
   - Series detail
   - Resources index/detail where already CMS-backed enough
5. Preserve static fallback for empty local database.
6. Update tests for CMS-backed loader behavior and fallback behavior.
7. Keep Books as-is for now; create a separate later correction for Reading if desired.
8. Mark Daily Verse as deferred in planning notes and avoid new work there.

### Success Criteria

- An editor can create or seed real article content in Payload and see it on public pages.
- The first starter series, Foundations for New Believers, can be managed as ordered article parts.
- Article pages visibly show series membership near the top.
- Topics and Audiences are reusable taxonomy records, not scattered strings.
- Static fallback still lets the prototype run without populated CMS content.
- No additional public pages are introduced during this slice.

## 6. Recommended Next Command

After approval, run:

```text
bmad-quick-dev connect the public Articles, Article Detail, Series, Series Detail, Topics, Audiences, and Resources flows to Payload CMS data with static fallback. Seed the starter articles, topics, audiences, and ordered series relationships. Defer Daily Verse and keep Books unchanged for now.
```
