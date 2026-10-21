import type { GlobalConfig } from 'payload'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

const validateHex = (value: string | null | undefined) => {
  if (!value) return true
  const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
  if (!hexRegex.test(value.trim())) {
    return 'Please enter a valid hex color code (e.g. #000 or #000000)'
  }
  return true
}

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Payload Website',
      label: 'Site Name',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Site Logo',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Favicon',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'X / Twitter', value: 'twitter' },
                { label: 'GitHub', value: 'github' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Other', value: 'other' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Profile URL',
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Theme & Design Tokens',
          fields: [
            {
              name: 'themePreset',
              type: 'select',
              required: true,
              defaultValue: 'modern',
              label: 'Design Preset',
              options: [
                { label: 'Modern (Clean & Minimal)', value: 'modern' },
                { label: 'Classic (Editorial & Sophisticated)', value: 'classic' },
                { label: 'Bold (High Contrast & Vibrant)', value: 'bold' },
              ],
              admin: {
                description: 'Select a base theme. Individual color, font, and radius settings below will override preset values.',
              },
            },
            {
              name: 'colors',
              type: 'group',
              label: 'Color Overrides (Hex)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'primary',
                      type: 'text',
                      label: 'Primary Color',
                      defaultValue: '#0f172a',
                      validate: validateHex,
                      admin: {
                        width: '50%',
                        placeholder: '#0f172a',
                      },
                    },
                    {
                      name: 'secondary',
                      type: 'text',
                      label: 'Secondary Color',
                      defaultValue: '#f1f5f9',
                      validate: validateHex,
                      admin: {
                        width: '50%',
                        placeholder: '#f1f5f9',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'background',
                      type: 'text',
                      label: 'Background Color',
                      defaultValue: '#ffffff',
                      validate: validateHex,
                      admin: {
                        width: '50%',
                        placeholder: '#ffffff',
                      },
                    },
                    {
                      name: 'text',
                      type: 'text',
                      label: 'Text Color',
                      defaultValue: '#0f172a',
                      validate: validateHex,
                      admin: {
                        width: '50%',
                        placeholder: '#0f172a',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'headingFont',
                  type: 'select',
                  label: 'Heading Font',
                  defaultValue: 'Inter',
                  options: [
                    { label: 'Inter', value: 'Inter' },
                    { label: 'Poppins', value: 'Poppins' },
                    { label: 'Playfair Display', value: 'Playfair Display' },
                    { label: 'Montserrat', value: 'Montserrat' },
                    { label: 'Roboto', value: 'Roboto' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'bodyFont',
                  type: 'select',
                  label: 'Body Font',
                  defaultValue: 'Inter',
                  options: [
                    { label: 'Inter', value: 'Inter' },
                    { label: 'Poppins', value: 'Poppins' },
                    { label: 'Playfair Display', value: 'Playfair Display' },
                    { label: 'Montserrat', value: 'Montserrat' },
                    { label: 'Roboto', value: 'Roboto' },
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
                  name: 'radius',
                  type: 'select',
                  label: 'Border Radius',
                  defaultValue: 'medium',
                  options: [
                    { label: 'None (0px)', value: 'none' },
                    { label: 'Small (4px)', value: 'small' },
                    { label: 'Medium (8px)', value: 'medium' },
                    { label: 'Large (12px)', value: 'large' },
                    { label: 'Full (Pill)', value: 'full' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'buttonStyle',
                  type: 'select',
                  label: 'Button Style',
                  defaultValue: 'solid',
                  options: [
                    { label: 'Solid', value: 'solid' },
                    { label: 'Outline', value: 'outline' },
                    { label: 'Gradient', value: 'gradient' },
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
          label: 'SEO Defaults',
          fields: [
            {
              name: 'defaultDescription',
              type: 'textarea',
              label: 'Default Meta Description',
              admin: {
                description: 'Fallback search engine description used when a page does not specify its own.',
              },
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Default OpenGraph / Social Image',
              admin: {
                description: 'Fallback social sharing image used across pages and posts.',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
