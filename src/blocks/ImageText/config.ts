import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

export const ImageText: Block = {
  slug: 'imageText',
  interfaceName: 'ImageTextBlock',
  labels: {
    singular: 'Image + Text',
    plural: 'Image + Text Sections',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Optional header above the image and text section.',
      descriptionHelper: 'Subtitle or introduction text.',
    }),
    sectionStyle(),
    {
      type: 'row',
      fields: [
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Desktop Image Position',
          defaultValue: 'left',
          options: [
            { label: 'Image on Left, Text on Right', value: 'left' },
            { label: 'Image on Right, Text on Left', value: 'right' },
          ],
          admin: {
            width: '33.33%',
            description: 'Side where the image appears on desktop screens.',
          },
        },
        {
          name: 'mobileOrder',
          type: 'select',
          label: 'Mobile Stacking Order',
          defaultValue: 'image-first',
          options: [
            { label: 'Image First (Image above text)', value: 'image-first' },
            { label: 'Text First (Text above image)', value: 'text-first' },
          ],
          admin: {
            width: '33.33%',
            description: 'Which element stacks on top on mobile devices.',
          },
        },
        {
          name: 'verticalAlign',
          type: 'select',
          label: 'Vertical Alignment',
          defaultValue: 'center',
          options: [
            { label: 'Centered', value: 'center' },
            { label: 'Top Aligned', value: 'top' },
          ],
          admin: {
            width: '33.33%',
            description: 'Align content vertically relative to the image.',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
      admin: {
        description: 'Image displayed alongside the text content.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Main Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'bulletPoints',
      type: 'array',
      label: 'Key Points / Features List',
      admin: {
        description: 'Optional bullet points with checkmarks displayed beneath the content.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'point',
          type: 'text',
          label: 'Point',
          required: true,
        },
      ],
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Add Action Button',
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
}
