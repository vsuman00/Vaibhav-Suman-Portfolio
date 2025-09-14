import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Certification Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the certification',
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
      description: 'Leave empty if certification does not expire',
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
      description: 'Unique identifier for the certification',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
      description: 'Link to verify the certification',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'certificateFile',
      title: 'Certificate File',
      type: 'file',
      options: {
        accept: '.pdf,.jpg,.jpeg,.png',
      },
    }),
    defineField({
      name: 'skills',
      title: 'Skills Covered',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Skills and technologies covered in this certification',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Programming', value: 'programming' },
          { title: 'Cloud Computing', value: 'cloud' },
          { title: 'Data Science', value: 'data-science' },
          { title: 'Machine Learning', value: 'machine-learning' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Cybersecurity', value: 'security' },
          { title: 'Project Management', value: 'project-management' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' },
        ],
      },
    }),
    defineField({
      name: 'logo',
      title: 'Issuer Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Certification',
      type: 'boolean',
      description: 'Mark as featured to highlight',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this certification should appear',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      issuer: 'issuer',
      issueDate: 'issueDate',
      featured: 'featured',
      media: 'logo',
    },
    prepare(selection) {
      const { name, issuer, issueDate, featured, media } = selection
      return {
        title: featured ? `⭐ ${name}` : name,
        subtitle: `${issuer} • ${new Date(issueDate).getFullYear()}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Issue Date, Recent',
      name: 'issueDateDesc',
      by: [{ field: 'issueDate', direction: 'desc' }],
    },
  ],
})