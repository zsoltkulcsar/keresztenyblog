# Acceptance Auditor Review Prompt

You are auditing whether the implementation satisfies the spec. Do not use the conversation history.

Read:

- `_bmad-output/implementation-artifacts/spec-cms-backed-content-flows.md`
- `_bmad-output/planning-artifacts/sprint-change-proposal-2026-07-08-cms-content-structure.md`

Baseline commit: `0f9b1254562408963f66016f299e85cfd575bee8`

Inspect the diff from baseline and verify each acceptance criterion:

- Public pages use Payload CMS records when published CMS content exists.
- Public pages fall back to static starter content when Payload is empty or unavailable.
- Draft records are excluded from public article and series flows.
- Seed content is idempotent by slug and does not duplicate starter records.
- Ordered series relationships drive series detail and article navigation.
- Resources keep existing text fields while adding reusable topic/audience relationships.
- Daily Verse is deferred and Books are unchanged.

Report deviations from the approved spec, missing verification, or high-risk implementation gaps with file and line references.
