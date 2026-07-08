import type { CollectionConfig } from 'payload'

import { allowEditorOrAdmin, allowPublicRead, isAdminOrEditor } from '@/payload/access'

export const Audiences: CollectionConfig = {
  slug: 'audiences',
  access: {
    admin: allowEditorOrAdmin(),
    create: allowEditorOrAdmin(),
    delete: allowEditorOrAdmin(),
    read: allowPublicRead(),
    update: allowEditorOrAdmin(),
  },
  admin: {
    group: 'Taxonomy',
    hidden: ({ user }) => !isAdminOrEditor(user as { role?: string | null } | null),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'slug',
      required: true,
      type: 'text',
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
