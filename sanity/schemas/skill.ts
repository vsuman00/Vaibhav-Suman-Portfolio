import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Programming Languages', value: 'programming' },
          { title: 'Frameworks & Libraries', value: 'frameworks' },
          { title: 'Tools & Technologies', value: 'tools' },
          { title: 'Machine Learning', value: 'ml' },
          { title: 'Databases', value: 'databases' },
          { title: 'Cloud & DevOps', value: 'cloud' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Proficiency Level (1-100)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name or custom icon identifier',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this skill should appear',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      level: 'level',
    },
    prepare(selection) {
      const { title, subtitle, level } = selection
      return {
        title,
        subtitle: `${subtitle} - Level: ${level}%`,
      }
    },
  },
})