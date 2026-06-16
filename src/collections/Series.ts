import type { CollectionConfig } from 'payload'

export const Series: CollectionConfig = {
  slug: 'series',
  access: {
    read: () => true,
  },
  admin: {
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

