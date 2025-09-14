import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'journal',
      title: 'Journal/Conference',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      validation: (Rule) => Rule.max(1000),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'link',
      title: 'Publication Link',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Digital Object Identifier',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'date',
      title: 'Publication Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Publication Type',
      type: 'string',
      options: {
        list: [
          { title: 'Journal Article', value: 'journal' },
          { title: 'Conference Paper', value: 'conference' },
          { title: 'Workshop Paper', value: 'workshop' },
          { title: 'Preprint', value: 'preprint' },
          { title: 'Book Chapter', value: 'chapter' },
          { title: 'Thesis', value: 'thesis' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Accepted', value: 'accepted' },
          { title: 'Under Review', value: 'under-review' },
          { title: 'In Preparation', value: 'in-preparation' },
        ],
      },
      initialValue: 'published',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Publication',
      type: 'boolean',
      description: 'Mark as featured to highlight',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      journal: 'journal',
      date: 'date',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, journal, date, featured } = selection
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${journal} - ${new Date(date).getFullYear()}`,
      }
    },
  },
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Publication Date, Old',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
})