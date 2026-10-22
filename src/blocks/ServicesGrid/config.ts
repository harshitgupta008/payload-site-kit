import type { Block } from 'payload'
import { cardFields } from '@/fields/card'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGridBlock',
  labels: {
    singular: 'Cards',
    plural: 'Cards',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Heading for services or features overview.',
      descriptionHelper: 'Introductory statement about capabilities or offerings.',
    }),
    sectionStyle(),
    {
      type: 'row',
      fields: [
        {
          name: 'layoutMode',
          type: 'select',
          label: 'Grid Layout Mode',
          defaultValue: 'equal',
          options: [
            { label: 'Equal Columns', value: 'equal' },
            { label: 'Custom Card Widths', value: 'custom' },
          ],
          admin: {
            width: '33.33%',
            description: 'Equal distributes evenly; Custom lets each card specify 1/3, 1/2, 2/3, full.',
          },
        },
        {
          name: 'columns',
          type: 'select',
          label: 'Grid Columns (Equal Mode)',
          defaultValue: '3',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
          admin: {
            width: '33.33%',
            description: 'Number of equal cards per row on desktop.',
            condition: (_, siblingData) => siblingData?.layoutMode !== 'custom',
          },
        },
        {
          name: 'numbered',
          type: 'checkbox',
          label: 'Auto-Number Cards (1., 2., ...)',
          defaultValue: false,
          admin: {
            width: '33.33%',
            description: 'Prepend sequential numbers to card titles using section accent color.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'cardStyle',
          type: 'select',
          label: 'Card Visual Style',
          defaultValue: 'shadow',
          options: [
            { label: 'Elevated Shadow', value: 'shadow' },
            { label: 'Bordered Outline', value: 'border' },
            { label: 'Flat Muted', value: 'flat' },
          ],
          admin: {
            width: '33.33%',
          },
        },
        {
          name: 'hover',
          type: 'select',
          label: 'Hover Animation',
          defaultValue: 'lift',
          options: [
            { label: 'Lift Upward', value: 'lift' },
            { label: 'None', value: 'none' },
          ],
          admin: {
            width: '33.33%',
          },
        },
        {
          name: 'textAlign',
          type: 'select',
          label: 'Card Text Alignment',
          defaultValue: 'left',
          options: [
            { label: 'Left Aligned', value: 'left' },
            { label: 'Centered', value: 'center' },
          ],
          admin: {
            width: '33.33%',
          },
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/ServicesGrid/RowLabel#RowLabel',
        },
      },
      fields: cardFields({ includeWidth: true }),
    },
  ],
}
