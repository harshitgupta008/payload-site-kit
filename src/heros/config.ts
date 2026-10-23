import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { actionField } from '@/fields/action'
import {
  highlightColorOptions,
  buttonBgOptions,
  buttonTextColorOptions,
} from '@/utilities/colorOptions'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'banner',
      label: 'Hero Style',
      options: [
        { label: 'Page Banner (Full Controls)', value: 'banner' },
        { label: 'None (Page Content Starts Immediately)', value: 'none' },
        { label: 'Legacy: High Impact', value: 'highImpact' },
        { label: 'Legacy: Medium Impact', value: 'mediumImpact' },
        { label: 'Legacy: Low Impact', value: 'lowImpact' },
      ],
      required: true,
      admin: {
        description: 'Choose the banner style for this page. New pages default to Page Banner.',
      },
    },

    // ==========================================
    // 1. Text & Headings Controls
    // ==========================================
    {
      type: 'collapsible',
      label: 'Banner Text & Headings',
      admin: {
        condition: (_, { type } = {}) => !type || type === 'banner',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow (Small label above title)',
          admin: {
            placeholder: 'e.g. Introducing our services',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Banner Title (Heading 1)',
          admin: {
            description: 'Main prominent page heading. If left empty, falls back to the page title.',
            placeholder: 'Leave blank to use Page Title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Banner Description / Subtitle',
          admin: {
            placeholder: 'Supporting statement, value proposition, or call-to-action message.',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'highlightWords',
              type: 'text',
              label: 'Highlight Words',
              admin: {
                width: '33.33%',
                description: 'Comma or space-separated words in the title to highlight.',
                placeholder: 'e.g. Services, Growth, Fast',
              },
            },
            {
              name: 'highlightColor',
              type: 'select',
              label: 'Highlight Color',
              defaultValue: 'primary',
              options: highlightColorOptions,
              admin: {
                width: '33.33%',
                condition: (_, siblingData) => Boolean(siblingData?.highlightWords),
              },
            },
            {
              name: 'customHighlightColor',
              type: 'text',
              label: 'Custom Highlight Color (Hex)',
              admin: {
                width: '33.33%',
                condition: (_, siblingData) =>
                  Boolean(siblingData?.highlightWords && siblingData?.highlightColor === 'custom'),
                placeholder: 'e.g. #3b82f6',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'titleSize',
              type: 'select',
              label: 'Title Font Size',
              defaultValue: 'large',
              options: [
                { label: 'Small (3xl - 5xl)', value: 'small' },
                { label: 'Medium (4xl - 6xl)', value: 'medium' },
                { label: 'Large (4xl - 7xl)', value: 'large' },
                { label: 'Extra Large (5xl - 8xl)', value: 'extra-large' },
              ],
              admin: {
                width: '33.33%',
                description: 'Scales fluidly with viewport.',
              },
            },
            {
              name: 'descriptionSize',
              type: 'select',
              label: 'Description Font Size',
              defaultValue: 'medium',
              options: [
                { label: 'Small (text-sm to lg)', value: 'small' },
                { label: 'Medium (text-base to 2xl)', value: 'medium' },
                { label: 'Large (text-lg to 3xl)', value: 'large' },
              ],
              admin: {
                width: '33.33%',
              },
            },
            {
              name: 'textWidth',
              type: 'select',
              label: 'Text Column Max Width',
              defaultValue: 'medium',
              options: [
                { label: 'Narrow (max-w-xl)', value: 'narrow' },
                { label: 'Medium (max-w-3xl)', value: 'medium' },
                { label: 'Wide (max-w-5xl)', value: 'wide' },
              ],
              admin: {
                width: '33.33%',
                description: 'Controls max line-length for readability.',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'textColor',
              type: 'select',
              label: 'Banner Text Color',
              defaultValue: 'default',
              options: [
                { label: 'Default / Auto (Adapts to background & theme)', value: 'default' },
                { label: 'Crisp White / Light', value: 'light' },
                { label: 'High-Contrast Dark / Slate', value: 'dark' },
                { label: 'Primary Brand Color', value: 'primary' },
                { label: 'Secondary / Accent Color', value: 'secondary' },
                { label: 'Muted Gray', value: 'muted' },
                { label: 'Custom Hex Color', value: 'custom' },
              ],
              admin: {
                width: '50%',
                description: 'Forces specific font color across all text in the banner.',
              },
            },
            {
              name: 'customTextColor',
              type: 'text',
              label: 'Custom Text Color (Hex/RGB)',
              admin: {
                width: '50%',
                condition: (_: any, siblingData: any) => siblingData?.textColor === 'custom',
                placeholder: 'e.g. #ffffff or #3b82f6',
                description: 'Enter any CSS color code (e.g. #ffffff, rgb(255,255,255)).',
              },
            },
          ],
        },
      ],
    },

    // ==========================================
    // 2. Alignment & Sizing Controls
    // ==========================================
    {
      type: 'collapsible',
      label: 'Alignment & Section Height',
      admin: {
        condition: (_, { type } = {}) => !type || type === 'banner',
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
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
                width: '33.33%',
              },
            },
            {
              name: 'buttonsAlign',
              type: 'select',
              label: 'Buttons Alignment',
              defaultValue: 'follow-text',
              options: [
                { label: 'Follow Text Alignment', value: 'follow-text' },
                { label: 'Left Aligned', value: 'left' },
                { label: 'Centered', value: 'center' },
                { label: 'Right Aligned', value: 'right' },
              ],
              admin: {
                width: '33.33%',
              },
            },
            {
              name: 'verticalAlign',
              type: 'select',
              label: 'Content Vertical Alignment',
              defaultValue: 'center',
              options: [
                { label: 'Top', value: 'top' },
                { label: 'Center', value: 'center' },
                { label: 'Bottom', value: 'bottom' },
              ],
              admin: {
                width: '33.33%',
                description: 'Only applies when height is taller than content.',
                condition: (_, siblingData) =>
                  Boolean(siblingData?.height && siblingData.height !== 'fit'),
              },
            },
          ],
        },
        {
          name: 'height',
          type: 'select',
          label: 'Banner Height',
          defaultValue: 'fit',
          options: [
            { label: 'Fit Content (Default)', value: 'fit' },
            { label: 'Full Screen (100svh)', value: 'screen' },
            { label: 'Full Screen Below Header (100svh minus header)', value: 'screen-below-header' },
            { label: 'Three Quarters (~75svh)', value: 'tall' },
            { label: 'Half Screen (~50svh)', value: 'medium' },
            { label: 'Slim Banner (~30svh)', value: 'compact' },
            { label: 'Natural Image Ratio (Banner matches image aspect ratio)', value: 'image' },
          ],
          admin: {
            description: 'Full screen: fills the whole screen. Full screen below header: fills what is left under header. Content never cuts off.',
          },
        },
      ],
    },

    // ==========================================
    // 3. Image & Visual Controls
    // ==========================================
    {
      type: 'collapsible',
      label: 'Image & Background Visuals',
      admin: {
        condition: (_, { type } = {}) => !type || type === 'banner',
        initCollapsed: false,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Desktop / Primary Image',
              admin: {
                width: '50%',
                description: 'Recommended: 1920px wide, under 500KB. Large files load slower.',
              },
            },
            {
              name: 'mobileImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Mobile Image (Optional under 768px)',
              admin: {
                width: '50%',
                description: 'Optional tailored portrait or square crop for phones.',
              },
            },
          ],
        },
        {
          name: 'isDecorative',
          type: 'checkbox',
          label: 'Decorative image (Renders alt="" for background-only imagery)',
          defaultValue: false,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'imageMode',
              type: 'select',
              label: 'Image Display Mode',
              defaultValue: 'background',
              options: [
                { label: 'Background Layer (Behind Text)', value: 'background' },
                { label: 'Side-by-Side (Split Grid)', value: 'side' },
                { label: 'Below Text Block', value: 'below' },
                { label: 'None (Text Only)', value: 'none' },
              ],
              admin: {
                width: '33.33%',
              },
            },
            {
              name: 'imagePosition',
              type: 'select',
              label: 'Side Image Position',
              defaultValue: 'right',
              options: [
                { label: 'Left of Text', value: 'left' },
                { label: 'Right of Text', value: 'right' },
              ],
              admin: {
                width: '33.33%',
                condition: (_, siblingData) => siblingData?.imageMode === 'side',
              },
            },
            {
              name: 'imageFit',
              type: 'select',
              label: 'Background Image Sizing (Fit)',
              defaultValue: 'cover',
              options: [
                { label: 'Cover (Fills entire banner, edge crop)', value: 'cover' },
                { label: 'Contain (Shows whole image with background margins)', value: 'contain' },
                { label: 'Natural Ratio (Banner height follows image ratio)', value: 'natural' },
              ],
              admin: {
                width: '33.33%',
                condition: (_, siblingData) => siblingData?.imageMode === 'background',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'focalPoint',
              type: 'select',
              label: 'Focal Point (Object Position)',
              defaultValue: 'center',
              options: [
                { label: 'Center', value: 'center' },
                { label: 'Top', value: 'top' },
                { label: 'Bottom', value: 'bottom' },
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
                { label: 'Top Left', value: 'top-left' },
                { label: 'Top Right', value: 'top-right' },
                { label: 'Bottom Left', value: 'bottom-left' },
                { label: 'Bottom Right', value: 'bottom-right' },
              ],
              admin: {
                width: '25%',
                description: 'Which part of the image stays visible when cropped.',
              },
            },
            {
              name: 'overlay',
              type: 'select',
              label: 'Overlay Tint',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Dark Overlay', value: 'dark' },
                { label: 'Light Overlay', value: 'light' },
                { label: 'Primary Brand Overlay', value: 'primary' },
              ],
              admin: {
                width: '25%',
                description: 'Uses theme tokens with opacity.',
              },
            },
            {
              name: 'overlayStrength',
              type: 'select',
              label: 'Overlay Strength',
              defaultValue: 'medium',
              options: [
                { label: 'Low Tint', value: 'low' },
                { label: 'Medium Tint', value: 'medium' },
                { label: 'High Tint', value: 'high' },
              ],
              admin: {
                width: '25%',
                condition: (_, siblingData) =>
                  Boolean(siblingData?.overlay && siblingData.overlay !== 'none'),
              },
            },
            {
              name: 'textTone',
              type: 'select',
              label: 'Text Tone',
              defaultValue: 'auto',
              options: [
                { label: 'Auto (Calculated from overlay/background)', value: 'auto' },
                { label: 'Light (White text for dark backgrounds)', value: 'light' },
                { label: 'Dark (Dark text for light backgrounds)', value: 'dark' },
              ],
              admin: {
                width: '25%',
              },
            },
          ],
        },
      ],
    },

    // ==========================================
    // 4. Call-to-Action Buttons
    // ==========================================
    {
      type: 'collapsible',
      label: 'Call-to-Action Buttons',
      admin: {
        condition: (_, { type } = {}) => !type || type === 'banner',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'buttons',
          type: 'array',
          label: 'Banner Action Buttons',
          maxRows: 3,
          admin: {
            description: 'Add up to 3 buttons (Links, Modals, Popups, Phone calls, Downloads).',
            initCollapsed: false,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Button Label',
              required: true,
              admin: {
                placeholder: 'e.g. Get Started, View Services',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'style',
                  type: 'select',
                  label: 'Button Style',
                  defaultValue: 'solid',
                  options: [
                    { label: 'Solid Accent', value: 'solid' },
                    { label: 'Outline Border', value: 'outline' },
                    { label: 'Ghost / Subtle', value: 'ghost' },
                  ],
                  admin: {
                    width: '33.33%',
                  },
                },
                {
                  name: 'size',
                  type: 'select',
                  label: 'Button Size',
                  defaultValue: 'medium',
                  options: [
                    { label: 'Small', value: 'small' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Large', value: 'large' },
                  ],
                  admin: {
                    width: '33.33%',
                  },
                },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Button Icon',
                  defaultValue: 'none',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Arrow Right (→)', value: 'arrow-right' },
                    { label: 'Circle Arrow (↗)', value: 'arrow-circle' },
                  ],
                  admin: {
                    width: '33.33%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonBg',
                  type: 'select',
                  label: 'Button Background',
                  defaultValue: 'default',
                  options: buttonBgOptions,
                  admin: {
                    width: '50%',
                    description: 'Override button background color.',
                  },
                },
                {
                  name: 'customButtonBg',
                  type: 'text',
                  label: 'Custom Background (Hex)',
                  admin: {
                    width: '50%',
                    condition: (_: any, siblingData: any) => siblingData?.buttonBg === 'custom',
                    placeholder: 'e.g. #2563eb',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonTextColor',
                  type: 'select',
                  label: 'Button Text Color',
                  defaultValue: 'auto',
                  options: buttonTextColorOptions,
                  admin: {
                    width: '50%',
                    description: 'Override button text / font color.',
                  },
                },
                {
                  name: 'customButtonTextColor',
                  type: 'text',
                  label: 'Custom Text Color (Hex)',
                  admin: {
                    width: '50%',
                    condition: (_: any, siblingData: any) => siblingData?.buttonTextColor === 'custom',
                    placeholder: 'e.g. #ffffff',
                  },
                },
              ],
            },
            actionField({
              name: 'actionData',
              disableLabel: true,
            }),
          ],
        },
      ],
    },

    // ==========================================
    // 5. Legacy Fields (Preserved for backward compatibility)
    // ==========================================
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) =>
          Boolean(type && ['highImpact', 'mediumImpact', 'lowImpact'].includes(type)),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Legacy Rich Text',
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) =>
            Boolean(type && ['highImpact', 'mediumImpact', 'lowImpact'].includes(type)),
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
    },
  ],
  label: false,
}
