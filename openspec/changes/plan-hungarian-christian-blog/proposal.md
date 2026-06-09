## Why

The Keskeny Út homepage blueprint defines a strong visual direction, but the project also needs a planning layer for what the Hungarian Christian blog will publish, how readers will move through it, and how editorial work will repeat over time. Creating this planning foundation now will keep the site from becoming only a static homepage and will make later implementation decisions clearer.

## What Changes

- Establish a blog planning capability for a Hungarian Christian editorial magazine centered on articles, meditations, topic collections, and series.
- Define the expected reader-facing planning surfaces: homepage priorities, article feed, topics, series, daily meditation, recommendations, newsletter, and footer links.
- Define editorial workflow expectations for ideation, drafting, review, publication, and ongoing curation.
- Preserve the current homepage blueprint as the visual and technical source of truth for the first implementation pass.
- Exclude non-editorial features such as event calendars, donation flows, sermon players, or church management tools.

## Capabilities

### New Capabilities
- `editorial-blog-planning`: Covers the content model, reader journeys, homepage sections, editorial workflows, and planning decisions for the Keskeny Út Hungarian Christian blog.

### Modified Capabilities
- None.

## Impact

- OpenSpec planning artifacts under `openspec/changes/plan-hungarian-christian-blog/`.
- Future frontend implementation should use `keskeny-ut-blueprint.md` as the design source of truth.
- Future content/data implementation should support Hungarian copy, article categories, series, devotional content, recommendations, and newsletter capture behavior.
- No backend API, CMS, authentication, payment, event, or media-player requirements are introduced by this planning change.
