import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import config from '@payload-config'

import { parseNewsletterSignup } from '@/lib/newsletter'

async function redirectBack(request: Request, query: Record<string, string>) {
  const referrer = request.headers.get('referer')
  const url = new URL(referrer || '/', request.url)

  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value)
  }

  return NextResponse.redirect(url, { status: 303 })
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const signup = parseNewsletterSignup({
    email: String(formData.get('email') ?? ''),
    source: String(formData.get('source') ?? 'homepage'),
  })

  if (!signup) {
    return redirectBack(request, { newsletter: 'invalid' })
  }

  const payload = await getPayload({ config })

  await payload.create({
    collection: 'newsletter-signups',
    data: signup,
    overrideAccess: true,
  })

  return redirectBack(request, { newsletter: 'success' })
}

