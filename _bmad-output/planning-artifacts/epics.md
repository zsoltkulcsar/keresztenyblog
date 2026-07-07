---
stepsCompleted: [1]
inputDocuments:
  - kovasz-prd.md
  - architecture.md
  - kovasz-ux-design.md
  - kovasz-implementation-design-brief.md
---

# bbb - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for bbb, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Render a publication masthead with brand, primary navigation, search entry point, and featured content.
FR2: Curate homepage sections with editorial picks and automatic fallback to latest published content.
FR3: Browse a paginated article archive with filters for category, series, author, tag, and sort order.
FR4: Search Articles, Series, Authors, Daily Verses, and Resources.
FR5: Render article detail pages with title, subtitle, author, date, category, reading time, cover image, body, Scripture references, pull quotes, footnotes, and related content.
FR6: Show previous/next series navigation and full series context on article pages when the article belongs to a series.
FR7: Provide reader utilities such as share/copy and reading progress without layout shift.
FR8: Manage series with title, slug, description, cover image, status, ordered article list, and SEO fields.
FR9: Publish series pages that show ordered parts, publication dates, progress cues, and are indexable.
FR10: Manage date-bound Daily Verse entries with Scripture text, reference, optional note, and status.
FR11: Render a Daily Verse archive with stable URLs and pagination.
FR12: Publish resource items with type, title, description, link or file, optional related article or series, and tags.
FR13: Manage author profiles with name, slug, role, bio, photo, links, and active status.
FR14: Publish About page content including manifesto, mission, faith/doctrine, team, and contact information.
FR15: Authenticate admins securely with Admin and Editor roles.
FR16: Support drafts, previews, publishing, unpublishing, and scheduling in the editorial workflow.
FR17: Upload and manage media with alt text, caption, credit, and focal point.
FR18: Generate route metadata including title, description, canonical URL, Open Graph data, and Article schema where applicable.
FR19: Generate RSS and sitemap outputs for published public content.
FR20: Capture newsletter interest through an email signup form.

### NonFunctional Requirements

NFR1: Public pages must be server-rendered or statically generated and performant on low-end mobile devices.
NFR2: Public content must be crawlable without client-only rendering.
NFR3: Public and admin UI must meet WCAG 2.2 AA for contrast, keyboard navigation, focus visibility, labels, and semantic structure.
NFR4: Admin access must use secure session handling, role-based access control, and secret management through environment variables.
NFR5: Published URLs must be stable and slug changes must create redirects.
NFR6: Editorial content must not publish without required fields and validations.
NFR7: Production should capture errors and basic analytics without excessive reader tracking.
NFR8: Newsletter signups and admin accounts must collect the minimum data needed.
NFR9: Database and media storage require routine backups and recovery planning.
NFR10: Use TypeScript, schema validation, linting, formatting, and tests for critical editorial flows.

### Additional Requirements

- Use Next.js App Router with TypeScript as the application foundation.
- Use `create-payload-app` as the starter template.
- Use Payload CMS for admin, content collections, auth, media, and APIs.
- Use PostgreSQL with `@payloadcms/db-postgres` as the production database.
- Use object storage or an upload-backed provider for production media.
- Keep search database-backed in MVP behind a service abstraction so an external search engine can be added later.
- Generate metadata, sitemap, RSS, robots, and redirect outputs from published content.
- Revalidate public pages after publish/unpublish actions.
- Keep translations as first-class content with source metadata and import support.
- Use role-based access control for admin/editor boundaries.
- Use server components by default for public pages and client components only for interactive filters, search, and admin controls.
- Plan for future moderation, comment handling, and user posting without forcing them into MVP.
- Provision analytics and error tracking before launch.
- Keep backup and recovery concerns in scope from the start.

### UX Design Requirements

