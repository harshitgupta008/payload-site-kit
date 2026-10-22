import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlockProps',
  labels: {
    plural: 'Contact Form Blocks',
    singular: 'Contact Form Block',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Main title shown above the contact form section.',
      descriptionHelper: 'Introductory statement or instructions.',
    }),
    sectionStyle(),
    {
      type: 'row',
      fields: [
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          required: true,
          admin: {
            width: '60%',
            description: 'Select the form definition to display.',
          },
        },
        {
          name: 'fieldLayout',
          type: 'select',
          label: 'Field Layout Arrangement',
          defaultValue: 'two-column',
          options: [
            { label: 'Two-Column Grid', value: 'two-column' },
            { label: 'Stacked (Single Column)', value: 'stacked' },
          ],
          admin: {
            width: '40%',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contact Information Panel (Optional)',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'contactInfo',
          type: 'group',
          label: false,
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'enableContactInfo',
                  type: 'checkbox',
                  label: 'Show Contact Details Beside Form',
                  defaultValue: false,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'contactInfoPosition',
                  type: 'select',
                  label: 'Contact Info Position',
                  defaultValue: 'left',
                  options: [
                    { label: 'Left of Form', value: 'left' },
                    { label: 'Right of Form', value: 'right' },
                  ],
                  admin: {
                    width: '50%',
                    condition: (_, siblingData) => Boolean(siblingData?.enableContactInfo),
                  },
                },
              ],
            },
            {
              name: 'address',
              type: 'text',
              label: 'Physical Address',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.enableContactInfo),
                placeholder: '123 Market Street, Suite 500, City, State',
              },
            },
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.enableContactInfo),
              },
              fields: [
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Phone Number',
                  admin: {
                    width: '50%',
                    placeholder: '+1 (555) 234-5678',
                  },
                },
                {
                  name: 'email',
                  type: 'text',
                  label: 'Email Address',
                  admin: {
                    width: '50%',
                    placeholder: 'contact@example.com',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Legacy Intro Content',
      defaultValue: false,
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Intro Content',
    },
  ],
}
