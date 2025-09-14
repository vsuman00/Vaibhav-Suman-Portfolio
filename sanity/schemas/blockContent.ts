import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
          {
            title: 'Internal Link',
            name: 'internalLink',
            type: 'object',
            fields: [
              {
                title: 'Reference',
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'blogPost' },
                  { type: 'project' },
                ],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'codeBlock',
      title: 'Code Block',
      fields: [
        {
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'Python', value: 'python' },
              { title: 'Java', value: 'java' },
              { title: 'C++', value: 'cpp' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'SQL', value: 'sql' },
              { title: 'Bash', value: 'bash' },
              { title: 'JSON', value: 'json' },
              { title: 'YAML', value: 'yaml' },
              { title: 'Markdown', value: 'markdown' },
            ],
          },
        },
        {
          name: 'code',
          title: 'Code',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'filename',
          title: 'Filename',
          type: 'string',
          description: 'Optional filename to display',
        },
      ],
      preview: {
        select: {
          language: 'language',
          code: 'code',
        },
        prepare(selection) {
          const { language, code } = selection
          return {
            title: `Code Block (${language || 'plain text'})`,
            subtitle: code ? code.substring(0, 50) + '...' : 'No code',
          }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout',
      fields: [
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Error', value: 'error' },
              { title: 'Success', value: 'success' },
              { title: 'Note', value: 'note' },
            ],
          },
          initialValue: 'info',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: {
          type: 'type',
          title: 'title',
          content: 'content',
        },
        prepare(selection: { type?: string; title?: string; content?: string }) {
          const { type, title, content } = selection
          const emojiMap: Record<string, string> = {
            info: 'ℹ️',
            warning: '⚠️',
            error: '❌',
            success: '✅',
            note: '📝',
          }
          const emoji = emojiMap[type || 'info'] || 'ℹ️'
          
          return {
            title: `${emoji} ${title || 'Callout'}`,
            subtitle: content ? content.substring(0, 50) + '...' : 'No content',
          }
        },
      },
    }),
  ],
})