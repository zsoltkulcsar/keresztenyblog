# Kovasz Screen-by-Screen Prototype Spec

## Prototype Goal

This prototype should validate the core product shape of Kovasz:

- a dark-framed, magazine-style homepage
- a scripture-first article reading experience
- topic-first series browsing with audience filtering
- a practical CMS-style admin dashboard and editor

The prototype should answer one question: does the product feel like a serious Hungarian Christian publication that helps readers grow in faith?

## Design Principles

1. Full-width lead story first.
2. Scripture is the strongest anchor on article pages.
3. Series organize teaching paths, not just content buckets.
4. Admin should be practical and CMS-first.
5. The homepage should feel editorial, not like a marketing landing page.
6. The visual mood starts dark and publication-like, then uses lighter reading surfaces inside content pages.

## Screen 1: Homepage

### Purpose

Introduce the publication, surface the lead article, and expose the latest content and key pathways without flattening the page into a feed.

### Layout

- Dark top frame with brand wordmark and single-row compact navigation
- Full-width lead article block
- Latest articles grid directly after the lead
- Supporting editorial modules for series, optional daily verse, and resources
- About / trust link in the footer or lower module area

### Required Content

- publication name
- issue or imprint line
- nav items
- search entry
- lead article title, short summary, image, category, reading time
- latest article grid items
- one or two series highlights
- one daily verse module
- one resource module

### Behavior

- lead article spans the full available width
- latest grid should feel like a real editorial grid, not a generic card list
- the homepage should stay mixed, with no separate “new believer” fork at the top
- audience distinction should be visible mainly through series entry points and filters

### States

- Loading: skeleton or placeholder blocks for lead and grid
- Empty lead slot: fallback to latest published article
- Empty latest grid: show curated content or a minimal editorial message
- Search with no results: show empty state and reset action

### Mobile

- brand and nav collapse into a compact top bar
- lead story remains dominant
- latest grid becomes a single-column stack
- supporting modules stack beneath the lead

## Screen 2: Article Detail

### Purpose

Support long-form reading where Scripture, editorial structure, and study support are all visible.

### Layout Priority

1. Scripture block
2. Pull quote
3. Study panel
4. Image
5. Metadata and author line

### Required Content

- title
- scripture reference and verse block
- pull quote
- study panel
- article body with headings and subheadings
- optional image
- author
- date
- category
- series link
- reading time
- share action
- related content

### Behavior

- article body reads continuously
- headings and subheadings break the text into meaningful sections
- scripture block behaves like both an editorial quote box and a study block
- study panel adapts to the article, so it may show cross references, teaching notes, reflection questions, or a mix
- article should feel calm but not empty

### States

- Loading: skeleton for title, scripture block, body, and sidebar/study panel
- Missing article: editorial 404 with archive and search links
- Translated article: clearly labeled source note
- Long article: progress indicator should be unobtrusive

### Mobile

- scripture block stays at the top of the content flow
- study panel collapses below the main reading flow
- image, author, and metadata move lower
- no overcrowded sidebar behavior on small screens

## Screen 3: Article Archive

### Purpose

Help readers discover content by topic, series, author, and audience need.

### Layout

- title and short intro
- filter bar
- search field
- results list or grid
- pagination or load-more control

### Filters

- topic
- series
- author
- type
- audience routing where relevant

### Behavior

- archive must feel searchable and editorial
- filters update the URL
- no-result state should be useful, not dead-end
- topic should be the primary filter logic

### Mobile

- filter bar collapses into compact controls
- search remains prominent
- results become single-column

## Screen 4: Series Index

### Purpose

Present the teaching and discipleship structure of the site.

### Layout

- series title and short description first
- filter bar second
- short summary cards or rows for each series
- more detail only after opening the series

### Behavior

- list view should stay short and scannable
- opened series page expands into longer description
- topic is the main filter
- new believer / experienced believer distinction stays secondary and is mostly handled by series, tags, and filters

### Required Content

- series title
- short summary
- topic tags
- audience routing tags if relevant
- article count
- latest or next entry indicator

### Mobile

- title and short description stay visible
- filters collapse gracefully
- summary rows become stacked cards or list items

## Screen 5: Series Detail

### Purpose

Turn a series into a guided discipleship path.

### Layout

- large series title
- longer series description
- scripture or theme context
- ordered list of articles
- audience tags
- progress or sequence cues

### Behavior

- series detail should feel like a study path, archive, and journey at once
- order must be stable
- current or next entry should be obvious

### States

- Empty series: editorial placeholder or hidden in public view
- Partially published series: only published entries shown publicly

## Screen 6: Daily Verse Module

### Purpose

Provide a quick devotional entry point.

### Layout

- verse reference
- verse text
- short note if present
- archive link

### Behavior

- should feel calm and compact
- can appear on the homepage or as a secondary surface, but does not need a primary nav item
- should not dominate the homepage over the lead story

## Screen 7: Resources

### Purpose

Act as a practical study library with curated recommendations.

### Layout

- title
- resource type
- short usefulness copy
- curator note if needed
- related topic or series

### Behavior

- should answer why a resource is useful
- should avoid feeling like a file dump
- should be searchable

## Screen 8: About

### Purpose

Build trust and clarify theological and editorial posture.

### Layout

- blended opening statement
- mission
- manifesto
- faith / doctrine guide
- editorial approach

### Behavior

- opening should not feel too corporate or too doctrinally rigid
- the page should clearly communicate why the publication exists and what it stands for

## Screen 9: Admin Dashboard

### Purpose

Give editors a practical overview and quick action surface.

### Layout

- draft queue
- publishing tasks
- overview stats
- quick create actions
- recent content

### Behavior

- dashboard should feel like a control room
- quick create should cover article, series, daily verse, and resource
- future moderation and access control should be possible to add later

## Screen 10: Admin Content List

### Purpose

Provide a fast operational list of content.

### Layout

- dense table structure
- card-like grouping where useful
- filters and search
- status indicators
- edit / preview / publish actions

### Behavior

- hybrid between table and cards
- fast scanning first
- still visually pleasant

## Screen 11: Admin Editor

### Purpose

Support writing and publication in one place.

### Layout

- main writing area
- preview panel
- side panels for scripture references, tags, series, metadata, translation source, and publish settings

### Behavior

- writing should remain primary
- preview should be close enough to catch structure problems
- side panels should reduce friction in publishing

### Required Fields

- title
- slug
- summary
- body
- scripture references
- series
- topics/tags
- author
- content type
- translation source if relevant
- cover image
- status

## Screen 12: Future Moderation / Access Control

### Purpose

Reserve room for future user posting, comments, approval, and blocking workflows.

### Behavior

- not MVP unless explicitly added
- admin should be able to manage access, comments, and content moderation later
- design should anticipate moderation states without exposing them everywhere now

## Prototype Questions to Validate

1. Does the dark frame feel strong in the browser, or too heavy?
2. Does the lead story read like a publication cover story?
3. Does the article page feel scripture-first without becoming cluttered?
4. Does the series page communicate teaching path and topic discovery clearly?
5. Does the admin feel practical rather than bespoke?

## Prototype Build Order

1. Homepage
2. Article detail
3. Series index and detail
4. Resources
5. About
6. Admin dashboard
7. Admin content list
8. Admin editor

## Success Criteria

The prototype is good if a reader can immediately tell:

- what the publication is for
- where to start as a new believer
- where to go for deeper study
- that Scripture is central
- that the site is an editorial publication, not a generic blog
- that the admin is practical and CMS-first
