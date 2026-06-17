import type { CollectionConfig } from 'payload'

import { allowEditorOrAdmin, allowPublicRead, isAdminOrEditor } from '@/payload/access'
import { buildPreviewUrl } from '@/payload/preview'

export const DailyVerse: CollectionConfig = {
  slug: 'daily-verse',
  access: {
    admin: allowEditorOrAdmin(),
    create: allowEditorOrAdmin(),
    delete: allowEditorOrAdmin(),
    read: allowPublicRead(),
    readVersions: allowEditorOrAdmin(),
    unlock: allowEditorOrAdmin(),
    update: allowEditorOrAdmin(),
  },
  admin: {
    group: 'Content',
    hidden: ({ user }) => !isAdminOrEditor(user as { role?: string | null } | null),
    preview: (doc) => buildPreviewUrl('/napi-ige', doc as { date?: string | null }),
    useAsTitle: 'reference',
  },
  versions: {
    drafts: {
      autosave: false,
      schedulePublish: true,
      validate: true,
    },
    maxPerDoc: 25,
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
