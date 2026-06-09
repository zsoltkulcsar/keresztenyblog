# Keskeny Út — Homepage Implementation Blueprint

> A self-contained spec for implementing the **"Vention bold editorial"** homepage
> for the Keskeny Út Hungarian Christian magazine. Hand this to Codex as the source
> of truth. It includes the stack, design tokens, fonts, file layout, content data,
> and a component-by-component build spec with exact Tailwind classes.

---

## 1. Goal & Design Direction

A reverent, editorial, confident magazine homepage. Warm paper canvas, ink
foreground, a single warm orange accent. Vention-style oversized headlines paired
with editorial calm (Plough Quarterly / The Gospel Coalition / 9Marks gravitas).

**Hard guardrails**
- Content/editorial blog only. No event calendars, donation CTAs, or sermon player.
- All copy stays in Hungarian.
- Palette stays warm paper + ink + one accent. No second accent color.
- Motion is quiet: fade-up on scroll, subtle hover lifts. Never flashy.

---

## 2. Tech Stack

- **Framework:** TanStack Start v1 (React 19, SSR), Vite 7.
- **Routing:** File-based in `src/routes/`. Root layout `src/routes/__root.tsx`.
  Home page `src/routes/index.tsx`. Do NOT edit `src/routeTree.gen.ts` (auto-generated).
- **Styling:** Tailwind CSS v4, CSS-first. All config in `src/styles.css` via
  `@import "tailwindcss"` and `@theme inline`. There is NO `tailwind.config.js`.
- **Fonts:** Loaded via `<link>` in `__root.tsx` head (Google Fonts), referenced
  through `--font-*` tokens. Never `@import` a font URL in CSS.

---

## 3. Fonts

Loaded in `src/routes/__root.tsx` `head().links`:

```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800&family=Lora:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500&display=swap
```

Roles (already mapped in `@theme inline`):
- `--font-display: "Inter"` → oversized bold headlines (`font-display`, weight 800).
- `--font-serif: "Lora"` / `--font-sans: "Lora"` → body + editorial titles.
- `--font-mono: "JetBrains Mono"` → eyebrows, meta, labels (uppercase, tracked).

> Note: the prototype used Playfair Display for headlines. The shipped design uses
> **Inter 800** for headlines (Vention bold) and **Lora** for serif editorial
> titles. Keep this mapping — do not swap in Playfair unless explicitly requested.

---

## 4. Design Tokens (src/styles.css)

CSS-first Tailwind v4. Tokens live under `:root` (light) and `.dark`, exposed to
utilities through `@theme inline`. Key values:

```css
:root {
  --radius: 0.375rem;
  --background: oklch(0.952 0.013 78);   /* warm paper */
  --foreground: oklch(0.21 0 0);         /* ink */
  --primary: oklch(0.63 0.18 40);        /* warm orange accent */
  --primary-foreground: oklch(0.985 0.006 78);
  --secondary: oklch(0.92 0.012 78);
  --muted: oklch(0.92 0.012 78);
  --muted-foreground: oklch(0.5 0.01 60);
  --border: oklch(0.21 0 0 / 12%);
  --ring: oklch(0.63 0.18 40);
}
```

A `.dark` variant exists with inverted paper/ink and a slightly brighter accent
(`--primary: oklch(0.7 0.17 42)`). The "Világos" nav button is the dark-mode
toggle target (see §7).

Use ONLY semantic tokens in components: `bg-background`, `text-foreground`,
`text-muted-foreground`, `bg-primary`, `text-primary`, `border-border`,
`bg-secondary`, `text-background` (on dark surfaces). Never raw colors like
`text-black`, `bg-white`, `text-orange-600`.

### Animations (already defined in styles.css)

```css
@keyframes fade-up { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
@keyframes reveal-down { from { transform:scaleY(0) } to { transform:scaleY(1) } }

@layer utilities {
  .animate-fade-up   { animation: fade-up 0.6s var(--ease-out-expo) both; }
  .animate-reveal-down { animation: reveal-down 0.8s var(--ease-out-expo) both; transform-origin: top; }
}
```

`--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` is defined in `@theme inline`.

---

## 5. Assets

Four editorial images in `src/assets/`, imported as ES modules:

- `hero-bible.jpg` — open Bible on wood in morning light (hero + og:image).
- `series-manuscript.jpg` — "Az evangélium alapjai" series card.
- `series-church.jpg` — "Egészséges gyülekezet" series card.
- `series-parliament.jpg` — "Hit a közéletben" series card.

Import at top of `index.tsx`:

```ts
import heroBible from "@/assets/hero-bible.jpg";
import seriesManuscript from "@/assets/series-manuscript.jpg";
import seriesChurch from "@/assets/series-church.jpg";
import seriesParliament from "@/assets/series-parliament.jpg";
```

