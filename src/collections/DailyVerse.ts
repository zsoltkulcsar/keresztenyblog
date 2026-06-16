import type { CollectionConfig } from 'payload'

export const DailyVerse: CollectionConfig = {
  slug: 'daily-verse',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'reference',
  },
  fields: [
    {
      name: 'date',
      required: true,
      type: 'date',
      unique: true,
    },
    {
      name: 'reference',
      required: true,
      type: 'text',
    },
    {
      name: 'text',
      required: true,
      type: 'textarea',
    },
    {
      name: 'note',
      type: 'textarea',
    },
    {
      name: 'status',
      defaultValue: 'draft',
      required: true,
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}

