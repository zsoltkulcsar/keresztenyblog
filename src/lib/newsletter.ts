export type NewsletterSignupInput = {
  email?: string
  source?: string
}

export type NewsletterSignupRecord = {
  email: string
  source: string
}

export function normalizeNewsletterEmail(email: string) {
  return email.trim().toLowerCase()
}

export function isValidNewsletterEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function parseNewsletterSignup(input: NewsletterSignupInput): NewsletterSignupRecord | null {
  const email = normalizeNewsletterEmail(input.email ?? '')
  if (!isValidNewsletterEmail(email)) return null

  return {
    email,
    source: input.source?.trim() || 'homepage',
  }
}

