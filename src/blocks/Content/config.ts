import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { actionField } from '@/fields/action'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'
import {
  highlightColorOptions,
  textColorOptions,
} from '@/utilities/colorOptions'

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
    type: 'row',
    admin: {
      condition: (_: any, siblingData: any) => Boolean(siblingData?.title),
    },
    fields: [
      {
        name: 'highlightWords',
        type: 'text',
        label: 'Highlight Words in Title',
        admin: {
          width: '33.33%',
          placeholder: 'e.g. AI-driven, Tailored',
          description: 'Words in the column title to highlight.',
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
    admin: {
      condition: (_: any, siblingData: any) => Boolean(siblingData?.title),
    },
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
    name: 'size',
    type: 'select',
    defaultValue: 'full',
    options: [
      {
        label: 'Full Width (100%)',
        value: 'full',
      },
      {
        label: 'Half (50%)',
        value: 'half',
      },
      {
        label: 'One Third (33%)',
        value: 'oneThird',
      },
      {
        label: 'Two Thirds (66%)',
        value: 'twoThirds',
      },
    ],
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Section Image',
    admin: {
      description: 'Upload an image to divide this section left/right or display with text.',
    },
  },
  {
    type: 'row',
    admin: {
      condition: (_: any, siblingData: any) => Boolean(siblingData?.image),
    },
    fields: [
      {
        name: 'imagePosition',
        type: 'select',
        label: 'Image Position',
        defaultValue: 'right',
        options: [
          { label: 'Divide Left / Right: Image on Right (Text Left, Image Right)', value: 'right' },
          { label: 'Divide Left / Right: Image on Left (Image Left, Text Right)', value: 'left' },
          { label: 'Stacked: Image on Top (Above Text)', value: 'top' },
          { label: 'Stacked: Image on Bottom (Below Text)', value: 'bottom' },
        ],
        admin: {
          width: '33.33%',
        },
      },
      {
        name: 'imageAspect',
        type: 'select',
        label: 'Image Aspect Ratio',
        defaultValue: '16:9',
        options: [
          { label: 'Widescreen (16:9)', value: '16:9' },
          { label: 'Classic (4:3)', value: '4:3' },
          { label: 'Square (1:1)', value: '1:1' },
          { label: 'Natural / Auto', value: 'auto' },
        ],
        admin: {
          width: '33.33%',
        },
      },
      {
        name: 'imageFit',
        type: 'select',
        label: 'Image Sizing',
        defaultValue: 'cover',
        options: [
          { label: 'Cover (Fill frame, clean crop)', value: 'cover' },
          { label: 'Contain (Show entire image)', value: 'contain' },
        ],
        admin: {
          width: '33.33%',
        },
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
    label: 'Add Button / Link / Modal',
  },
  actionField({
    name: 'actionData',
    disableLabel: false,
    includeStyle: true,
    overrides: {
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
  }),
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) =>
          Boolean(siblingData?.enableLink && !siblingData?.actionData?.action),
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
