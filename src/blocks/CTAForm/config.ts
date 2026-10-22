import type { Block } from 'payload'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

export const CTAForm: Block = {
  slug: 'ctaForm',
  interfaceName: 'CTAFormBlockProps',
  labels: {
    singular: 'CTA Form Section',
    plural: 'CTA Form Sections',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Headline motivating visitors to take action.',
      descriptionHelper: 'Value proposition or incentive to complete the form.',
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
            width: '50%',
            description: 'Select the form (newsletter, quote request, consultation, etc.).',
          },
        },
        {
          name: 'layout',
          type: 'select',
          label: 'Layout Arrangement',
          defaultValue: 'text-left-form-right',
          options: [
            { label: 'Text Left, Form Right', value: 'text-left-form-right' },
            { label: 'Form Left, Text Right', value: 'form-left-text-right' },
            { label: 'Centered (Text Centered, Form Below)', value: 'centered' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Supporting Visual (Optional)',
          admin: {
            width: '50%',
            description: 'Optional image displayed beside the text column.',
          },
        },
        {
          name: 'note',
          type: 'text',
          label: 'Short Privacy / Reassurance Note',
          admin: {
            width: '50%',
            placeholder: 'We respect your privacy. Unsubscribe anytime.',
          },
        },
      ],
    },
  ],
}
