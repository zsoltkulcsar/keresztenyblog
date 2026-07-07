# Kovasz Design Handoff

## Purpose

This handoff captures the validated design direction for Kovasz so it can be implemented without reopening the concept.

## Product Summary

Kovasz is a Hungarian Christian discipleship and formation publication. It should feel like a serious theological journal with a contemporary magazine structure.

The site exists to help readers:

- understand the Bible more deeply
- grow spiritually
- navigate daily Christian life
- find study aids and practical resources
- learn whether they are new in faith or more experienced through series and filters

## Locked Direction

- dark editorial frame to start
- full-width lead article on the homepage
- latest articles grid directly below the lead
- scripture-first article pages
- article page style is a hybrid of reading room, journal spread, and study page
- series pages are topic-first and support guided discipleship paths
- resources are a practical study library with curated recommendations
- about page blends manifesto, mission, and faith posture
- admin is CMS-first and practical, not custom-built from zero
- overall tone is deliberate hybrid of samizdat and magazine

## Homepage

### Hierarchy

1. full-width lead story
2. latest articles grid
3. supporting modules for series, optional daily verse, resources
4. trust/about link lower on the page

### Rules

- the homepage should feel like a publication front page
- the homepage should not become a landing page or quiz
- the audience distinction should stay secondary on the homepage
- the dark frame should be strong at first prototype stage
- the public navbar should stay on one row on desktop and collapse into a hamburger on narrow widths
- the public navbar should only expose Articles, Series, Resources, About, and Search
- Admin, Authors, and Daily Verse should not appear as primary header items

### Required Modules

- publication masthead
- compact navigation
- search entry
- lead article block
- latest article grid
- series highlights
- optional daily verse module
- resource module

## Article Page

### Visual Priority

1. scripture block
2. pull quote
3. study panel
4. image
5. metadata / author

### Rules

- scripture block must combine quote-box and study-block behavior
- article body should read continuously with headings and subheadings
- study panel content should adapt to the article
- image and metadata are important, but not the first visual anchor

### Study Panel Content

The study panel may include:

- cross references
- teaching notes
- reflection questions
- combinations of these depending on article type

## Series Pages

### Rules

- series should function as a study path, archive, and guided journey
- the main page should show short summaries only
- longer descriptions should appear on open
- filters should be primarily topic-based
- maturity / audience routing should be secondary and mostly handled through series, tags, and filters

### Series Structure

- series title
- short summary on index
- longer description on detail page
- ordered article list
- topic tags
- optional audience tags

## Resources

### Rules

- resources should feel like a practical study library plus curated recommendations
- each resource should answer why it is useful
- resource cards should prioritize title, type, and short usefulness copy

## About Page

### Rules

- open with a blended intro
- combine manifesto, mission, and faith/doctrine guide
- use the page to build trust and clarify theological posture

## Admin / CMS

### Dashboard

- drafts
- publishing tasks
- overview stats
- quick create actions

### Content List

- hybrid of dense table and card grouping
- fast scanning first
- practical over decorative

### Editor

- main writing area
- preview
- side panels for scripture references, tags, series, metadata, translation source, and publish settings

### Future Governance

Design should leave room for:

- user posting later
- comment moderation later
- access control later
- blocking / approving users later
- content deletion / takedown workflows later

## Content Model

Core entities:

- Article
- Series
- Daily Verse
- Resource
- Author
- Category
- Tag
- Scripture Reference
- Translation Source
- Admin User

Key relationships:

- Article has one primary author
- Article has one or more scripture references
- Article may belong to one primary series
- Series has ordered articles
- Resources may link to articles or series
- translated content must retain source metadata

## Translation Content

You have permission to translate articles from Desiring God and The Gospel Coalition.

Design implications:

- translated content should be clearly labeled
- original source metadata should be visible
- translations should be treated as a launch asset
- the CMS should include translation source fields

## Visual Rules

- start with dark frame
- keep the overall mood as samizdat plus magazine
- maintain strong typographic hierarchy
- avoid generic landing-page behavior
- avoid card-heavy flattening
- keep scripture as the central reading anchor

## Prototype Validation

The prototype is successful if it feels like:

- a real publication
- a serious theological resource
- a helpful place for new believers
- a useful study environment for mature believers
- a practical CMS for editors

## Implementation Priorities

Build in this order:

1. homepage
2. article page
3. series page
4. resources
5. about page
6. CMS dashboard
7. CMS editor

## Final Note

The prototype direction is already validated. Do not reopen the concept unless the first implementation proves the dark frame or the hierarchy does not hold up in the browser.
