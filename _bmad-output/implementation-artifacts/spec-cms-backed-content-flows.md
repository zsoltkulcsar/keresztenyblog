---
title: 'CMS-backed content flows'
type: 'feature'
created: '2026-07-08'
status: 'in-review'
baseline_commit: '0f9b1254562408963f66016f299e85cfd575bee8'
context:
  - '{project-root}/_bmad-output/planning-artifacts/sprint-change-proposal-2026-07-08-cms-content-structure.md'
---

<frozen-after-approval reason="human-owned intent -- do not modify unless human renegotiates">

## Intent

**Problem:** Kovasz has real article-shaped starter data and Payload collections for Articles, Topics, Audiences, Series, and Resources, but the public article and series flows still mainly read from static files. Continuing to polish static pages will create replacement work before the editor workflow is usable.

**Approach:** Move the public content loaders to query Payload first and fall back to static starter data when the database is empty or unavailable. Seed starter topics, audiences, articles, resources, and ordered series relationships idempotently during local bootstrap so the admin and public site share the same editorial structure.

## Boundaries & Constraints

**Always:** Keep the public pages working without a populated database. Preserve current public routes and visual layouts. Seed data must be safe to rerun locally. Series membership must stay visible near the top of article detail pages. Topics and Audiences must be reusable CMS records, not scattered strings in new code.

**Ask First:** Any rename from Books to Reading; any Daily Verse work; any public comments, user posting, or moderation workflow; any destructive database reset or production-affecting migration.

**Never:** Do not remove static fallback data. Do not rebuild the admin UI from scratch. Do not add new public pages in this slice. Do not change Books beyond avoiding new dependency on it. Do not reintroduce Daily Verse as an active feature.

## I/O & Edge-Case Matrix

| Scenario            | Input / State                                                          | Expected Output / Behavior                                                                                             | Error Handling                                             |
| ------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| CMS content exists  | Payload returns published articles, topics, audiences, and series      | Article archive/detail and series list/detail render CMS records, ordered by published date or configured series order | Ignore draft records on public pages                       |
| Empty database      | Payload is available but target collections have no usable public docs | Public pages render current starter fallback content                                                                   | No user-facing error                                       |
| Payload unavailable | `getCmsPayload()` returns null or query throws                         | Public pages render current starter fallback content                                                                   | Catch query errors inside loader boundary                  |
| Seed rerun          | Bootstrap runs after starter records already exist                     | Existing records update or remain stable without duplicate slug errors                                                 | Match records by slug or email, use `overrideAccess`       |
| Ordered series      | Series has ordered article relationships                               | Series detail and article previous/next use explicit order                                                             | Fall back to static order if relationship docs are missing |

</frozen-after-approval>

## Code Map

- `src/payload/bootstrap.ts` -- local bootstrap entry point for dev admin; extend with starter content seed.
- `src/lib/editorial-articles.ts` -- static starter article source and fallback content.
- `src/lib/article-archive.ts` -- archive data shape, filters, pagination, static fallback conversion.
- `src/lib/article-detail.ts` -- article detail model, series navigation, static fallback conversion.
- `src/lib/series.ts` -- series list/detail helpers and static fallback series.
- `src/lib/resources.ts` -- already queries Payload first; align resource seed/fallback links with real slugs.
- `src/collections/Articles.ts` -- article schema, status, relationships, rich text body.
- `src/collections/Series.ts` -- ordered article relationships and topic/audience relationships.
- `src/collections/Resources.ts` -- resource schema currently uses text topic/audience and slug relations.
- `src/payload.config.ts` -- collection registration and bootstrap hook.
- `tests/unit/article-archive.spec.ts` -- archive fallback behavior.
- `tests/unit/article-detail.spec.ts` -- detail fallback and series navigation behavior.
- `tests/unit/series.spec.ts` -- series fallback ordering behavior.

## Tasks & Acceptance

**Execution:**

- [x] `src/payload/bootstrap.ts` -- add idempotent dev seed for Topics, Audiences, Authors, Resources, Articles, and Series -- gives the admin real starter content.
- [x] `src/lib/cms-content.ts` -- add shared Payload query and normalization helpers -- keeps article/archive/series loaders consistent.
- [x] `src/lib/article-archive.ts` -- expose async CMS-backed archive loader while preserving sync fallback helper for tests and static consumers.
- [x] `src/lib/article-detail.ts` -- expose async CMS-backed detail loader and slug list while preserving sync fallback helper.
- [x] `src/lib/series.ts` -- expose async CMS-backed series list/detail helpers while preserving static fallback helper.
- [x] `src/app/(frontend)/**/*.tsx` article/series/home consumers -- switch server components to async CMS-backed loaders where needed.
- [x] `src/collections/Resources.ts` -- add optional topic/audience relationship fields without removing existing text fields -- supports taxonomy reuse while preserving current resource data.
- [x] `tests/unit/*.spec.ts` -- update/add focused tests for fallback behavior and seeded slug consistency.

**Acceptance Criteria:**

- Given no database or a failed Payload query, when visiting Articles, Article Detail, Series, Series Detail, Resources, or Home, then current starter content still renders.
- Given seeded CMS content, when visiting Articles and Article Detail, then public pages use CMS article records and exclude drafts.
- Given a seeded ordered series, when visiting its detail page or article parts, then lesson order and previous/next navigation follow the series order.
- Given repeated local startup, when bootstrap seeding runs, then records are not duplicated by slug and the dev admin remains usable.
- Given Resources are seeded, when viewing the Resources index/detail, then resources can still render with existing text fields and may also reference taxonomy records.

## Design Notes

Use Payload as the preferred content source only at server-loader boundaries. Keep existing static data types as the fallback contract to avoid rewriting page components unnecessarily. Convert CMS rich text body into the current simple section/body representation for now; richer rendering can be a later article-editor improvement.

## Verification

**Commands:**

- `npm run generate:types` -- expected: Payload types include updated relationships.
- `npm run lint` -- expected: no ESLint errors.
- `npm run test:int` -- expected: unit/integration suite passes.
- Route smoke checks for `/`, `/articles`, `/articles/what-happened-when-you-believed`, `/series`, `/series/foundations-for-new-believers`, `/resources`, `/resources/bible-study-aids` -- expected: HTTP 200.
