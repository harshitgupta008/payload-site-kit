import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ Accordion',
    plural: 'FAQ Accordions',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Frequently Asked Questions heading.',
      descriptionHelper: 'Brief explanation or invitation to contact support.',
    }),
    sectionStyle(),
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          label: 'Accordion Layout',
          defaultValue: 'one-column',
          options: [
            { label: 'Single Column (Centered)', value: 'one-column' },
            { label: 'Two Independent Columns', value: 'two-columns' },
            { label: 'Side Image Left + FAQ Right', value: 'image-left' },
            { label: 'FAQ Left + Side Image Right', value: 'image-right' },
          ],
          admin: {
            width: '50%',
            description: 'Arrangement of questions and optional side visual.',
          },
        },
        {
          name: 'style',
          type: 'select',
          label: 'Visual Style',
          defaultValue: 'line',
          options: [
            { label: 'Line Dividers (Clean Borders)', value: 'line' },
            { label: 'Card Boxes (Elevated / Bordered)', value: 'card' },
            { label: 'Plain (Minimalist Spacing)', value: 'plain' },
          ],
          admin: {
            width: '50%',
            description: 'Item boundary appearance.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sideImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Side Visual / Image',
          admin: {
            width: '50%',
            description: 'Displayed alongside FAQ in side image layouts.',
            condition: (_, siblingData) =>
              siblingData?.layout === 'image-left' || siblingData?.layout === 'image-right',
          },
        },
        {
          name: 'allowMultipleOpen',
          type: 'checkbox',
          label: 'Allow Multiple Items Open Simultaneously',
          defaultValue: false,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'firstOpen',
          type: 'checkbox',
          label: 'Open First Question by Default',
          defaultValue: true,
          admin: {
            width: '25%',
          },
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Questions & Answers',
      required: true,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/FAQ/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Answer',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
}
