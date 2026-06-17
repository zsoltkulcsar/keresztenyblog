import type { CollectionConfig } from 'payload'

import { allowFirstAdminOrAdminOnly, allowAdminOnly, isAdmin } from '@/payload/access'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: allowAdminOnly(),
    create: allowFirstAdminOrAdminOnly(),
    delete: allowAdminOnly(),
    read: allowAdminOnly(),
    readVersions: allowAdminOnly(),
    unlock: allowAdminOnly(),
    update: allowAdminOnly(),
  },
  admin: {
    group: 'Access',
    hidden: ({ user }) => !isAdmin(user as { role?: string | null } | null),
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      required: true,
      type: 'select',
      defaultValue: 'admin',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}
