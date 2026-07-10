---
name: Kovasz
description: Hungarian Christian theological journal with samizdat print energy and contemporary magazine structure.
status: draft
sources:
  - ../../kovasz-prd.md
  - ../../../../PROJECT.md
  - ../../../../des1.png
  - ../../../../Page Home.txt
  - ../../../../1-expanded.png
  - ../../../../2.png
  - ../../../../3.png
  - ../../../../4.png
  - ../../../../Home • Desktop.png
  - ../../../../editorial-journal-collective/home/index.html
  - ../../../../editorial-journal-collective/articles/index.html
  - ../../../../editorial-journal-collective/article-detail/index.html
  - ../../../../editorial-journal-collective/series/index.html
  - ../../../../editorial-journal-collective/series-detail/index.html
updated: 2026-06-25
colors:
  paper: '#F2EBDD'
  paper-deep: '#E8DFC9'
  ink: '#0A0A0A'
  ink-soft: '#2A2826'
  muted: '#6A655F'
  line: '#C9BFA8'
  signal: '#D9341A'
  signal-soft: '#F26B5A'
  dark: '#171717'
  dark-raised: '#242424'
  on-dark: '#F2EBDD'
typography:
  masthead:
    fontFamily: Fraunces
    fontSize: clamp(56px, 11vw, 148px)
    fontWeight: '900'
    lineHeight: '0.9'
    letterSpacing: '0'
  display:
    fontFamily: Fraunces
    fontSize: clamp(36px, 7vw, 84px)
    fontWeight: '900'
    lineHeight: '0.95'
    letterSpacing: '0'
  headline:
    fontFamily: Fraunces
    fontSize: clamp(28px, 4vw, 52px)
    fontWeight: '800'
    lineHeight: '1'
    letterSpacing: '0'
  body:
    fontFamily: Fraunces
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.65'
    letterSpacing: '0'
  ui:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: '0'
rounded:
  sm: 2px
  md: 4px
  lg: 8px
spacing:
  unit: 8px
  page-mobile: 18px
  page-tablet: 28px
  page-desktop: 44px
  section: 64px
  grid-gap: 16px
components:
  masthead-shell:
    background: '{colors.dark}'
    foreground: '{colors.on-dark}'
    border: '3px solid {colors.ink}'
  article-card:
    background: '{colors.paper}'
    foreground: '{colors.ink}'
    border: '1px solid {colors.line}'
    radius: '{rounded.md}'
  article-card-hover:
    background: '{colors.ink}'
    foreground: '{colors.paper}'
  button-primary:
    background: '{colors.signal-soft}'
    foreground: '{colors.ink}'
    border: '2px solid {colors.ink}'
    radius: '{rounded.lg}'
---

# Kovasz DESIGN.md

## Brand & Style

Kovasz is a Hungarian Christian theological journal, not a generic blog. The design posture is serious, print-aware, and a little confrontational in the way independent journals can be. It should feel made by editors who care about theology, language, and the physicality of reading.

`Home • Desktop.png` is the current visual source of truth for the public homepage. Its useful qualities are the clean one-row publication nav, pale mega-nav/content preview, full-width photographic hero, generous white editorial sections, pale blue series band, resource cards, image CTA, and dark blue newsletter/footer. Earlier inputs remain useful for identity, but homepage implementation should now follow this Figma-exported structure before returning to darker samizdat experiments.

The Kovasz identity remains serious, Scripture-first, and editorial. Use the samizdat/paper direction from `des1.png` as a tonal constraint for reading depth and content gravity, not as the current homepage layout target. Avoid turning the site into a generic SaaS landing page: the Figma structure should be filled with theological article, series, and resource content.

## Colors

