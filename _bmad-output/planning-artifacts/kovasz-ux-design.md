---
title: Kovasz UX Direction
status: draft
created: 2026-06-16
 updated: 2026-06-25
sources:
  - ../../PROJECT.md
  - ../../des1.png
  - ../../Page Home.txt
  - ../../1-expanded.png
  - ../../2.png
  - ../../3.png
  - ../../4.png
  - ../../Home • Desktop.png
  - ../../editorial-journal-collective/home/index.html
  - ../../editorial-journal-collective/articles/index.html
  - ../../editorial-journal-collective/article-detail/index.html
  - ../../editorial-journal-collective/series/index.html
  - ../../editorial-journal-collective/series-detail/index.html
---

# Kovasz UX Direction

This document summarizes the UX and visual direction. The formal BMad UX peer-contract files are also present at `ux-designs/ux-bbb-2026-06-16/DESIGN.md` and `ux-designs/ux-bbb-2026-06-16/EXPERIENCE.md`.

## Direction

Kovasz should keep the Hungarian theological/editorial seriousness from `PROJECT.md`, but the current homepage layout target is `Home • Desktop.png`. That export defines the active direction: compact one-row public navbar, pale mega-nav preview, full-width photographic hero, white editorial sections, pale blue series band, resource cards, image CTA, and dark blue newsletter/footer.

The stronger samizdat and magazine cues from `des1.png`, `Page Home.txt`, `1-expanded.png` / `2.png` / `3.png` / `4.png`, and the `editorial-journal-collective` HTML reference remain secondary inputs for editorial density, content hierarchy, reading depth, and archive/article pages.

The site should not become an art/design blog. `des1.png` is useful for layout energy, not subject matter. The better direction is "samizdat theological journal with contemporary magazine discipline."

## Visual Decisions

- Keep paper, ink, and red signal as the identity foundation.
- Use the `Home • Desktop.png` light homepage composition as the current source of truth.
- Keep a dark blue newsletter/footer as the grounding frame from the Figma export.
- Use cards sparingly for repeated article/resource items; do not wrap page sections in cards.
- Keep corners sharp to lightly softened, no more than 8px.
- Use grayscale editorial images with clear alt text, and restore color only for intentional emphasis.
- Use large brand typography in the masthead, then restrained headings in dense modules.
- Make the homepage feel page-by-page and issue-like through the Figma sequence: mega-nav preview, image hero, foundations, article rail, series band, resources, CTA, and newsletter.
- Avoid generic beige editorial softness, decorative gradients, blobs, and marketing-style hero sections.
- Keep the public navbar to one clean row on desktop, with a hamburger fallback on narrower widths.
- Expose only Articles, Series, Resources, About, and Search in the public header.
- Do not surface Admin, Authors, or Daily Verse in the public primary navigation.

## Experience Decisions

- First screen is the publication itself, not a landing page.
- Homepage must expose latest article, curated modules, series, resources, and newsletter without requiring a visitor to understand the product first.
- Long-form article reading is the core experience. It should be calm, high contrast, and stable.
- Admin is a work surface. It should be dense, predictable, and quieter than the public editorial site.
- Search and archive browsing are first-class, because theological writing has long shelf life.

## Key Surfaces

| Surface | UX Purpose |
|---|---|
| Home | Publication front page with masthead, lead article, series, resources, newsletter, and archive cues |
| Articles | Filterable archive for all editorial content |
| Article Detail | Long-form reading with Scripture references, series context, author trust, and related content |
| Series | Ordered theological study hubs |
| Resources | Useful non-article material |
| Search | Fast recovery of older content by title, topic, author, tag, and Scripture reference |
| About | Editorial trust, mission, and theological posture |
| Admin | Structured publishing workflow |

## Open UX Questions

1. Should the visual system lean more brutalist/samizdat or more polished magazine?
2. Should the homepage show "issue" grouping as an actual editorial entity in MVP?
3. Should resources be a top-level nav item immediately or start as a homepage/archive section?
4. Should reader save/bookmark be anonymous local storage or authenticated v2?
5. Should Daily Verse stay outside the primary nav entirely, or remain a secondary/homepage module only?