---

## 6. Content Data (top of index.tsx, above the component)

```ts
const recentPosts = [
  { category: "Esszé", title: "Az evangélium nem csak kezdet, hanem otthon",
    excerpt: "Miért kell újra és újra Krisztusból indulnunk, nem a saját teljesítményünkből?",
    author: "Nagy Bence", date: "jún. 5." },
  { category: "Gyülekezet", title: "Miért több a gyülekezeti tagság egy vasárnapi jelenlétnél?",
    excerpt: "A helyi közösség Isten egyik legkézzelfoghatóbb ajándéka a tanítványságban.",
    author: "Farkas Márton", date: "jún. 3." },
  { category: "Keresztény élet", title: "Hűség a hétfő reggeli feladatokban",
    excerpt: "A munka nem ellensége a lelki életnek, hanem hely, ahol a hit láthatóvá válik.",
    author: "Tóth Eszter", date: "jún. 1." },
  { category: "Kultúra", title: "Mielőtt az AI-ra kérdeznénk, olvassuk el a Prédikátort",
    excerpt: "A technológia gyors választ ígér, a bölcsesség viszont jó kérdésekre tanít.",
    author: "Varga Dániel", date: "máj. 30." },
];

const series = [
  { image: seriesManuscript, title: "Az evangélium alapjai",  meta: "8 rész • alapozó" },
  { image: seriesChurch,     title: "Egészséges gyülekezet",  meta: "7 rész • gyülekezeti" },
  { image: seriesParliament, title: "Hit a közéletben",        meta: "6 rész • gondolkodó" },
];

const navLinks    = ["Cikkek", "Témák", "Sorozatok"];
const feedFilters = ["Összes", "Biblia", "Gyülekezet", "Élet", "Kultúra"];
```

---

## 7. Layout & Components (top → bottom)

All sections live inside `function Index()` returning a single root
`<div className="min-h-screen bg-background text-foreground selection:bg-primary/20">`.
Page content wrapper: `<main className="mx-auto max-w-7xl px-6 py-12">`.

### 7.1 Navigation (sticky)
- `<nav>` sticky, `top-0 z-50`, `border-b border-border`, `bg-background/80 backdrop-blur-md`.
- Inner row: `mx-auto flex h-16 max-w-7xl items-center justify-between px-6`.
- Left: wordmark `Keskeny Út` (`font-display text-xl font-extrabold uppercase tracking-tighter`)
  + `navLinks` mapped as `<a>` (`text-sm font-medium text-foreground/80 hover:text-primary`).
- Right: "Keresés" mono label + a thin `h-px w-32 bg-border` rule, then a
  rounded "Világos" button (`rounded-full border border-border px-3 py-1
  font-mono text-[10px] uppercase hover:bg-foreground hover:text-background`).
- **Refinement:** wire "Világos" to toggle `document.documentElement.classList.toggle("dark")`
  and swap label Világos↔Sötét.

### 7.2 Hero + Devotional (12-col grid)
- Grid: `grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0`.
- **Lead article** `lg:col-span-8 lg:pr-12`, class `animate-fade-up`:
  - Eyebrow row: orange `Kiemelt` badge (`bg-primary px-2 py-0.5 font-mono text-[10px]
    uppercase tracking-wider text-primary-foreground`) + meta `Esszé • 2026. jún. 06.`
  - H1: `text-balance font-display text-5xl font-extrabold leading-[0.95]
    tracking-tight md:text-7xl`.
  - Italic Lora deck: `max-w-2xl text-pretty text-xl italic leading-relaxed text-muted-foreground`.
  - Hero image: `aspect-[16/9] w-full object-cover` inside `overflow-hidden rounded-sm`.
  - Byline row (`border-t border-border pt-4`): KÚ avatar circle + name on left;
    "Olvasás →" link on right with `group-hover:translate-x-1` arrow.
- **Vertical divider:** `hidden lg:col-span-1 lg:block border-l border-border animate-reveal-down`.
- **Daily devotional** `lg:col-span-3`, class `animate-fade-up [animation-delay:200ms]`:
  - "Mai elmélkedés" mono eyebrow in `text-primary`.
  - Blockquote `text-2xl font-medium leading-tight` + `ZSOLTÁROK 119,105` mono ref
    + muted paragraph.
  - "Ajánlott" sub-section (`border-t border-border pt-12`): 3 links
    `text-lg hover:text-primary`. **Refinement:** append a mono meta line under each
    (e.g. `Esszé • 5 perc`, `Kultúra • 8 perc`, `Sorozat • 12 rész`).

