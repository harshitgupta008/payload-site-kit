import type { Field } from 'payload'
import { highlightColorOptions, textColorOptions } from '@/utilities/colorOptions'

export interface SectionHeaderType {
  title?: string | null
  description?: string | null
  alignment?: 'left' | 'center' | 'right' | null
  highlightWords?: string | null
  highlightColor?:
    | 'primary'
    | 'secondary'
    | 'gold'
    | 'blue'
    | 'emerald'
    | 'rose'
    | 'purple'
    | 'gradient'
    | 'custom'
    | null
  customHighlightColor?: string | null
  titleColor?:
    | 'default'
    | 'light'
    | 'dark'
    | 'primary'
    | 'secondary'
    | 'muted'
    | 'amber'
    | 'emerald'
    | 'rose'
    | 'purple'
    | 'blue'
    | 'custom'
    | null
  customTitleColor?: string | null
  descriptionColor?:
    | 'default'
    | 'light'
    | 'dark'
    | 'primary'
    | 'secondary'
    | 'muted'
    | 'amber'
    | 'emerald'
    | 'rose'
    | 'purple'
    | 'blue'
    | 'custom'
    | null
  customDescriptionColor?: string | null
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
        description: 'Heading, description, text colors, and word highlights for this section.',
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
        {
          type: 'row',
          fields: [
            {
              name: 'highlightWords',
              type: 'text',
              label: 'Highlight Words in Title',
              admin: {
                width: '33.33%',
                placeholder: 'e.g. Services, Growth, Fast',
                description: 'Comma or space-separated words to highlight in the title.',
              },
            },
            {
              name: 'highlightColor',
              type: 'select',
              label: 'Highlight Color',
              defaultValue: 'primary',
              options: highlightColorOptions,
              admin: {
                width: '33.33%',
                condition: (_, siblingData) => Boolean(siblingData?.highlightWords),
              },
            },
            {
              name: 'customHighlightColor',
              type: 'text',
              label: 'Custom Highlight Color (Hex)',
              admin: {
                width: '33.33%',
                condition: (_, siblingData) =>
                  Boolean(siblingData?.highlightWords && siblingData?.highlightColor === 'custom'),
                placeholder: 'e.g. #3b82f6',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'titleColor',
              type: 'select',
              label: 'Title Text Color',
              defaultValue: 'default',
              options: textColorOptions,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'customTitleColor',
              type: 'text',
              label: 'Custom Title Color (Hex)',
              admin: {
                width: '50%',
                condition: (_, siblingData) => siblingData?.titleColor === 'custom',
                placeholder: 'e.g. #ffffff',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'descriptionColor',
              type: 'select',
              label: 'Description Text Color',
              defaultValue: 'default',
              options: textColorOptions,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'customDescriptionColor',
              type: 'text',
              label: 'Custom Description Color (Hex)',
              admin: {
                width: '50%',
                condition: (_, siblingData) => siblingData?.descriptionColor === 'custom',
                placeholder: 'e.g. #94a3b8',
              },
            },
          ],
        },
      ],
    },
  ]
}
