import type { Block } from 'payload'
import { link } from '@/fields/link'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGridBlock',
  labels: {
    singular: 'Services Grid',
    plural: 'Services Grids',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Heading for services or features overview.',
      descriptionHelper: 'Introductory statement about capabilities or offerings.',
    }),
    sectionStyle(),
    {
      name: 'columns',
      type: 'select',
      label: 'Grid Columns',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        description: 'Number of service cards displayed per row on desktop.',
      },
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Service / Feature Cards',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/ServicesGrid/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Icon / Graphic',
          admin: {
            description: 'Recommended SVG or square PNG icon.',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Card Description',
          required: true,
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Add Card Link',
          defaultValue: false,
        },
        link({
          overrides: {
            admin: {
              condition: (_, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
      ],
    },
  ],
}
