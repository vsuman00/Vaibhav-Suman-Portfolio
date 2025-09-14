import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactMessage',
  title: 'Contact Message',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: 'company',
      title: 'Company/Organization',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'messageType',
      title: 'Message Type',
      type: 'string',
      options: {
        list: [
          { title: 'General Inquiry', value: 'general' },
          { title: 'Job Opportunity', value: 'job' },
          { title: 'Collaboration', value: 'collaboration' },
          { title: 'Consultation', value: 'consultation' },
          { title: 'Speaking Engagement', value: 'speaking' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'consent',
      title: 'Privacy Consent',
      type: 'boolean',
      description: 'User has consented to data processing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
          { title: 'Urgent', value: 'urgent' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes for follow-up',
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'For spam prevention',
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      description: 'Browser information',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      subject: 'subject',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare(selection: { name?: string; email?: string; subject?: string; status?: string; submittedAt?: string }) {
      const { name, email, subject, status, submittedAt } = selection
      const statusEmojiMap: Record<string, string> = {
        new: '🆕',
        read: '👁️',
        replied: '✅',
        archived: '📁',
      }
      const statusEmoji = statusEmojiMap[status || 'new'] || '📧'
      
      return {
        title: `${statusEmoji} ${name} - ${subject}`,
        subtitle: `${email} • ${submittedAt ? new Date(submittedAt).toLocaleDateString() : 'No date'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Submitted Date, New',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})