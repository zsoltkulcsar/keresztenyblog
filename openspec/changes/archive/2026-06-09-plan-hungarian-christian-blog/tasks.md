## 1. Project Baseline

GitHub issue: https://github.com/zsoltkulcsar/blog/issues/5

- [x] 1.1 Create the first prototype app structure and confirm it has `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/styles.css`, and `src/assets/`.
- [x] 1.2 Confirm Google font links for Inter, Lora, and JetBrains Mono are configured through `__root.tsx` and `index.html`.
- [x] 1.3 Set the root document language to Hungarian with `lang="hu"`.
- [x] 1.4 Confirm Tailwind CSS v4 tokens and the fade-up/reveal-down animations exist in `src/styles.css`.

## 2. Content And Assets

GitHub issue: https://github.com/zsoltkulcsar/blog/issues/3

- [x] 2.1 Add or verify the four editorial image assets: `hero-bible.jpg`, `series-manuscript.jpg`, `series-church.jpg`, and `series-parliament.jpg`.
- [x] 2.2 Import the four image assets into `src/routes/index.tsx` using project aliases.
- [x] 2.3 Add local structured data arrays for recent posts, series cards, navigation links, and feed filters.
- [x] 2.4 Preserve all reader-facing copy in Hungarian, including accents and publication metadata.

## 3. Homepage Layout

GitHub issue: https://github.com/zsoltkulcsar/blog/issues/1

- [x] 3.1 Build the sticky navigation with the Keskeny Út wordmark, primary links, search label, divider rule, and theme toggle button.
- [x] 3.2 Build the hero grid with the featured article, large Inter headline, italic Lora deck, hero image, byline, and read link.
- [x] 3.3 Add the animated vertical divider between the featured article and devotional column on large screens.
- [x] 3.4 Build the daily devotional column with the biblical quote, reference, supporting paragraph, and recommended links with meta lines.
- [x] 3.5 Build the Legutóbbi section with filter labels, recent article rows, excerpts, author/date metadata, and hairline dividers.
- [x] 3.6 Build the Sorozatok section with three image cards, hover treatment, titles, meta labels, and opening links.
- [x] 3.7 Build the newsletter section with a non-submitting email form for the first release.
- [x] 3.8 Build the dark footer with mission copy, footer link groups, and bottom metadata.

## 4. Interaction And Styling

GitHub issue: https://github.com/zsoltkulcsar/blog/issues/6

- [x] 4.1 Wire the Világos/Sötét button to toggle the `dark` class on `document.documentElement`.
- [x] 4.2 Ensure components use semantic Tailwind token utilities only, avoiding raw color utilities such as `text-black`, `bg-white`, or `text-orange-*`.
- [x] 4.3 Apply quiet motion only: fade-up section entry, reveal-down divider, and subtle hover lifts or image scale.
- [x] 4.4 Keep the palette to warm paper, ink, and the single orange accent in both light and dark mode.
- [x] 4.5 Ensure responsive spacing, typography, and grids match the first prototype reference on mobile and desktop.

## 5. SEO And Accessibility

GitHub issue: https://github.com/zsoltkulcsar/blog/issues/4

- [x] 5.1 Add homepage metadata for title, description, Open Graph title/description/image, and Twitter image.
- [x] 5.2 Ensure the page has exactly one `h1` and uses `h2` for major sections.
- [x] 5.3 Add Hungarian `alt` text, explicit dimensions, and lazy loading for below-the-fold images.
- [x] 5.4 Ensure form controls and buttons have accessible labels or readable text.

## 6. Verification

GitHub issue: https://github.com/zsoltkulcsar/blog/issues/2

- [x] 6.1 Run the project formatter or linter if one is configured.
- [x] 6.2 Run the production build and fix any TypeScript, Vite, routing, or Tailwind errors.
- [x] 6.3 Manually verify the homepage against `keskeny-ut-blueprint.md` and the OpenSpec requirements.
- [x] 6.4 Verify dark mode toggling, Hungarian copy rendering, semantic token usage, and one-H1 structure before marking implementation complete.
