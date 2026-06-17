import type { CollectionConfig } from 'payload'

import { allowEditorOrAdmin, allowPublicRead, isAdminOrEditor } from '@/payload/access'
import { buildPreviewUrl } from '@/payload/preview'

export const Series: CollectionConfig = {
  slug: 'series',
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
    preview: (doc) => buildPreviewUrl('/series', doc as { slug?: string | null }),
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
      name: 'topic',
      required: true,
      type: 'select',
      options: [
        { label: 'Pastoral Theology', value: 'pastoral-theology' },
        { label: 'Christian Life', value: 'christian-life' },
        { label: 'Marriage', value: 'marriage' },
        { label: 'Ethics', value: 'ethics' },
      ],
    },
    {
      name: 'audience',
      required: true,
      type: 'select',
      options: [
        { label: 'New believer', value: 'new-believer' },
        { label: 'Growing believer', value: 'growing-believer' },
        { label: 'Mature believer', value: 'mature-believer' },
        { label: 'Leader', value: 'leader' },
      ],
    },
    {
      name: 'description',
      required: true,
      type: 'textarea',
    },
    {
      name: 'longDescription',
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
    {
      name: 'cover',
      relationTo: 'media',
      type: 'upload',
    },
    {
      name: 'articleSlugs',
      type: 'json',
      defaultValue: [],
    },
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
    },
  ],
}
