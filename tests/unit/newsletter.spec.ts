import { describe, expect, it } from 'vitest'

import { isValidNewsletterEmail, parseNewsletterSignup } from '@/lib/newsletter'

describe('newsletter signup', () => {
  it('normalizes and accepts valid email addresses', () => {
    expect(isValidNewsletterEmail('reader@example.com')).toBe(true)
    expect(parseNewsletterSignup({ email: ' Reader@example.com ', source: 'homepage' })).toEqual({
      email: 'reader@example.com',
      source: 'homepage',
    })
  })

  it('rejects invalid email addresses', () => {
    expect(isValidNewsletterEmail('not-an-email')).toBe(false)
    expect(parseNewsletterSignup({ email: 'not-an-email' })).toBeNull()
  })
})

