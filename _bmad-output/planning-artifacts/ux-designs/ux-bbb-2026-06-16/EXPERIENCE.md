---
name: Kovasz
status: draft
sources:
  - ../../kovasz-prd.md
  - DESIGN.md
updated: 2026-06-25
---

# Kovasz EXPERIENCE.md

## Foundation

Kovasz is a responsive public web publication with an authenticated editorial admin. The public site is content-first and SEO-first. The admin is a structured CMS surface. `DESIGN.md` owns visual identity; this document owns information architecture, behavior, states, interactions, and accessibility.

## Information Architecture

| Surface        | Reached From          | Purpose                                                                                                                                                             |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home           | `/`                   | Publication front page following `Home • Desktop.png`: light nav preview, photographic hero, foundations, article rail, series band, resources, CTA, and newsletter |
| Articles       | `/cikkek`             | Browse and filter all published articles                                                                                                                            |
| Article Detail | `/cikkek/[slug]`      | Long-form reading, Scripture references, series navigation, related content                                                                                         |
| Series         | `/sorozatok`          | List all published series                                                                                                                                           |
| Series Detail  | `/sorozatok/[slug]`   | Ordered hub for a series                                                                                                                                            |
| Resources      | `/forrasok`           | Useful PDFs, reading lists, study aids, and links                                                                                                                   |
| Search         | `/kereses?q=`         | Recover content by query, tag, author, category, or Scripture reference                                                                                             |
| About          | `/rolunk`             | Manifesto, theological posture, contact                                                                                                                             |
| Admin          | `/admin` or CMS route | Authenticated editorial publishing                                                                                                                                  |

Public primary nav items are limited to `Articles`, `Series`, `Resources`, `About`, and `Search`. `Admin`, `Author Detail`, and `Napi Ige` are not primary header links in MVP.

## Voice and Tone

Public copy is Hungarian-first, serious, direct, and editorial. It should avoid hype, exclamation-heavy prompts, and synthetic encouragement. The tone can be warm, but the product should not sound like a productivity app or marketing funnel.

Admin copy is plain and operational: Draft, Preview, Publish, Scheduled, Archived, Missing alt text, Slug conflict.

## Component Patterns

| Component              | Use                                     | Behavioral Rules                                                                                                                                                                  |
| ---------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Masthead nav           | Global public pages                     | Single-row desktop nav with brand and search. Mobile collapses to hamburger. Primary links are Articles, Series, Resources, About, and Search. No admin button in the public nav. |
| Article card           | Archives, home modules, related content | Entire card can open article. Secondary actions are explicit buttons or links.                                                                                                    |
| Filter bar             | Articles, resources                     | Updates URL query params. Reset action visible when filters are active.                                                                                                           |
| Search box             | Header and search page                  | Header submits to `/kereses?q=...`; search page updates results.                                                                                                                  |
| Series part list       | Series detail and article sidebar       | Stable order. Current article highlighted.                                                                                                                                        |
| Rich text article body | Article detail                          | Supports headings, quotes, images, footnotes, Scripture references, callouts.                                                                                                     |
| Admin content table    | Admin lists                             | Search, status filter, sort, edit action, publish state.                                                                                                                          |
| Admin editor           | Article and resource editing            | Autosave optional. Manual save and publish actions must be distinct.                                                                                                              |

## State Patterns

| State                  | Surface         | Treatment                                                                                         |
| ---------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| Loading public list    | Articles/Search | Skeleton rows matching final row height.                                                          |
| Empty archive filter   | Articles        | "No articles match this filter." with reset option.                                               |
| Search no results      | Search          | Shows query, reset/search again, and suggested categories.                                        |
| Article not found      | Article Detail  | Editorial 404 with route back to archive and search.                                              |
| Missing Daily Verse    | Home/Napi Ige   | Treat as secondary content only; if present, use latest published fallback and mark date clearly. |
| Draft preview          | Article Detail  | Preview banner visible only to authenticated editor.                                              |
| Admin validation error | Editor          | Inline field errors plus summary near save/publish actions.                                       |
| Upload error           | Admin media     | Preserve form state and show retry.                                                               |

## Interaction Primitives

- Links are preferred for navigation; buttons are reserved for commands.
- Archive filters are controls, not decorative tags.
- On desktop, card hover may invert colors; on touch, cards stay stable.
- Keyboard users must reach search, nav, filters, article actions, and admin commands in logical order.
- Reading progress is passive; it must not obscure content or change layout.
- Admin destructive actions require confirmation.

## Accessibility Floor

- WCAG 2.2 AA for public and admin surfaces.
- Text never overlaps controls at mobile or desktop widths.
- Headings follow semantic order.
- Images require alt text unless explicitly decorative.
- Article body line length stays readable, with responsive max width.
- Focus rings are visible against paper and dark surfaces.
- Filter state and search result counts are announced to assistive tech.
- Admin forms have labels, descriptions where needed, and error associations.

## Responsive and Platform

| Breakpoint | Behavior                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| Desktop    | Dense magazine grid, masthead frame, multi-column homepage modules, article sidebars where useful         |
| Tablet     | 6-column editorial grid, sidebars collapse below content                                                  |
| Mobile     | Single-column, masthead remains prominent, nav collapses into hamburger, article body prioritizes reading |

The public site must work well on mobile, but the primary authoring surface is desktop/laptop admin.

## Inspiration and Anti-Patterns

- **Lifted from `des1.png`:** oversized masthead, dark frame, compact editorial cards, module density, grayscale image discipline, newsletter embedded as part of publication rhythm.
- **Lifted from current Kovasz prototype:** samizdat paper/ink/red identity, Roman/numbered editorial sections, drop-cap article treatment, issue/imprint language.
- **Lifted from `Home • Desktop.png`:** one-row navbar, pale mega-nav preview, full-width image hero, white editorial sections, pale blue series band, resource cards, image CTA, and dark blue newsletter/footer.
- **Lifted from `editorial-journal-collective`:** compact publication navbar, mobile hamburger behavior, featured archive row, dense editorial grids, newsletter footer rhythm, and article/series page structures.
- **Rejected:** generic parchment blog aesthetic, oversized SaaS hero, social-feed infinite scroll, decorative gradients, comment-heavy community behavior in MVP.

## Key Flows

### Flow 1: Long-form article reading

1. Anna lands on an article from search.
2. She sees title, author, date, category, reading time, and series context.
3. She reads a stable typographic body with Scripture references and footnotes.
4. **Climax:** The next series part is visible when she finishes.
5. She continues reading or returns to the archive.

### Flow 2: Editorial publishing

1. Editor signs in.
2. Opens Articles, creates a draft.
3. Adds title, excerpt, body, author, category, tags, Scripture references, image, SEO fields.
4. Opens preview and fixes formatting.
5. **Climax:** Publishes article and sees confirmation that public pages and feeds are updated.

### Flow 3: Secondary scripture visit

1. Eszter opens the homepage on mobile.
2. The clean header and homepage preview/hero appear, with core destinations and article discovery visible in the first content sequence.
3. She finds a Scripture surface if the editorial homepage includes one, or uses search/archive to reach it.
4. **Climax:** She gets value without needing to navigate through secondary pages.
5. If interested, she opens the relevant archive or article route.
