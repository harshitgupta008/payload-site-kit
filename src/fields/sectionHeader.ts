import type { Field } from 'payload'

export interface SectionHeaderType {
  title?: string | null
  description?: string | null
  alignment?: 'left' | 'center' | 'right' | null
}

export const sectionHeader = (options?: {
  titleDescription?: string
  descriptionHelper?: string
  defaultAlignment?: 'left' | 'center' | 'right'
}): Field[] => {
  const {
    titleDescription = 'Main heading shown above the block content.',
    descriptionHelper = 'Optional supporting text or subtitle for the section.',
    defaultAlignment = 'center',
  } = options || {}

  return [
    {
      name: 'sectionHeader',
      type: 'group',
      label: 'Section Header',
      admin: {
        description: 'Optional heading and description for this section.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
              admin: {
                width: '70%',
                description: titleDescription,
              },
            },
            {
              name: 'alignment',
              type: 'select',
              label: 'Alignment',
              defaultValue: defaultAlignment,
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
              admin: {
                width: '30%',
                description: 'Horizontal alignment of the title and description.',
              },
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Section Description',
          admin: {
            description: descriptionHelper,
          },
        },
      ],
    },
  ]
}
