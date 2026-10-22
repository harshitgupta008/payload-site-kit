import type { Field } from 'payload'
import { link } from '@/fields/link'
import { actionField } from '@/fields/action'

export const cardFields = (options?: { includeWidth?: boolean }): Field[] => {
  const { includeWidth = true } = options || {}

  const fields: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Image',
          admin: {
            width: '40%',
            description: 'Featured visual for this card.',
          },
        },
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Image Position',
          defaultValue: 'top',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Left (Beside Text)', value: 'left' },
            { label: 'None (Hidden)', value: 'none' },
          ],
          admin: {
            width: '30%',
          },
        },
        {
          name: 'imageRatio',
          type: 'select',
          label: 'Image Ratio',
          defaultValue: '16:9',
          options: [
            { label: '16:9 (Widescreen)', value: '16:9' },
            { label: '4:3 (Standard)', value: '4:3' },
            { label: '1:1 (Square)', value: '1:1' },
          ],
          admin: {
            width: '30%',
            condition: (_, siblingData) =>
              Boolean(siblingData?.image) && siblingData?.imagePosition !== 'none',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Icon (Legacy / SVG)',
          admin: {
            width: '40%',
            description: 'Rendered if no featured card image is uploaded.',
          },
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Card Badge / Category Tag',
          admin: {
            width: '30%',
            description: 'Optional small label, pill, or category above title.',
          },
        },
        ...(includeWidth
          ? [
              {
                name: 'width',
                type: 'select' as const,
                label: 'Custom Width',
                defaultValue: '1/3',
                options: [
                  { label: '1/3 Column (33%)', value: '1/3' },
                  { label: '1/2 Column (50%)', value: '1/2' },
                  { label: '2/3 Column (66%)', value: '2/3' },
                  { label: 'Full Width (100%)', value: 'full' },
                ],
                admin: {
                  width: '30%',
                  description: 'Used when layoutMode is set to Custom.',
                },
              },
            ]
          : []),
      ],
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
    },
    {
      type: 'row',
      fields: [
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Enable Action / Link Button',
          defaultValue: false,
          admin: {
            width: '40%',
          },
        },
        {
          name: 'linkLabel',
          type: 'text',
          label: 'Button Label',
          admin: {
            width: '60%',
            description: 'Label displayed on the card action button (e.g. "Read more", "Book Now").',
            condition: (_, siblingData) => Boolean(siblingData?.enableLink),
          },
        },
      ],
    },
    actionField({
      name: 'actionData',
      disableLabel: true,
      overrides: {
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
    link({
      overrides: {
        admin: {
          condition: (_, siblingData) =>
            Boolean(siblingData?.enableLink) &&
            (!siblingData?.actionData?.action || siblingData?.actionData?.action === 'link'),
          description: 'Legacy link field (fallback).',
        },
      },
    }),
  ]

  return fields
}
