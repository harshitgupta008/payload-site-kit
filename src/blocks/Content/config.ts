import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

const columnFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Section Title',
    admin: {
      description: 'Optional heading for this individual section column.',
    },
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third (33%)',
        value: 'oneThird',
      },
      {
        label: 'Half (50%)',
        value: 'half',
      },
      {
        label: 'Two Thirds (66%)',
        value: 'twoThirds',
      },
      {
        label: 'Full Width (100%)',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: 'Add Button / Link',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: 'Content / Columns',
    plural: 'Content / Columns Sections',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Main title above all content columns.',
      descriptionHelper: 'Supporting text displayed beneath the title.',
    }),
    sectionStyle(),
    {
      name: 'columns',
      type: 'array',
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Content/RowLabel#RowLabel',
        },
      },
      fields: columnFields,
    },
  ],
}