### 7.3 Legutóbbi (recent articles list)
- Section `mt-32`. Header row: serif `Legutóbbi` (`font-serif text-3xl`) +
  `feedFilters` mono tabs; first is active (`border-b border-primary text-foreground`).
- List `space-y-16`, map `recentPosts`:
  - `<article className="group">` with mono category eyebrow, serif title
    (`font-serif text-2xl group-hover:text-primary`), muted excerpt, then meta row
    (author in `text-foreground/70`, dot separator, date).
  - Between items render `<div className="mt-16 h-px bg-border" />` (not after last).

### 7.4 Sorozatok (series cards)
- Section `mt-32 space-y-12`. Header: `font-display text-4xl font-extrabold
  tracking-tighter` + flex-1 `h-px bg-border` rule.
- Grid `grid-cols-1 md:grid-cols-3 gap-6`, map `series`:
  - Card `<a>` `group relative flex min-h-[320px] flex-col justify-end
    overflow-hidden rounded-sm bg-foreground/5 p-8`.
  - Absolute image `h-full w-full object-cover opacity-50 group-hover:scale-105
    group-hover:opacity-70 transition-all duration-700` + gradient overlay
    `bg-gradient-to-t from-background/90 via-background/40 to-transparent`.
  - Content: `font-display text-2xl font-extrabold` title, mono meta, "Megnyitás →"
    in `text-primary` with hover arrow.

### 7.5 Newsletter
- Section `mt-32 ... rounded-sm border border-border bg-foreground/[0.02] p-12
  text-center md:p-20`.
- Italic display "Hírlevél" heading, muted subline, then email form
  (`flex max-w-md flex-col gap-2 sm:flex-row`): input `border border-border
  bg-background px-6 py-4 font-mono text-sm focus:border-primary` + submit button
  `bg-foreground text-background font-display uppercase tracking-widest
  hover:bg-primary`. `onSubmit={(e) => e.preventDefault()}` for now.

### 7.6 Footer
- `mt-32 border-t border-border bg-foreground py-20 text-background`.
- Grid `md:grid-cols-4`: wordmark + mission paragraph (`md:col-span-2`), then
  "Linkek" (Impresszum, Adatkezelés, Archívum) and "Kövessen minket"
  (Facebook, Instagram, YouTube, RSS). Links `hover:text-primary`.
- Bottom bar (`border-t border-background/10 pt-8`): `© 2026 Keskeny Út` /
  `Készült Budapesten` in mono.

---

## 8. SEO (index.tsx `head()`)

```ts
head: () => ({
  meta: [
    { title: "Keskeny Út — Magyar keresztény magazin" },
    { name: "description", content: "Magyar nyelvű keresztény magazin Krisztus középpontjával: cikkek, elmélkedések és sorozatok az evangélium mélyebb megértéséért." },
    { property: "og:title", content: "Keskeny Út — Magyar keresztény magazin" },
    { property: "og:description", content: "Cikkek, elmélkedések és sorozatok az evangélium mélyebb megértéséért és a hiteles keresztény életért." },
    { property: "og:image", content: heroBible },
    { name: "twitter:image", content: heroBible },
  ],
}),
```

- Single `<h1>` (the hero headline). Section headings are `<h2>`.
- All `<img>` need Hungarian `alt`, explicit `width`/`height`, `loading="lazy"`
  for below-the-fold (series) images.
- Set `<html lang="hu">` in `RootShell` (currently `"en"`).

---

## 9. Build Order for Codex

1. Confirm fonts in `__root.tsx` head and `lang="hu"` on `<html>`.
2. Confirm tokens + animations in `src/styles.css` (§4) — they already exist.
3. Add the four asset imports + `recentPosts` / `series` / `navLinks` /
   `feedFilters` data arrays (§5–6).
4. Build sections top→bottom per §7 inside `index.tsx`.
5. Add the dark-mode toggle behavior to the "Világos" button (§7.1).
6. Apply the refinements: Ajánlott meta lines (§7.2), read-time meta.
7. Verify: no raw color classes, only semantic tokens; one `<h1>`; build passes.

---

## 10. Acceptance Checklist

- [ ] Warm paper bg, ink text, single orange accent — light AND dark mode.
- [ ] Inter 800 headlines, Lora serif titles, JetBrains mono eyebrows/meta.
- [ ] Sticky blurred nav; "Világos" toggles dark mode.
- [ ] Hero 8/1/3 grid with devotional sidebar; fade-up + reveal-down animations.
- [ ] Legutóbbi list with category eyebrows, hairline dividers, author/date meta.
- [ ] Sorozatok image cards with grayscale/opacity → color hover.
- [ ] Newsletter panel + 4-column dark footer.
- [ ] All Hungarian copy intact; semantic tokens only; one H1; alt text on images.
