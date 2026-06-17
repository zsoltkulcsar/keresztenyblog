import type { CollectionConfig } from 'payload'

import { allowEditorOrAdmin, isAdminOrEditor } from '@/payload/access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    admin: allowEditorOrAdmin(),
    create: allowEditorOrAdmin(),
    delete: allowEditorOrAdmin(),
    read: allowEditorOrAdmin(),
    readVersions: allowEditorOrAdmin(),
    update: allowEditorOrAdmin(),
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'caption', 'credit'],
    group: 'Content',
    hidden: ({ user }) => !isAdminOrEditor(user as { role?: string | null } | null),
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
    {
      name: 'credit',
      type: 'text',
    },
  ],
  upload: {
    focalPoint: true,
    displayPreview: true,
  },
}
