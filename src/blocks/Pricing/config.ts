import type { Block } from 'payload'
import { link } from '@/fields/link'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  labels: {
    singular: 'Pricing Table',
    plural: 'Pricing Tables',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Pricing plans and subscription tiers headline.',
      descriptionHelper: 'Billing details or guarantee note.',
    }),
    sectionStyle(),
    {
      name: 'plans',
      type: 'array',
      label: 'Pricing Plans',
      required: true,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Pricing/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'highlighted',
          type: 'checkbox',
          label: 'Highlight as Featured / Most Popular',
          defaultValue: false,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Plan Name (e.g. Starter, Pro, Enterprise)',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'badge',
              type: 'text',
              label: 'Badge Text (e.g. "Most Popular")',
              admin: {
                width: '50%',
                condition: (_, siblingData) => Boolean(siblingData?.highlighted),
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'price',
              type: 'text',
              label: 'Price (e.g. $49, Free, Custom)',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'period',
              type: 'text',
              label: 'Billing Period (e.g. /month, /year, one-time)',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Short Plan Description',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Plan Features List',
          required: true,
          fields: [
            {
              name: 'feature',
              type: 'text',
              label: 'Feature Item',
              required: true,
            },
          ],
        },
        link({
          overrides: {
            admin: {
              description: 'Call to action button for this plan.',
            },
          },
        }),
      ],
    },
  ],
}
