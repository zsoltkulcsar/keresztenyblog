# Technical Research: Content Publication Architecture for Kovasz

## Executive Summary

The strongest technical fit for Kovasz is a content-first Next.js App Router application with a CMS that handles admin, auth, collections, media, and preview. The project should not start with a custom backend unless there is a separate non-CMS requirement. That keeps SEO, publishing, and editorial workflows practical.

## Recommended Stack Direction

### Next.js App Router

- Official docs support route-level metadata, Open Graph images, route handlers, and sitemap generation.
- App Router is well suited to public editorial pages, dynamic article pages, and server-rendered metadata.
- Next.js documents `generateMetadata` for route-specific metadata and `sitemap.ts`/`generateSitemaps` for sitemap output.

### Payload CMS

- Payload positions itself as a Next.js fullstack framework.
- It provides an auto-generated admin panel, authentication, access control, file storage, live preview, REST and GraphQL APIs, and migrations.
- It supports MongoDB and PostgreSQL.
- For Kovasz, it is a practical fit for articles, series, authors, resources, newsletter signups, and moderation-ready user/admin flows.

## Technical Implications for Kovasz

1. Public pages should be server-rendered or statically generated.
2. Metadata must be generated per route, not hard-coded globally.
3. Sitemap and OG images should be built using Next.js file conventions.
4. Media management should be built into the CMS.
5. Auth and access control should be CMS-native, not custom-built from scratch.
6. The architecture should support future moderation and user posting without redesigning the whole backend.

## Why This Beats React SPA + Custom FastAPI for MVP

- A public Christian publication needs crawlable pages and metadata from the start.
- A CMS already covers the editor/admin workflow you want.
- FastAPI + separate frontend adds coordination and implementation cost without solving the core editorial problem better.
- If a specialized backend is needed later, it can be added as a service rather than the foundation.

## Technical Features to Preserve in Design

- route-level article metadata
- article, series, and resource collections
- editorial preview
- access control for admins/editors
- media uploads with resizing and focal-point cropping
- redirects for slug changes
- RSS and sitemap output
- moderation-ready future user access

## Sources

- Next.js metadata docs: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js sitemap docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js App Router docs: https://nextjs.org/docs/app
- Payload docs home: https://payloadcms.com/docs
- Payload “What is Payload?”: https://payloadcms.com/docs/getting-started/what-is-payload
