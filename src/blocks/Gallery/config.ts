import type { Block } from 'payload'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Gallery or media showcase headline.',
      descriptionHelper: 'Description or context for the image collection.',
    }),
    sectionStyle(),
    {
      name: 'columns',
      type: 'select',
      label: 'Gallery Columns',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        description: 'Number of images displayed per row on desktop screens.',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Gallery Images',
      required: true,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption / Subtitle',
        },
      ],
    },
  ],
}
