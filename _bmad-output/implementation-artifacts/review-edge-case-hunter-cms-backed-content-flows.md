# Edge Case Hunter Review Prompt

You are reviewing the CMS-backed content-flow implementation. You may inspect the project, but do not use the conversation history.

Baseline commit: `0f9b1254562408963f66016f299e85cfd575bee8`

Inspect the diff from baseline plus the affected files:

- `src/payload/bootstrap.ts`
- `src/lib/cms-content.ts`
- `src/lib/article-archive.ts`
- `src/lib/article-detail.ts`
- `src/lib/series.ts`
- `src/lib/resources.ts`
- `src/collections/Resources.ts`
- `src/app/(frontend)/page.tsx`
- `src/app/(frontend)/articles/page.tsx`
- `src/app/(frontend)/articles/[slug]/page.tsx`
- `src/app/(frontend)/series/page.tsx`
- `src/app/(frontend)/series/[slug]/page.tsx`
- `src/app/(frontend)/resources/[slug]/page.tsx`
- `tests/unit/cms-content-flows.spec.ts`

Focus on boundary cases: empty CMS, partial relationship hydration, draft records, malformed rich text, missing series order, repeated bootstrap runs, resource taxonomy fields, and route runtime behavior. Report only real, actionable issues.
