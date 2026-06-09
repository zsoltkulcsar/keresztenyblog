## ADDED Requirements

### Requirement: Hungarian Christian editorial identity
The blog planning system SHALL define Keskeny Út as a Hungarian-language Christian editorial publication centered on articles, meditations, topic collections, and series.

#### Scenario: Planning preserves publication identity
- **WHEN** a new feature, section, or workflow is planned
- **THEN** it MUST support the Hungarian Christian editorial identity and avoid unrelated product directions such as events, donations, sermons, or church administration

#### Scenario: Hungarian copy is required
- **WHEN** reader-facing content is planned for the blog
- **THEN** the planned copy MUST be Hungarian unless explicitly marked as internal placeholder content

### Requirement: Homepage-first reader workflow
The blog planning system SHALL use the existing Keskeny Út homepage blueprint as the first reader-facing workflow anchor.

#### Scenario: Reader discovers featured content
- **WHEN** a reader arrives on the homepage
- **THEN** the plan MUST prioritize a featured article, daily meditation, latest posts, series cards, newsletter signup, and footer navigation

#### Scenario: Homepage follows blueprint constraints
- **WHEN** homepage implementation work is planned
- **THEN** the plan MUST reference `keskeny-ut-blueprint.md` for stack, fonts, visual tokens, layout sections, SEO expectations, and acceptance checks

### Requirement: Editorial content model
The blog planning system SHALL define content concepts for articles, categories, series, devotional content, recommendations, authors, and newsletter messaging.

#### Scenario: Article content is planned
- **WHEN** an article is added to the plan
- **THEN** it MUST include at least a title, category, excerpt, author, publication date, and reader-facing placement

#### Scenario: Series content is planned
- **WHEN** a series is added to the plan
- **THEN** it MUST include a title, description or meta label, image direction, article count or progress signal, and relationship to included posts

#### Scenario: Devotional content is planned
- **WHEN** a daily meditation is added to the plan
- **THEN** it MUST include a short text, biblical reference, and supporting paragraph or reflection

### Requirement: Reader discovery workflows
The blog planning system SHALL define reader workflows for browsing latest posts, filtering by topic, opening series, reading recommended content, and subscribing to the newsletter.

#### Scenario: Reader browses latest posts
- **WHEN** a reader scans the latest-posts section
- **THEN** the plan MUST expose category, title, excerpt, author, and date metadata for each listed post

#### Scenario: Reader explores series
- **WHEN** a reader chooses a series
- **THEN** the plan MUST make clear whether the first release opens a real series page, a placeholder route, or a planned future feature

#### Scenario: Reader subscribes to newsletter
- **WHEN** a reader submits an email through the newsletter section
- **THEN** the plan MUST define whether submission is prevented locally, stored locally, or sent to a selected external provider

### Requirement: Editorial production workflow
The blog planning system SHALL define a repeatable internal workflow for idea capture, outline, draft, theological/editorial review, copy edit, publication, and homepage curation.

#### Scenario: Editor proposes an article idea
- **WHEN** an editor captures a new article idea
- **THEN** the workflow MUST classify it by category, intended audience, format, status, and next action

#### Scenario: Article moves toward publication
- **WHEN** a draft is ready for publication
- **THEN** the workflow MUST include theological/editorial review, Hungarian copy review, metadata confirmation, and homepage placement decision

#### Scenario: Homepage content is curated
- **WHEN** new content is published
- **THEN** the workflow MUST define whether it affects the featured article, latest posts, recommendations, series cards, or newsletter messaging

### Requirement: Scope guardrails
The blog planning system SHALL keep first-release planning scoped to editorial content and simple reader interactions.

#### Scenario: Non-editorial feature is requested
- **WHEN** a requested feature involves events, donations, sermons, memberships, user accounts, or church operations
- **THEN** the plan MUST mark it out of scope for the first editorial blog release unless a later OpenSpec change explicitly expands scope

#### Scenario: Implementation scope is prepared
- **WHEN** implementation tasks are created
- **THEN** they MUST focus on the homepage, visual system, static content structure, reader discovery sections, and verification against the blueprint
