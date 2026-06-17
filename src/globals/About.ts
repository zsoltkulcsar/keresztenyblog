import type { GlobalConfig } from 'payload'

import { allowEditorOrAdmin, allowPublicRead, isAdminOrEditor } from '@/payload/access'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  access: {
    read: allowPublicRead(),
    readVersions: allowEditorOrAdmin(),
    update: allowEditorOrAdmin(),
  },
  admin: {
    group: 'Content',
    hidden: ({ user }) => !isAdminOrEditor(user as { role?: string | null } | null),
  },
  versions: {
    drafts: {
      autosave: false,
      schedulePublish: true,
      validate: true,
    },
    max: 25,
  },
  fields: [
    {
      name: 'manifesto',
      required: true,
      type: 'textarea',
    },
    {
      name: 'mission',
      required: true,
      type: 'textarea',
    },
    {
      name: 'doctrine',
      required: true,
      type: 'textarea',
    },
    {
      name: 'editorialPosture',
      required: true,
      type: 'textarea',
    },
    {
      name: 'visualIdentity',
      required: true,
      type: 'textarea',
    },
    {
      name: 'teamMembers',
      type: 'json',
      defaultValue: [],
    },
    {
      name: 'contactLinks',
      type: 'json',
      defaultValue: [],
    },
  ],
}