- **Paper (`#F2EBDD`)** is the default reading ground.
- **Paper Deep (`#E8DFC9`)** creates subtle editorial modules without feeling like UI chrome.
- **Ink (`#0A0A0A`)** is the primary text, border, and masthead color.
- **Muted (`#6A655F`)** supports metadata, dates, and archive labels.
- **Signal (`#D9341A`)** is used sparingly for theological footnote marks, category accents, active states, and editorial emphasis.
- **Dark (`#171717`)** is the masthead/footer frame. It should make the site feel like a printed issue sleeve, not like a dark-mode app.

Avoid gradients, decorative color fields, beige-only layouts, and saturated palettes beyond the red signal.

## Typography

Fraunces carries the editorial voice. It is used for masthead, headlines, article body, drop caps, and pull quotes. JetBrains Mono is used for labels, metadata, dates, route-level utility text, and admin table labels.

Large display type belongs only in publication-scale areas: masthead, section leads, article titles. Compact cards and admin panels use smaller headings with stable line height so text does not collide with controls.

All letter spacing tokens are `0`. Weight, case, scale, borders, and layout carry the identity.

## Layout & Spacing

Use an editorial grid:

- Desktop: 12 columns with dense content modules and clear gutters.
- Tablet: 6 columns.
- Mobile: single column with a visible masthead and content teaser below the first viewport.

Homepage sections are full-width bands or unframed layouts with constrained inner content. Cards are used only for repeated items such as article/resource rows. Do not place cards inside cards. The current homepage sequence follows `Home • Desktop.png`: light mega-nav preview, large photographic hero with overlaid serif headline, three foundation cards, article rail, pale blue series band, resource cards, image CTA, then dark blue newsletter/footer.

The first viewport should show the Kovasz masthead, primary nav, lead content, and a hint of the next module.

## Elevation & Depth

Depth comes from borders, tonal surfaces, and image treatment. Avoid soft SaaS shadows. Use 1px borders for card structure and 3px borders for major editorial divisions.

## Shapes

Corners stay sharp or lightly softened:

- 2px for tiny controls and tags.
- 4px for cards and inputs.
- 8px maximum for primary buttons and dialogs.

Avoid pills except for compact filter tokens where the affordance is genuinely useful.

## Components

- **Masthead:** Compact publication navbar, brand wordmark, primary nav, search affordance, and hamburger fallback.
- **Homepage Mega Preview:** Pale blue/white navigation preview with vertical destination list, one featured module, and supporting article rows.
- **Homepage Hero:** Full-width photographic hero with white serif text over image and two clear calls to action.
- **Lead Article Module:** Large headline, excerpt, metadata, category, and image. Image can be wide and grayscale.
- **Article Card:** Small image, type label, headline, excerpt, date, category. Hover can invert paper to ink on desktop.
- **Featured Archive Row:** Wide image/text split before dense article grids, adapted from the editorial-journal reference.
- **Editorial Mosaic:** Mixed-size text/image cards on a paper surface, adapted to Kovasz topics rather than generic placeholder categories.
- **Series Strip:** Pale blue editorial band listing ordered parts, emphasizing continuity.
- **Newsletter Form:** Compact and editorial, not a marketing section.
- **Admin Tables:** Dense rows, strong labels, predictable actions. Public samizdat style should be toned down in admin.
- **Mobile Nav Drawer:** Single-column menu with only core public destinations and search.

## Do's and Don'ts

| Do                                                                         | Don't                                                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Keep Kovasz as the first-viewport signal                                   | Hide the brand in tiny nav text                               |
| Use `des1.png` for layout energy                                           | Copy its art-blog topic or palette wholesale                  |
| Favor high contrast and reading stability                                  | Add decorative animation or background blobs                  |
| Make article pages calm and typographic                                    | Turn the site into a card-heavy landing page                  |
| Keep admin practical and dense                                             | Make admin mimic the public editorial homepage                |
| Keep the desktop navbar on a single row                                    | Split the header into two lines just to fit links             |
| Show only Articles, Series, Resources, About, and Search in the public nav | Expose Admin, Authors, or Daily Verse as primary header items |
