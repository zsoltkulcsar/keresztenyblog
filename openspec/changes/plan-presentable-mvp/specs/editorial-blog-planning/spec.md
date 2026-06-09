## MODIFIED Requirements

### Requirement: Homepage-first reader workflow
The blog planning system SHALL use the existing Keskeny Út homepage prototype as the first reader-facing workflow anchor while expanding the MVP into article detail pages, topic browsing, series browsing, author/translator context, and publication information.

#### Scenario: Reader discovers featured content
- **WHEN** a reader arrives on the homepage
- **THEN** the plan MUST prioritize a featured article, daily meditation, latest posts, series cards, newsletter signup, and footer navigation

#### Scenario: Homepage follows prototype constraints
- **WHEN** homepage implementation work is planned
- **THEN** the plan MUST reference the current prototype and `keskeny-ut-blueprint.md` as starting references for stack, fonts, visual tokens, layout sections, SEO expectations, and acceptance checks, without treating either as the final product design

#### Scenario: Reader continues beyond the homepage
- **WHEN** a reader selects an article, topic, series, author, or translator context from the homepage
- **THEN** the MVP plan MUST define a real destination or MVP-safe placeholder with a clear future implementation path

### Requirement: Editorial content model
The blog planning system SHALL define content concepts for articles, translated articles, categories, topics, series, devotional content, recommendations, authors, translators, source publications, and newsletter messaging.

#### Scenario: Article content is planned
- **WHEN** an article is added to the plan
- **THEN** it MUST include at least a title, slug, category, excerpt, author, publication date, reading time, body content, and reader-facing placement

#### Scenario: Series content is planned
- **WHEN** a series is added to the plan
- **THEN** it MUST include a title, description or meta label, image direction, article count or progress signal, and relationship to included posts

#### Scenario: Devotional content is planned
- **WHEN** a daily meditation is added to the plan
- **THEN** it MUST include a short text, biblical reference, and supporting paragraph or reflection

#### Scenario: Translation content is planned
- **WHEN** a translated article is added to the plan
- **THEN** it MUST include source publication, original author, original URL, translator, permission/status notes, and approval status

### Requirement: Editorial production workflow
The blog planning system SHALL define a repeatable internal workflow for idea capture, translation candidate capture, outline, draft, theological/editorial review, translation review, copy edit, publication, and homepage curation.

#### Scenario: Editor proposes an article idea
- **WHEN** an editor captures a new article idea
- **THEN** the workflow MUST classify it by category, intended audience, format, status, and next action

#### Scenario: Translator proposes an external article
- **WHEN** a translator proposes a Desiring God, Gospel Coalition, or similar external article for translation
- **THEN** the workflow MUST capture source metadata, permission status, theological/editorial fit, translation status, and review owner

#### Scenario: Article moves toward publication
- **WHEN** a draft is ready for publication
- **THEN** the workflow MUST include theological/editorial review, Hungarian copy review, metadata confirmation, and homepage placement decision

#### Scenario: Homepage content is curated
- **WHEN** new content is published
- **THEN** the workflow MUST define whether it affects the featured article, latest posts, recommendations, series cards, or newsletter messaging
