import type { CollectionConfig } from 'payload'

export const NewsletterSignups: CollectionConfig = {
  slug: 'newsletter-signups',
  access: {
    create: () => true,
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
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

