import type { CollectionConfig } from 'payload'

import { allowAdminOnly, isAdmin } from '@/payload/access'

export const NewsletterSignups: CollectionConfig = {
  slug: 'newsletter-signups',
  access: {
    create: () => true,
    delete: allowAdminOnly(),
    read: allowAdminOnly(),
    readVersions: allowAdminOnly(),
    update: allowAdminOnly(),
  },
  admin: {
    group: 'Submissions',
    hidden: ({ user }) => !isAdmin(user as { role?: string | null } | null),
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      required: true,
      type: 'email',
      unique: true,
    },
    {
      name: 'source',
      required: true,
      type: 'text',
    },
  ],
}