UX-DR1: The homepage must open as a publication front page, not a marketing landing page.
UX-DR2: The homepage must use a dark editorial frame with a strong masthead, dense modules, and a full-width lead story.
UX-DR3: The homepage must place the latest articles grid directly below the lead story.
UX-DR4: The homepage must include mixed editorial modules for Daily Verse, series, resources, and newsletter signup.
UX-DR5: The homepage must keep the new-believer vs mature-believer distinction secondary and mostly routed through series and filters.
UX-DR6: Article pages must prioritize a Scripture block first, followed by pull quote, study panel, image, then metadata.
UX-DR7: Article pages must behave as a hybrid of quiet reading room, journal spread, sermon/study page, and biblical note page.
UX-DR8: The study panel must adapt to article content and may show cross references, teaching notes, reflection questions, or a blend.
UX-DR9: Article pages must support continuous reading with visible headings and subheadings.
UX-DR10: Article pages must include reading progress, share/copy behavior, and related content links.
UX-DR11: Series pages must prioritize title and short description first, with topic-based filters and maturity routing secondary.
UX-DR12: Series detail pages must expand into longer descriptions and fuller context when opened.
UX-DR13: Resources must present title and type first, then short usefulness copy.
UX-DR14: About must blend manifesto, mission, and faith/doctrine in a trust-building opening.
UX-DR15: The admin dashboard must be dense and operational, with drafts, publishing tasks, stats, and quick-create actions.
UX-DR16: The admin content list must be a hybrid of table behavior and card-like grouping.
UX-DR17: The editor must combine a writing space, preview, and side panels for Scripture, tags, series, metadata, and publishing controls.
UX-DR18: The visual system must keep strong typographic hierarchy, sharp-to-slightly-soft corners, grayscale editorial imagery, no decorative gradients or blobs, and no card-in-card layouts.

### FR Coverage Map

FR1: Epic 1 - Publication front page and navigation.
FR2: Epic 1 - Curated homepage sections with fallback behavior.
FR3: Epic 1 - Reader archive browsing and filtering.
FR4: Epic 1 - Search across editorial content.
FR18: Epic 1 - Route metadata and sharing data for public discovery.
FR19: Epic 1 - RSS and sitemap generation for public discovery.
FR20: Epic 1 - Newsletter signup capture on the public site.

FR5: Epic 2 - Long-form article reading experience.
FR6: Epic 2 - Series context and navigation inside articles.
FR7: Epic 2 - Reader utilities such as share/copy and reading progress.

FR8: Epic 3 - Series management and ordering.
FR9: Epic 3 - Public series pages and progress cues.
FR10: Epic 3 - Daily Verse management.
FR11: Epic 3 - Daily Verse archive and browsing.

FR12: Epic 5 - Resource publishing and browsing.
FR13: Epic 5 - Author profile management and author pages.
FR14: Epic 5 - About page and trust content management.

FR15: Epic 4 - Admin authentication and role-based access.
FR16: Epic 4 - Draft, preview, publish, unpublish, and schedule workflow.
FR17: Epic 4 - Media upload and management.

## Epic List

### Epic 1: Discover the Publication
Readers can immediately understand Kovasz, navigate the front page, browse the archive, search the publication, subscribe, and reach content through stable metadata-driven discovery.
**FRs covered:** FR1, FR2, FR3, FR4, FR18, FR19, FR20

### Epic 2: Read and Study Articles
Readers can open an article and get a calm, scripture-first reading experience with series context, reading progress, and sharing tools.
**FRs covered:** FR5, FR6, FR7

### Epic 3: Follow Series and Daily Scripture
Readers can use series and Daily Verse as guided learning paths for growth, study, and recurring spiritual rhythm.
**FRs covered:** FR8, FR9, FR10, FR11

### Epic 4: Publish Content in a Practical CMS
Editors can sign in, draft, preview, publish, schedule, and manage media in a CMS-first editorial workspace with role-based access.
**FRs covered:** FR15, FR16, FR17

### Epic 5: Build Trust and Practical Support
Readers can learn who is behind the publication, understand the editorial posture, and access practical resources that support study and growth.
**FRs covered:** FR12, FR13, FR14

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic 1: Discover the Publication

Readers can immediately understand Kovasz, navigate the front page, browse the archive, search the publication, subscribe, and reach content through stable metadata-driven discovery.

### Story 1.1: Initialize the Payload/Next.js starter

As a developer,
I want the project scaffolded from the approved starter template,
So that the public site and CMS share a working foundation before feature work begins.

**Acceptance Criteria:**

**Given** the repository is initialized from `create-payload-app`
**When** I run the local development command
**Then** the Next.js app and Payload admin route both start successfully
**And** the PostgreSQL adapter is configured for local development

**Given** the starter scaffold is in place
**When** I inspect the project setup
**Then** environment templates, linting, formatting, and test scripts exist

### Story 1.2: Publish a recognizable front page

As a reader,
I want the homepage to present Kovasz as a clear publication front page,
So that I can immediately understand what the site is and where to start reading.

