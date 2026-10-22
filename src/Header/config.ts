import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { authenticated } from '@/access/authenticated'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Brand & Logo',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Header Logo',
              admin: {
                width: '40%',
                description: 'Falls back to Site Settings logo or site name.',
              },
            },
            {
              name: 'logoOnTransparent',
              type: 'upload',
              relationTo: 'media',
              label: 'Transparent Header Logo',
              admin: {
                width: '40%',
                description: 'Used when header is transparent over hero visuals.',
              },
            },
            {
              name: 'logoSize',
              type: 'select',
              label: 'Logo Size',
              defaultValue: 'medium',
              options: [
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ],
              admin: {
                width: '20%',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Navigation Bar Items',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'navItems',
          type: 'array',
          label: 'Navigation Links & Dropdowns',
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Header/RowLabel#RowLabel',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Item Label',
                  required: true,
                  admin: {
                    width: '40%',
                  },
                },
                {
                  name: 'type',
                  type: 'select',
                  label: 'Item Type',
                  defaultValue: 'link',
                  options: [
                    { label: 'Standard Link', value: 'link' },
                    { label: 'Dropdown Menu', value: 'dropdown' },
                  ],
                  admin: {
                    width: '30%',
                  },
                },
                {
                  name: 'highlight',
                  type: 'checkbox',
                  label: 'Highlight as Featured',
                  defaultValue: false,
                  admin: {
                    width: '30%',
                    description: 'Styled like a button (e.g. for Contact).',
                  },
                },
              ],
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                admin: {
                  condition: (_, siblingData) => siblingData?.type === 'link',
                },
              },
            }),
            {
              name: 'children',
              type: 'array',
              label: 'Dropdown Items',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'dropdown',
                initCollapsed: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Sub-item Label',
                      required: true,
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'description',
                      type: 'text',
                      label: 'Short Description',
                      admin: {
                        width: '50%',
                        description: 'Optional helper text beneath label.',
                      },
                    },
                  ],
                },
                link({
                  appearances: false,
                  disableLabel: true,
                }),
              ],
            },
          ],
        },
        {
          name: 'navStyle',
          type: 'group',
          label: 'Navigation Styling',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'activeStyle',
                  type: 'select',
                  label: 'Active Link Highlight',
                  defaultValue: 'underline',
                  options: [
                    { label: 'Accent Underline', value: 'underline' },
                    { label: 'Accent Color Text', value: 'color' },
                    { label: 'Pill Background', value: 'pill' },
                  ],
                  admin: {
                    width: '33.33%',
                  },
                },
                {
                  name: 'uppercase',
                  type: 'checkbox',
                  label: 'Uppercase Labels',
                  defaultValue: false,
                  admin: {
                    width: '33.33%',
                  },
                },
                {
                  name: 'navAlign',
                  type: 'select',
                  label: 'Desktop Nav Alignment',
                  defaultValue: 'right',
                  options: [
                    { label: 'Right Aligned', value: 'right' },
                    { label: 'Centered', value: 'center' },
                  ],
                  admin: {
                    width: '33.33%',
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
      label: 'Call-To-Action (CTA) Button',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'cta',
          type: 'group',
          label: false,
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'enableCTA',
                  type: 'checkbox',
                  label: 'Enable Header CTA Button',
                  defaultValue: false,
                  admin: {
                    width: '30%',
                  },
                },
                {
                  name: 'action',
                  type: 'select',
                  label: 'CTA Action',
                  defaultValue: 'link',
                  options: [
                    { label: 'Link to Page / URL', value: 'link' },
                    { label: 'Open Popup Form (Forms Phase)', value: 'popupForm' },
                  ],
                  admin: {
                    width: '35%',
                    condition: (_, siblingData) => Boolean(siblingData?.enableCTA),
                  },
                },
                {
                  name: 'style',
                  type: 'select',
                  label: 'Button Style',
                  defaultValue: 'solid',
                  options: [
                    { label: 'Solid Accent', value: 'solid' },
                    { label: 'Outline Border', value: 'outline' },
                  ],
                  admin: {
                    width: '35%',
                    condition: (_, siblingData) => Boolean(siblingData?.enableCTA),
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Button Label',
                  admin: {
                    width: '50%',
                    condition: (_, siblingData) => Boolean(siblingData?.enableCTA),
                  },
                },
                {
                  name: 'showArrow',
                  type: 'checkbox',
                  label: 'Include Arrow Icon',
                  defaultValue: false,
                  admin: {
                    width: '50%',
                    condition: (_, siblingData) => Boolean(siblingData?.enableCTA),
                  },
                },
              ],
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                admin: {
                  condition: (_, siblingData) =>
                    Boolean(siblingData?.enableCTA) && siblingData?.action !== 'popupForm',
                },
              },
            }),
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Header Layout & Behavior',
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
                  label: 'Header Layout Variant',
                  defaultValue: 'default',
                  options: [
                    { label: 'Default (Logo Left, Nav & CTA Right)', value: 'default' },
                    { label: 'Centered (Logo Center, Nav Below)', value: 'centered' },
                    { label: 'Split (Nav Left, Logo Center, CTA Right)', value: 'split' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'background',
                  type: 'select',
                  label: 'Header Background',
                  defaultValue: 'solid',
                  options: [
                    { label: 'Solid (Theme Surface)', value: 'solid' },
                    { label: 'Transparent', value: 'transparent' },
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
                  name: 'sticky',
                  type: 'checkbox',
                  label: 'Sticky Header (Sticks to top on scroll)',
                  defaultValue: true,
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'transparentOnTop',
                  type: 'checkbox',
                  label: 'Transparent Over Hero (Turns solid on scroll)',
                  defaultValue: false,
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'showSearch',
                  type: 'checkbox',
                  label: 'Show Search Icon',
                  defaultValue: false,
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'showThemeToggle',
                  type: 'checkbox',
                  label: 'Show Theme Switcher',
                  defaultValue: false,
                  admin: {
                    width: '25%',
                  },
                },
              ],
            },
            {
              name: 'containerWidth',
              type: 'select',
              label: 'Header Container Width',
              defaultValue: 'contained',
              options: [
                { label: 'Contained (Standard)', value: 'contained' },
                { label: 'Full Width (Edge-to-edge padding)', value: 'full' },
              ],
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Announcement Bar',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'announcementBar',
          type: 'group',
          label: false,
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'enable',
                  type: 'checkbox',
                  label: 'Enable Announcement Bar',
                  defaultValue: false,
                  admin: {
                    width: '30%',
                  },
                },
                {
                  name: 'background',
                  type: 'select',
                  label: 'Bar Background Color',
                  defaultValue: 'primary',
                  options: [
                    { label: 'Primary Brand Color', value: 'primary' },
                    { label: 'Dark Surface', value: 'dark' },
                    { label: 'Light Surface', value: 'light' },
                  ],
                  admin: {
                    width: '35%',
                    condition: (_, siblingData) => Boolean(siblingData?.enable),
                  },
                },
                {
                  name: 'dismissible',
                  type: 'checkbox',
                  label: 'Dismissible (Stores choice in session)',
                  defaultValue: false,
                  admin: {
                    width: '35%',
                    condition: (_, siblingData) => Boolean(siblingData?.enable),
                  },
                },
              ],
            },
            {
              name: 'text',
              type: 'text',
              label: 'Announcement Message',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.enable),
              },
            },
            link({
              overrides: {
                admin: {
                  condition: (_, siblingData) => Boolean(siblingData?.enable),
                },
              },
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
