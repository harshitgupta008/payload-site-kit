import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionStyle } from '@/fields/sectionStyle'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlockProps',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    ...sectionHeader({
      titleDescription: 'Main prominent headline for this section (rendered as h1 if primary hero).',
      descriptionHelper: 'Subtitle or value proposition pitch.',
    }),
    sectionStyle(),
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          label: 'Hero Layout Variant',
          defaultValue: 'centered',
          options: [
            { label: 'Centered (Heading & Buttons Centered, Image Below)', value: 'centered' },
            { label: 'Split (Text Left, Image Right)', value: 'split-right' },
            { label: 'Split (Image Left, Text Right)', value: 'split-left' },
          ],
          admin: {
            width: '50%',
            description: 'Choose layout arrangement for the hero section.',
          },
        },
        {
          name: 'textAlign',
          type: 'select',
          label: 'Text Alignment',
          defaultValue: 'center',
          options: [
            { label: 'Left Aligned', value: 'left' },
            { label: 'Centered', value: 'center' },
            { label: 'Right Aligned', value: 'right' },
          ],
          admin: {
            width: '50%',
            description: 'Alignment of hero heading, subtitle, and buttons.',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image / Visual',
      admin: {
        description: 'Displayed as banner or beside text with priority loading.',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          description: 'Primary and secondary call-to-action buttons.',
        },
      },
    }),
  ],
}
