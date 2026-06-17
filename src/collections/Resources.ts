import type { CollectionConfig } from 'payload'

import { allowEditorOrAdmin, allowPublicRead, isAdminOrEditor } from '@/payload/access'
import { buildPreviewUrl } from '@/payload/preview'

export const Resources: CollectionConfig = {
  slug: 'resources',
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
    preview: (doc) => buildPreviewUrl('/resources', doc as { slug?: string | null }),
    useAsTitle: 'title',
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
      name: 'type',
      required: true,
      type: 'select',
      options: [
        { label: 'Study guide', value: 'study-guide' },
        { label: 'Book', value: 'book' },
        { label: 'Article', value: 'article' },
        { label: 'Series', value: 'series' },
        { label: 'File', value: 'file' },
        { label: 'Link', value: 'link' },
      ],
    },
    {
      name: 'description',
      required: true,
      type: 'textarea',
    },
    {
      name: 'usefulness',
      required: true,
      type: 'textarea',
    },
    {
      name: 'externalUrl',
      type: 'text',
    },
    {
      name: 'file',
      relationTo: 'media',
      type: 'upload',
    },
    {
      name: 'relatedArticleSlugs',
      type: 'json',
      defaultValue: [],
    },
    {
      name: 'relatedSeriesSlugs',
      type: 'json',
      defaultValue: [],
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
