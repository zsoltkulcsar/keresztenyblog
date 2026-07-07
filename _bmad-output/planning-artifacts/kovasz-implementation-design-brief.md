# Kovasz Implementation Design Brief

## Product Definition

Kovasz is a Hungarian Christian discipleship and formation publication. It is not a generic blog. The site exists to deepen Bible understanding, guide spiritual growth, and support daily Christian life for two overlapping audiences:

- new believers who need clarity, guidance, and simple entry points
- mature believers and leaders who need deeper study, teaching resources, and practical ministry support

The product should feel like a serious theological journal with a contemporary magazine structure. The visual direction starts from the dark, bold publication framing of `des1.png`, but keeps the existing samizdat identity from the project brief. The result should be a deliberate hybrid: raw enough to feel distinct, polished enough to feel modern and readable.

## Content Strategy

Primary content types:

- Articles
- Series
- Resources
- About / doctrine / mission content
- Daily Verse as an optional secondary surface

Editorial formats:

- educational posts
- devotionals
- testimonies
- inspiring stories
- practical Christian life guidance
- study aids
- translated content from approved external sources

Theme areas for launch:

- Pastoral Theology
- Christian Life and Personal Growth
- Marriage, Family, and Relationships
- Ethics

Scripture is the anchor of every post. Article content should not feel like commentary floating away from the Bible passage. It should start from Scripture and move outward into explanation, application, and reflection.

## Translation Strategy

You said you have permission to translate articles from Desiring God and The Gospel Coalition. That should become a launch advantage.

Design implications:

- translated content must be clearly labeled
- translated content should be treated as a first-class content type, not hidden
- article metadata should include original source, author, and translation note
- translations can help seed the site with recognizable theological depth

This is strategically useful because both comparables already show strong editorial structure and topic discipline.

## Homepage

The homepage should behave like a magazine front page.

Priorities:

1. one full-width lead article
2. a latest articles grid directly below
3. mixed editorial modules for series, resources, and optionally daily verse
4. a visible but secondary path into the “new in faith / more experienced” distinction, mostly through series and filters

Visual character:

- dark editorial frame to start
- full-width lead story inspired by `des1.png`
- large, confident title treatment
- compact editorial modules beneath it
- no boxed marketing hero
- no landing-page feel
- the public navbar should stay on one row on desktop and collapse into a hamburger on narrow widths
- the public navbar should only show Articles, Series, Resources, About, and Search
- Admin should not be a primary public-nav item

The homepage should feel like a publication front page, not a startup homepage.

## Article Page

The article page should be a hybrid of:

- quiet reading room
- journal / article spread
- sermon / study page
- biblical note page

Strong bias:

- Scripture block first
- pull quote second
- study panel third
- image fourth
- metadata fifth

Structure:

- title
- scripture block
- pull quote
- study panel
- continuous article body with headings and subheadings
- image if relevant
- metadata / author / share / related links

Study panel behavior:

- content-dependent
- may contain cross references
- may contain teaching notes
- may contain reflection questions
- may contain a blend of these depending on article type

The article page should not feel like a simple blog post. It should feel like a theological reading artifact with editorial discipline.

## Series Page

Series are the main routing mechanism for audience differentiation and learning paths.

Series page should be:

- a study path
- an editorial archive
- a guided discipleship journey

Page behavior:

- title and description should be the first visible series signal
- list view should stay short and scannable
- detailed view should expand into longer description and fuller context
- filters should be primarily topic-based
- audience distinction should be secondary and mostly handled through filters, tags, and series organization

This means:

- homepage stays mixed
- series page carries the learning-path structure
- readers self-select by topic first
- maturity level is a routing layer, not the main homepage headline

## Resources

Resources should feel like a practical study library plus curated recommendations.

Useful resource types:

- reading lists
- PDFs
- study aids
- external links
- translation sources
- ministry tools

Visual hierarchy:

- title
- type
- short usefulness copy

Resources should answer: “Why is this useful for growth or study?”

## About Page

The about page should combine:

- manifesto
- mission statement
- faith / doctrine guide

It should open with a blended intro, not a rigid sequence.

Purpose:

- trust-building
- editorial positioning
- theological clarity
- reader orientation

This page matters more than a typical “about us” page because the publication is faith-based and readers need to understand the project’s posture.

## Admin and Editorial Workflow

The admin should use a CMS-first model.

Requirements:

- do not build the editor from zero if a CMS can do it
- keep editorial tools practical
- minimize custom infrastructure
- support drafts, publishing tasks, overview stats, and quick-create actions
- support future moderation and access-control needs

Dashboard should mix:

- draft queue
- publishing tasks
- overview stats
- quick create buttons

Content list should be a hybrid of:

- dense table behavior for speed
- card-like grouping where useful

Editor should combine:

- writing space
- preview
- side panels for scripture references, tags, series, metadata, and publishing controls

Future governance:

- admin-managed user access
- comment moderation
- content removal
- block / approve flows

These are future-facing requirements, not MVP blockers, but the design should not paint us into a corner.

## Content Model

Recommended core entities:

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

Recommended relationships:

- Article belongs to one primary Series or none
- Article has one Author
- Article can have multiple Tags
- Series has ordered Articles
- Resources can point to Articles, Series, or external links
- Translated content should point back to original source metadata

## Visual Rules

Overall mood:

- deliberate hybrid of samizdat and magazine
- start with a dark frame
- revisit later if the prototype feels too heavy

Strong visual rules:

- full-width lead article
- strong typographic hierarchy
- scripture gets visual priority
- no generic startup hero
- no card-soup homepage
- no decorative gradients or blobs
- high contrast and editorial discipline
- calm reading surfaces after the homepage

## Launch Content Strategy

For the first prototype, the content mix should support the site’s purpose:

- original teaching articles
- devotionals
- series on the four launch topics
- practical resources for readers and leaders
- translated articles from approved sources where they fit the mission

The key is not volume for its own sake. The goal is to make the site feel alive, authoritative, and useful from the first prototype.

## Open Questions

These should be revisited after the first prototype:

- how visible should the new believer / mature believer split be in the homepage?
- should the dark frame remain dominant or soften into a hybrid after seeing it live?
- should translated content get its own filter or just a label?
- how far should moderation and user posting be designed before MVP?
- should resources include file downloads in the first version or stay link-based?

## Immediate Prototype Direction

Build the first prototype around:

1. dark framed magazine homepage
2. full-width lead story
3. latest articles grid
4. scripture-first article page
5. CMS-style admin dashboard and editor
6. topic-first series page with short summary and deeper detail on open

That is the shortest path to testing the real identity of the product.
