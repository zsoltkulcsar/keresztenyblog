import { NextResponse } from 'next/server'

import { buildRedirectManifest } from '@/lib/discovery-metadata'

export function GET() {
  return NextResponse.json({
    redirects: buildRedirectManifest(),
  })
}
