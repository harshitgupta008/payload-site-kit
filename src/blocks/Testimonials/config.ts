import type { Block } from 'payload'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials Sections',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Social proof or client testimonials headline.',
      descriptionHelper: 'Subtitle highlighting customer satisfaction.',
    }),
    sectionStyle(),
    {
      name: 'layout',
      type: 'select',
      label: 'Display Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Cards Grid (Multiple reviews per row)', value: 'grid' },
        { label: 'Featured Single (Large quote callout)', value: 'single' },
      ],
      admin: {
        description: 'Choose between a multi-card grid or a single prominent featured testimonial.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Testimonials List',
      required: true,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Testimonials/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Client Quote',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Client Name',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'role',
              type: 'text',
              label: 'Role / Company',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Avatar / Photo',
        },
      ],
    },
  ],
}
