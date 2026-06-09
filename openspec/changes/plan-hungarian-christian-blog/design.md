## Context

Keskeny Út is planned as a Hungarian Christian editorial blog or magazine. The repository currently contains `keskeny-ut-blueprint.md`, which gives a detailed homepage implementation blueprint for a reverent, editorial, content-first experience using TanStack Start, React 19, Vite, and Tailwind CSS v4.

The missing layer is product and editorial planning: what content types exist, how readers discover them, how the team plans and publishes them, and how the initial homepage can grow into a sustainable blog without drifting into unrelated church, donation, event, or media-product features.

## Goals / Non-Goals

**Goals:**
- Define the blog as a Hungarian-language Christian editorial publication.
- Turn the existing homepage blueprint into the first reader-facing planning anchor.
- Plan clear reader journeys for featured articles, latest articles, topics, series, daily meditation, recommendations, and newsletter signup.
- Define a repeatable editorial workflow from idea to publication and later curation.
- Keep the planning flexible enough to start with static content and later support CMS-backed content.

**Non-Goals:**
- Implement frontend code in this change.
- Choose or integrate a CMS.
- Add authentication, payments, donations, event calendars, sermon players, church member tools, or long-form media hosting.
- Replace the visual direction in `keskeny-ut-blueprint.md`.

## Decisions

### Decision: Treat the homepage blueprint as the first implementation source of truth

The initial implementation SHOULD follow `keskeny-ut-blueprint.md` for visual design, stack, fonts, tokens, layout, content examples, and acceptance checks.

Rationale: The blueprint already contains a coherent editorial direction and exact build guidance. Reusing it prevents the planning phase from fragmenting the design.

Alternative considered: Start with a broader site map and redesign the homepage later. This was rejected because the user already has a concrete initial design and wants help turning it into a plan and workflow.

### Decision: Model the product around editorial content, not church operations

The site SHOULD center on articles, meditations, topic pages, series, recommendations, and newsletter capture.

Rationale: This matches the blueprint guardrails and keeps the publication identity sharp.

Alternative considered: Add events, donations, sermons, or community features early. These are useful in some Christian sites, but they would pull the product away from the requested content/editorial blog.

### Decision: Start with a content inventory that can become structured data later

Planning SHOULD describe articles, series, categories, devotional entries, recommendations, authors, and newsletter copy as structured concepts, even if the first build uses local arrays or static content.

Rationale: This allows the first version to ship simply while keeping future CMS migration straightforward.

Alternative considered: Pick a CMS immediately. That is premature until the first editorial workflow and content rhythm are clear.

### Decision: Separate reader workflows from editorial workflows

The plan SHOULD document both reader-facing flows and internal publishing flows.

Rationale: Readers need clear discovery paths, while editors need repeatable processes for choosing topics, writing, review, publication, and homepage curation. Mixing these too early makes both less clear.

Alternative considered: Plan only UI sections. That would produce a homepage, but not a sustainable blog.

## Risks / Trade-offs

- Static content could become hard to maintain as the publication grows -> Define content fields now and keep sample data close to the shape of future CMS records.
- The visual blueprint contains exact implementation details but not the full editorial operating model -> Use OpenSpec requirements to capture planning decisions that the blueprint intentionally leaves out.
- Newsletter signup may imply backend or third-party integration -> Treat the first version as a captured UI workflow unless a provider is selected later.
- Hungarian copy and accents can be damaged by encoding or tooling -> Require Hungarian language preservation and verify rendered copy during implementation.
- Over-planning could delay a usable first version -> Keep the first release homepage-focused, then expand into topic and series detail pages in later changes.

## Migration Plan

1. Keep `keskeny-ut-blueprint.md` as the existing design reference.
2. Use this OpenSpec change to create the planning contract.
3. Implement the homepage in a later `/opsx:apply` pass using the blueprint and tasks.
4. After the first implementation, archive or sync the resulting specs so future changes can build on stable blog-planning requirements.

Rollback is simple because this change only creates planning artifacts. If the direction changes, update or replace this OpenSpec change before implementation.

## Open Questions

- What is the preferred publication rhythm: daily meditation plus weekly essays, or a slower magazine-style cadence?
- Should author profiles exist in the first release or only appear as bylines?
- Should topics and series have their own pages in the first build, or only homepage links/placeholders?
- Which newsletter provider, if any, should handle subscriptions later?
