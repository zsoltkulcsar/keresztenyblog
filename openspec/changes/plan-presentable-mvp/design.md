## Context

GitHub issue: https://github.com/zsoltkulcsar/blog/issues/7

Keskeny Út currently has a first homepage prototype in React/Vite/Tailwind. The MVP must become a partner-presentable editorial product for pastors, writers, translators, and ministry partners. The presentation needs to prove content seriousness, theological outlook, design quality, usability, and a credible path toward serving thousands of readers.

The publication direction is Hungarian-language, Reformed/Protestant, with original articles and translated articles inspired by sources such as Desiring God and The Gospel Coalition. The MVP needs real article reading experiences, not just homepage cards.

## Goals / Non-Goals

**Goals:**
- Build a partner-presentable MVP with real navigation and real sample article pages.
- Demonstrate the editorial identity through several polished Hungarian articles or realistic article drafts.
- Support article metadata needed for original and translated content: title, slug, excerpt, author, translator, source, original URL, category, topic tags, series, publish date, reading time, and status.
- Define a CMS plus database architecture for article writing, editorial review, translation tracking, publishing, and later scaling.
- Keep newsletter signup visual-only in the MVP, but design the UI so provider integration can be added later.
- Show how the product can scale to thousands of readers through static generation/caching, structured content, SEO, and a sane publishing workflow.

**Non-Goals:**
- Build a donation platform, event calendar, sermon player, membership area, or church administration tool.
- Implement user accounts for readers in the MVP.
- Implement a live newsletter provider integration in the MVP.
- Build a full custom CMS from scratch.
- Finalize all long-term theology/editorial policy beyond the MVP-level Reformed/Protestant direction.

## Decisions

### Decision: Keep the MVP centered on content and outlook

The MVP SHALL prove the site through real article reading, clear theological/editorial positioning, and polished navigation before adding community or operational features.

Rationale: The target partners are pastors, writers, and translators. They need to see whether this can become a serious publication, not a generic website shell.

Alternative considered: Focus on technical platform features first. Rejected because partners will judge the publication mostly by content quality, editorial seriousness, and presentation.

### Decision: Add article detail pages as a core MVP surface

The MVP SHALL include readable article detail pages with metadata, author/translator/source context, recommended content, and a clean reading layout.

Rationale: A magazine MVP without article pages cannot prove the reader experience.

Alternative considered: Keep all content on the homepage for the MVP. Rejected because it would remain a prototype rather than a presentable publication.

### Decision: Use a headless CMS with database-backed content

The MVP SHOULD be designed around a headless CMS backed by a real database. A practical first recommendation is Sanity or Payload CMS for editorial authoring, with the implementation decision captured before build. If self-hosting and database ownership matter most, Payload CMS with PostgreSQL is the stronger long-term direction; if speed and editor experience matter most, Sanity is the lower-friction MVP path.

Rationale: The user explicitly needs CMS support for article writing and posting, plus a database. The content model includes translations, editorial workflow, and future scale, which should not live only in hardcoded arrays.

Alternative considered: Use local Markdown/MDX only. Rejected for the full MVP because writers and translators need a publishing workflow.

### Decision: Treat translations as first-class content

The content model SHALL support translated articles with source publication, source URL, translator, permissions/status notes, and original author metadata.

Rationale: Translation from Desiring God and The Gospel Coalition is part of the intended editorial work. Attribution and permission tracking need to be explicit from the beginning.

Alternative considered: Store translation notes in free text. Rejected because permissions/source attribution can become legally and editorially important.

### Decision: Newsletter remains visual-only for MVP

The MVP SHALL keep newsletter signup non-submitting or demo-only, while preserving a later integration point.

Rationale: Newsletter infrastructure is not needed to prove the publication to partners yet. It should not distract from content and CMS planning.

Alternative considered: Integrate a newsletter provider now. Deferred until the publication has clearer launch and audience plans.

### Decision: Present scale through architecture, not premature complexity

The MVP SHALL include a documented scale path: static rendering or cached pages, image optimization, SEO-friendly routes, structured content, analytics later, and CDN-friendly deployment.

Rationale: Partners need confidence this can grow to thousands of readers, but the MVP does not need complex distributed infrastructure.

Alternative considered: Build custom backend scale features immediately. Rejected as premature.

## Risks / Trade-offs

- CMS choice too early → Mitigation: compare Sanity and Payload before implementation and capture the decision in tasks.
- Translation permissions unclear → Mitigation: model permission/status fields and avoid publishing real translated content without permission.
- MVP grows too broad → Mitigation: keep first MVP to homepage, article pages, topics/series browsing, author/translator context, CMS-backed content model, and deployment.
- Design becomes generic → Mitigation: evaluate every page against the Reformed/Protestant editorial identity and partner-readiness criteria.
- Hungarian content quality becomes the bottleneck → Mitigation: include a small but polished seed set of articles and drafts rather than many weak placeholders.

## Migration Plan

1. Review the current prototype and keep the strongest visual patterns.
2. Decide CMS/database path before implementation tasks begin.
3. Refactor content from hardcoded arrays into a content model compatible with the selected CMS.
4. Add article, topic, series, and author/translator routes.
5. Seed the MVP with a small real content set.
6. Deploy the MVP to a shareable environment for partner review.
7. Capture partner feedback as new GitHub issues and OpenSpec changes.

Rollback is straightforward while content is read-only: keep the current prototype commit as the fallback and ship the MVP behind a separate branch or deployment preview until approved.

## Open Questions

- Which CMS/database path should be selected for implementation: Sanity, Payload CMS with PostgreSQL, or another option?
- How many real articles are available now, and which may legally be used for partner presentation?
- Should translated articles be visible as public content in the MVP or marked as internal demo material until permissions are secured?
- Should the MVP include a public deployment domain or a private preview link for partners?
