import type { CollectionConfig } from 'payload'

import { allowEditorOrAdmin, allowPublicRead, isAdminOrEditor } from '@/payload/access'
import { buildPreviewUrl } from '@/payload/preview'

export const Articles: CollectionConfig = {
  slug: 'articles',
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
    preview: (doc) => buildPreviewUrl('/articles', doc as { slug?: string | null }),
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
    { name: 'title', required: true, type: 'text' },
    { name: 'slug', required: true, type: 'text', unique: true },
    { name: 'subtitle', type: 'textarea' },
    { name: 'excerpt', required: true, type: 'textarea' },
    {
      name: 'format',
      defaultValue: 'teaching',
      required: true,
      type: 'select',
      options: [
        { label: 'Teaching', value: 'teaching' },
        { label: 'Devotion', value: 'devotion' },
        { label: 'Testimony', value: 'testimony' },
        { label: 'Reflection', value: 'reflection' },
      ],
    },
    { name: 'author', relationTo: 'authors', type: 'relationship' },
    { name: 'topics', hasMany: true, relationTo: 'topics', type: 'relationship' },
    { name: 'audiences', hasMany: true, relationTo: 'audiences', type: 'relationship' },
    { name: 'tags', defaultValue: [], type: 'json' },
    { name: 'mainScripture', required: true, type: 'text' },
    { name: 'scriptureText', required: true, type: 'textarea' },
    { name: 'pullQuote', type: 'textarea' },
    { name: 'body', required: true, type: 'richText' },
    { name: 'studyQuestions', defaultValue: [], type: 'json' },
    {
      name: 'seriesMemberships',
      type: 'array',
      fields: [
        { name: 'series', relationTo: 'series', required: true, type: 'relationship' },
        { name: 'order', required: true, type: 'number' },
      ],
    },
    { name: 'relatedResources', hasMany: true, relationTo: 'resources', type: 'relationship' },
    { name: 'relatedBooks', defaultValue: [], type: 'json' },
    { name: 'sourceNote', type: 'textarea' },
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
    { name: 'publishedAt', type: 'date' },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
  ],
}
