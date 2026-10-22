import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { authenticated } from '@/access/authenticated'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Brand Identity',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'brand',
          type: 'group',
          label: false,
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Footer Logo',
              admin: {
                description: 'Falls back to Site Settings logo or site name.',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Brand Description / Bio',
              admin: {
                description: 'Short statement displayed beside or beneath the brand logo.',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Navigation Link Columns',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'columns',
          type: 'array',
          label: 'Footer Navigation Columns',
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Column Title',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              label: 'Column Links',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Link Label',
                },
                link({
                  appearances: false,
                  disableLabel: true,
                }),
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contact Information',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'contact',
          type: 'group',
          label: false,
          fields: [
            {
              name: 'address',
              type: 'text',
              label: 'Physical Address / Location',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Phone Number (Rendered as tel: link)',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'email',
                  type: 'text',
                  label: 'Email Address (Rendered as mailto: link)',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Social Media',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'social',
          type: 'group',
          label: false,
          fields: [
            {
              name: 'showSocialLinks',
              type: 'checkbox',
              label: 'Show Social Media Icons',
              defaultValue: true,
              admin: {
                description: 'Renders platform icons configured in Site Settings.',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Bottom Bar & Legal Links',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'bottomBar',
          type: 'group',
          label: false,
          fields: [
            {
              name: 'copyright',
              type: 'text',
              label: 'Copyright Notice',
              defaultValue: '© {year} All rights reserved.',
              admin: {
                description: '{year} is automatically replaced with the current year.',
              },
            },
            {
              name: 'links',
              type: 'array',
              label: 'Legal & Policy Links (Terms, Privacy)',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Link Label',
                },
                link({
                  appearances: false,
                  disableLabel: true,
                }),
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Footer Layout Options',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'layout',
          type: 'group',
          label: false,
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'variant',
                  type: 'select',
                  label: 'Layout Variant',
                  defaultValue: 'columns',
                  options: [
                    { label: 'Columns (Multi-Column Grid)', value: 'columns' },
                    { label: 'Centered (Stacked & Centered)', value: 'centered' },
                    { label: 'Minimal (Single Row Bar)', value: 'minimal' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'background',
                  type: 'select',
                  label: 'Footer Background',
                  defaultValue: 'muted',
                  options: [
                    { label: 'Muted Surface', value: 'muted' },
                    { label: 'Dark High Contrast', value: 'dark' },
                    { label: 'Primary Brand Color', value: 'primary' },
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
                  name: 'containerWidth',
                  type: 'select',
                  label: 'Container Width',
                  defaultValue: 'contained',
                  options: [
                    { label: 'Contained (Standard)', value: 'contained' },
                    { label: 'Full Width', value: 'full' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'showThemeToggle',
                  type: 'checkbox',
                  label: 'Show Theme Toggle in Footer',
                  defaultValue: false,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