**Acceptance Criteria:**

**Given** the homepage loads on desktop or mobile
**When** the page renders
**Then** the masthead, primary navigation, search entry point, and featured content are visible in the first viewport
**And** the page does not feel like a generic marketing landing page

**Given** no editor-picked feature is configured
**When** the homepage renders
**Then** the page falls back to the latest published content without breaking layout

### Story 1.3: Curate homepage content modules

As an editor,
I want to curate homepage modules for articles, series, Daily Verse, resources, and newsletter signup,
So that the front page reflects editorial priorities while still staying current.

**Acceptance Criteria:**

**Given** curated homepage content exists
**When** the homepage renders
**Then** the lead story and supporting modules use the curated items
**And** the latest published content appears where no curated item exists

**Given** a curated module is removed
**When** the homepage reloads
**Then** the module falls back to the most recent appropriate published content

### Story 1.4: Browse and filter the article archive

As a reader,
I want to browse a paginated archive and filter it by category, series, author, tag, and sort order,
So that I can find content that matches my interest.

**Acceptance Criteria:**

**Given** the article archive loads
**When** I apply one or more filters
**Then** the results update to show only matching published articles
**And** the filter state is reflected in the URL

**Given** no articles match the current filters
**When** the page renders
**Then** an empty state appears with a clear reset action

### Story 1.5: Search the publication

As a reader,
I want to search articles, series, authors, Daily Verses, and resources,
So that I can recover content I remember but cannot locate manually.

**Acceptance Criteria:**

**Given** I enter a search query
**When** search executes
**Then** matching content types appear with title and context
**And** the search state can be shared via the URL

**Given** there are no matches
**When** the search completes
**Then** the page shows a no-results state with guidance to broaden the query

### Story 1.6: Generate discovery metadata and syndication outputs

As a site owner,
I want public pages to generate metadata, RSS, sitemap, and redirect outputs,
So that the publication is indexable and stable over time.

**Acceptance Criteria:**

**Given** a public article or series is published
**When** metadata is generated
**Then** title, description, canonical URL, and Open Graph data are present
**And** the item appears in the appropriate sitemap and RSS output where applicable

**Given** a slug changes
**When** the redirect data is saved
**Then** the old URL resolves to the new URL

### Story 1.7: Capture newsletter interest

As a reader,
I want a simple newsletter signup form,
So that I can subscribe for updates without interrupting my reading.

**Acceptance Criteria:**

**Given** I enter a valid email address
**When** I submit the form
**Then** the signup is stored or forwarded successfully
**And** the user sees a success state

**Given** I enter an invalid email address
**When** I submit the form
**Then** the form shows a validation error and prevents submission

## Epic 2: Read and Study Articles

Readers can open an article and get a calm, scripture-first reading experience with series context, reading progress, and sharing tools.

### Story 2.1: Render a scripture-first article detail page

As a reader,
I want an article page that prioritizes Scripture, study cues, and long-form reading,
So that I can focus on the text and understand the teaching clearly.

**Acceptance Criteria:**

**Given** a published article loads
**When** the page renders
**Then** the Scripture block appears before the article body and metadata
**And** the page includes title, author, date, category, reading time, cover image, and related content where available

**Given** the article has headings and subheadings
**When** I scroll through the page
**Then** the structure remains readable and stable without layout jumps

### Story 2.2: Show study context within article pages

As a reader,
I want the article page to surface series context and study aids,
So that I can understand the article in its theological and editorial context.

**Acceptance Criteria:**

**Given** the article belongs to a series
**When** the page renders
**Then** previous and next series navigation is visible
**And** the series context is shown clearly on the page

**Given** article study content exists
**When** the page renders
**Then** the study panel can show cross references, teaching notes, reflection questions, or a mix based on the content

### Story 2.3: Support reading progress and sharing

As a reader,
I want reading progress and simple share/copy actions,
So that I can keep my place and share an article without friction.

**Acceptance Criteria:**

**Given** I read through an article
**When** I scroll
**Then** reading progress updates without moving layout content

**Given** I choose to share or copy the article
**When** I use the action
**Then** the link is shared or copied successfully with a graceful fallback if browser sharing is unavailable

## Epic 3: Follow Series and Daily Scripture

Readers can use series and Daily Verse as guided learning paths for growth, study, and recurring spiritual rhythm.

### Story 3.1: Manage series as ordered learning paths

