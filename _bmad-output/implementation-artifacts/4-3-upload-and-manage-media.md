---
baseline_commit: 06d5f3bbcf9ddb090c1b78cd111b9e927c0fd2f0
---

# Story 4.3: Upload and manage media

Status: review

## Story

As an editor,
I want to upload and manage images and files with required metadata,
so that public content has the right supporting media and accessibility data.

## Acceptance Criteria

1. The media collection stores alt text, caption, credit, and focal point support.
2. Uploads are usable from the CMS admin interface.
3. Required accessibility fields are enforced for images used in publication.
4. Media is visible to authorized editors and admins only for management.
5. The media configuration matches the needs of the public publication pages.

## Tasks / Subtasks

- [x] Expand the media collection metadata fields.
- [x] Enable focal point support in the upload configuration.
- [x] Apply role-based access to media management.
- [x] Add tests for media field requirements and configuration.

## Dev Agent Record

### Debug Log

- Created from Epic 4 backlog.
- Expanded the media collection with caption and credit fields.
- Enabled focal-point and preview support in the upload configuration.
- Restricted media management to authorized editors and admins.
- Updated generated payload types and added collection coverage tests.
- Validated with `npm run lint` and `npx tsc --noEmit`.

### Completion Notes

- Media uploads now carry the accessibility and attribution metadata the publication needs.
- Editors and admins can manage media through the CMS, with focal-point support enabled for image cropping/placement.
- Validation passed with lint and TypeScript.

### File List

- `_bmad-output/implementation-artifacts/4-3-upload-and-manage-media.md`
- `src/collections/Media.ts`
- `src/payload-types.ts`
- `tests/unit/payload-collections.spec.ts`

### Change Log

- 2026-06-17: Created Story 4.3.
- 2026-06-17: Implemented media metadata and upload management support.
