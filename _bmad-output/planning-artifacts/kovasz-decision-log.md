---
title: Kovasz Planning Decision Log
status: draft
created: 2026-06-16
updated: 2026-06-16
---

# Kovasz Planning Decision Log

## Decisions

### 2026-06-16: Treat `PROJECT.md` as the product brief

`PROJECT.md` already captures project identity, current prototype behavior, sitemap, mock features, and roadmap. It is sufficient input for a fast-path PRD draft.

### 2026-06-16: Use `des1.png` as layout inspiration, not brand source

The user likes `des1.png`. The useful parts are the bold masthead, dark frame, modular magazine density, compact cards, and grayscale imagery. Kovasz should not copy the art/design-blog content or become a generic "Canvas" clone.

### 2026-06-16: Recommend Next.js + Payload + PostgreSQL

The project is content-heavy and needs public SEO plus admin CMS features. A unified Next.js/Payload TypeScript app is recommended over a separate React SPA plus custom FastAPI backend for MVP.

### 2026-06-16: Defer comments from MVP

Comments introduce moderation and theological governance complexity. They should wait until the editorial policy is clearer.

### 2026-06-16: Keep search simple in MVP

Database-backed search is enough for initial content volume. External search can be added later behind an abstraction.

### 2026-06-25: Use `Home • Desktop.png` as the homepage visual baseline

The latest Figma export is the current source of truth for the homepage. It supersedes the earlier dark masthead homepage concept for now and sets the active sequence: clean one-row nav, pale mega-nav preview, full-width photographic hero, foundations, article rail, pale blue series band, resources, image CTA, and dark blue newsletter/footer.

## Assumptions To Confirm

- MVP should be public launch quality.
- Hungarian is the only content language for MVP.
- Resources are a first-class content type.
- The admin should prioritize practical publishing over custom visual flourish.
- Newsletter signup is useful in MVP, but provider choice is open.