As an editor,
I want to create and organize series with ordered articles and editorial metadata,
So that I can build a guided learning path for readers.

**Acceptance Criteria:**

**Given** I create a series
**When** I save the series
**Then** the series can include title, slug, description, cover image, status, ordered articles, and SEO fields
**And** the series can be published or kept in draft

### Story 3.2: Render series pages for readers

As a reader,
I want a series page that shows the title, short description, and ordered parts,
So that I can decide whether to follow the series.

**Acceptance Criteria:**

**Given** a published series loads
**When** the page renders
**Then** the title and short description appear first
**And** the ordered article list and progress cues are visible

**Given** the series page is opened in more detail
**When** the detail view renders
**Then** a longer description and fuller context are shown

### Story 3.3: Manage Daily Verse entries

As an editor,
I want to create date-bound Daily Verse entries,
So that readers can receive a recurring Scripture rhythm.

**Acceptance Criteria:**

**Given** I create a Daily Verse entry
**When** I save it
**Then** it includes Scripture text, reference, optional note, date, and status
**And** only one published primary entry is active for a given date

### Story 3.4: Render the Daily Verse archive

As a reader,
I want to browse past Daily Verse entries,
So that I can revisit Scripture from previous days.

**Acceptance Criteria:**

**Given** I open the Daily Verse archive
**When** the page renders
**Then** I can browse entries by date with stable URLs
**And** pagination or archive navigation is available

## Epic 4: Publish Content in a Practical CMS

Editors can sign in, draft, preview, publish, schedule, and manage media in a CMS-first editorial workspace with role-based access.

### Story 4.1: Authenticate editors with role-based access

As an admin or editor,
I want secure sign-in and role-based access,
So that only authorized people can manage the publication.

**Acceptance Criteria:**

**Given** I am not authenticated
**When** I try to access admin pages
**Then** access is denied

**Given** I sign in with a valid role
**When** authentication succeeds
**Then** I can access only the areas allowed by my role

### Story 4.2: Draft, preview, publish, and schedule content

As an editor,
I want to draft, preview, publish, unpublish, and schedule content,
So that I can manage the publication lifecycle without developer help.

**Acceptance Criteria:**

**Given** I create or edit content
**When** I save it as a draft
**Then** it remains unpublished

**Given** I preview content
**When** the preview opens
**Then** the page reflects the editorial content closely enough to catch formatting and structure issues

**Given** I publish or unpublish content
**When** the action completes
**Then** public pages update accordingly after revalidation

### Story 4.3: Upload and manage media

As an editor,
I want to upload and manage images and files with required metadata,
So that public content has the right supporting media and accessibility data.

**Acceptance Criteria:**

**Given** I upload media
**When** the upload is saved
**Then** alt text, caption, credit, and focal point are available

**Given** an image is required for publication
**When** alt text is missing
**Then** the content cannot be published until the accessibility requirement is satisfied

## Epic 5: Build Trust and Practical Support

Readers can learn who is behind the publication, understand the editorial posture, and access practical resources that support study and growth.

### Story 5.1: Publish author profiles

As a reader,
I want to open author pages and understand who wrote the content,
So that I can build trust in the publication.

**Acceptance Criteria:**

**Given** an author profile exists
**When** I open the author page
**Then** I see name, role, bio, photo, links, and a list of published articles

### Story 5.2: Publish About page content

As a reader,
I want an editable About page with mission and theological posture,
So that I can understand the publication’s identity and trust it.

**Acceptance Criteria:**

**Given** the About page loads
**When** it renders
**Then** the page blends manifesto, mission, faith/doctrine, team, and contact information
**And** the content can be updated through the CMS

### Story 5.3: Publish resources for study and growth

As a reader,
I want to browse practical resources with clear usefulness cues,
So that I can find study aids, reading lists, files, and links that support growth.

**Acceptance Criteria:**

**Given** a resource list loads
**When** the page renders
**Then** each resource shows title, type, and short usefulness copy
**And** resources can link to related articles or series when relevant

**Given** a resource is an external link or file
**When** I open it
**Then** the resource resolves correctly and is identifiable by its type

### Story {{N}}.{{M}}: {{story_title_N_M}}

As a {{user_type}},
I want {{capability}},
So that {{value_benefit}}.

**Acceptance Criteria:**

<!-- for each AC on this story -->

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}
**And** {{additional_criteria}}

<!-- End story repeat -->
