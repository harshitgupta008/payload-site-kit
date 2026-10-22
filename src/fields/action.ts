import type { Field, GroupField } from 'payload'
import deepMerge from '@/utilities/deepMerge'
import { link } from './link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export type ActionVariant =
  | 'link'
  | 'popupForm'
  | 'popupContent'
  | 'tel'
  | 'whatsapp'
  | 'download'

export interface ActionFieldOptions {
  name?: string
  label?: string | false
  overrides?: Partial<GroupField>
  disableLabel?: boolean
  includeStyle?: boolean
}

export const actionField = (options: ActionFieldOptions = {}): Field => {
  const {
    name = 'actionData',
    label = false,
    overrides = {},
    disableLabel = false,
    includeStyle = false,
  } = options

  const generatedActionField: GroupField = {
    name,
    type: 'group',
    label,
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'action',
        type: 'select',
        label: 'Action Type',
        defaultValue: 'link',
        options: [
          { label: 'Standard Link (Page or URL)', value: 'link' },
          { label: 'Open Popup Form (Modal)', value: 'popupForm' },
          { label: 'Open Popup Content (Modal)', value: 'popupContent' },
          { label: 'Phone Call (tel:)', value: 'tel' },
          { label: 'WhatsApp Chat', value: 'whatsapp' },
          { label: 'Download File', value: 'download' },
        ],
        admin: {
          description: 'Choose the action triggered when this button is clicked.',
        },
      },
      ...(!disableLabel
        ? [
            {
              name: 'label' as const,
              type: 'text' as const,
              label: 'Button Label',
              admin: {
                placeholder: 'e.g. Contact Us, Learn More',
              },
            },
          ]
        : []),
      ...(includeStyle
        ? [
            {
              type: 'row' as const,
              fields: [
                {
                  name: 'style',
                  type: 'select' as const,
                  label: 'Button Style',
                  defaultValue: 'solid',
                  options: [
                    { label: 'Solid Accent', value: 'solid' },
                    { label: 'Outline Border', value: 'outline' },
                    { label: 'Ghost / Subtle', value: 'ghost' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'showArrow',
                  type: 'checkbox' as const,
                  label: 'Show Arrow Icon',
                  defaultValue: false,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ]
        : []),
      link({
        appearances: false,
        disableLabel: true,
        overrides: {
          admin: {
            condition: (_, siblingData) => !siblingData?.action || siblingData?.action === 'link',
          },
        },
      }),
      {
        name: 'form',
        type: 'relationship',
        relationTo: 'forms',
        label: 'Form to Open in Modal',
        admin: {
          condition: (_, siblingData) => siblingData?.action === 'popupForm',
          description: 'Select the form that appears in the popup modal when clicked.',
        },
      },
      {
        name: 'popupContent',
        type: 'richText',
        label: 'Modal Popup Content',
        admin: {
          condition: (_, siblingData) => siblingData?.action === 'popupContent',
          description: 'Rich content displayed inside the modal dialog.',
        },
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
        type: 'row',
        admin: {
          condition: (_, siblingData) =>
            siblingData?.action === 'tel' || siblingData?.action === 'whatsapp',
        },
        fields: [
          {
            name: 'phone',
            type: 'text',
            label: 'Phone Number (with country code)',
            admin: {
              width: '50%',
              placeholder: '+1 234 567 8900',
            },
          },
          {
            name: 'whatsappMessage',
            type: 'text',
            label: 'Pre-filled WhatsApp Message (Optional)',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.action === 'whatsapp',
              placeholder: 'Hi! I would like more information...',
            },
          },
        ],
      },
      {
        name: 'file',
        type: 'upload',
        relationTo: 'media',
        label: 'File to Download',
        admin: {
          condition: (_, siblingData) => siblingData?.action === 'download',
          description: 'Upload or choose the file to download.',
        },
      },
    ],
  }

  return deepMerge(generatedActionField, overrides)
}
