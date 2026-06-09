## 1. Project Baseline

- [ ] 1.1 Inspect the existing TanStack Start project structure and confirm the app has `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/styles.css`, and `src/assets/`.
- [ ] 1.2 Confirm Google font links for Inter, Lora, and JetBrains Mono are configured in `__root.tsx`.
- [ ] 1.3 Set the root document language to Hungarian with `lang="hu"`.
- [ ] 1.4 Confirm Tailwind CSS v4 tokens and the fade-up/reveal-down animations exist in `src/styles.css`.

## 2. Content And Assets

- [ ] 2.1 Add or verify the four editorial image assets: `hero-bible.jpg`, `series-manuscript.jpg`, `series-church.jpg`, and `series-parliament.jpg`.
- [ ] 2.2 Import the four image assets into `src/routes/index.tsx` using project aliases.
- [ ] 2.3 Add local structured data arrays for recent posts, series cards, navigation links, and feed filters.
- [ ] 2.4 Preserve all reader-facing copy in Hungarian, including accents and publication metadata.

## 3. Homepage Layout

- [ ] 3.1 Build the sticky navigation with the Keskeny Út wordmark, primary links, search label, divider rule, and theme toggle button.
- [ ] 3.2 Build the hero grid with the featured article, large Inter headline, italic Lora deck, hero image, byline, and read link.
- [ ] 3.3 Add the animated vertical divider between the featured article and devotional column on large screens.
- [ ] 3.4 Build the daily devotional column with the biblical quote, reference, supporting paragraph, and recommended links with meta lines.
- [ ] 3.5 Build the Legutóbbi section with filter labels, recent article rows, excerpts, author/date metadata, and hairline dividers.
- [ ] 3.6 Build the Sorozatok section with three image cards, hover treatment, titles, meta labels, and opening links.
- [ ] 3.7 Build the newsletter section with a non-submitting email form for the first release.
- [ ] 3.8 Build the dark footer with mission copy, footer link groups, and bottom metadata.

## 4. Interaction And Styling

- [ ] 4.1 Wire the Világos/Sötét button to toggle the `dark` class on `document.documentElement`.
- [ ] 4.2 Ensure components use semantic Tailwind token utilities only, avoiding raw color utilities such as `text-black`, `bg-white`, or `text-orange-*`.
- [ ] 4.3 Apply quiet motion only: fade-up section entry, reveal-down divider, and subtle hover lifts or image scale.
- [ ] 4.4 Keep the palette to warm paper, ink, and the single orange accent in both light and dark mode.
- [ ] 4.5 Ensure responsive spacing, typography, and grids match the blueprint on mobile and desktop.

## 5. SEO And Accessibility

- [ ] 5.1 Add homepage metadata for title, description, Open Graph title/description/image, and Twitter image.
- [ ] 5.2 Ensure the page has exactly one `h1` and uses `h2` for major sections.
- [ ] 5.3 Add Hungarian `alt` text, explicit dimensions, and lazy loading for below-the-fold images.
- [ ] 5.4 Ensure form controls and buttons have accessible labels or readable text.

## 6. Verification

- [ ] 6.1 Run the project formatter or linter if one is configured.
- [ ] 6.2 Run the production build and fix any TypeScript, Vite, routing, or Tailwind errors.
- [ ] 6.3 Manually verify the homepage against `keskeny-ut-blueprint.md` and the OpenSpec requirements.
- [ ] 6.4 Verify dark mode toggling, Hungarian copy rendering, semantic token usage, and one-H1 structure before marking implementation complete.
