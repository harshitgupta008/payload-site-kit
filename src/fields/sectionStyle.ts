import type { Field } from 'payload'
import type { Media } from '@/payload-types'
import {
  heightOptions,
  mobileHeightOptions,
  verticalAlignOptions,
} from '@/lib/sectionHeight'

export interface SectionStyleType {
  background?: 'none' | 'light' | 'dark' | 'primary' | null
  spacing?: 'small' | 'medium' | 'large' | null
  animation?: 'none' | 'fade-up' | 'fade-in' | 'zoom' | null
  height?:
    | 'fit'
    | 'compact'
    | 'medium'
    | 'tall'
    | 'screen'
    | 'screen-below-header'
    | null
  mobileHeight?:
    | 'same-as-desktop'
    | 'fit'
    | 'compact'
    | 'medium'
    | 'tall'
    | 'screen'
    | 'screen-below-header'
    | null
  contentVerticalAlign?: 'top' | 'center' | 'bottom' | null
  width?: 'contained' | 'wide' | 'full' | null
  accentColor?: 'primary' | 'secondary' | 'foreground' | null
  textColor?: 'default' | 'light' | 'dark' | 'primary' | 'secondary' | 'muted' | 'custom' | null
  customTextColor?: string | null
  backgroundImage?: string | Media | null
  overlay?: 'none' | 'light' | 'dark' | null
  sideImage?: string | Media | null
  sideImagePosition?: 'left' | 'right' | null
  sideImageAspect?: '4:3' | '16:9' | '1:1' | 'natural' | null
}

export const sectionStyle = (): Field => {
  return {
    type: 'collapsible',
    label: 'Section Styling & Layout',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'sectionStyle',
        type: 'group',
        label: false,
        admin: {
          description: 'Controls background color, text color, height, container width, overlays, and animations.',
          hideGutter: true,
        },
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'background',
                type: 'select',
                label: 'Background Color',
                defaultValue: 'none',
                options: [
                  { label: 'None (Default / Transparent)', value: 'none' },
                  { label: 'Light (Muted Surface)', value: 'light' },
                  { label: 'Dark (High Contrast Foreground)', value: 'dark' },
                  { label: 'Primary Brand Color', value: 'primary' },
                ],
                admin: {
                  width: '25%',
                  description: 'Theme token background colors.',
                },
              },
              {
                name: 'textColor',
                type: 'select',
                label: 'Section Text Color',
                defaultValue: 'default',
                options: [
                  { label: 'Default (Theme Text)', value: 'default' },
                  { label: 'Crisp White / Light', value: 'light' },
                  { label: 'High-Contrast Dark', value: 'dark' },
                  { label: 'Primary Brand Color', value: 'primary' },
                  { label: 'Secondary / Accent Color', value: 'secondary' },
                  { label: 'Muted Secondary Gray', value: 'muted' },
                  { label: 'Custom Hex Color', value: 'custom' },
                ],
                admin: {
                  width: '25%',
                  description: 'Forces specific font color across section.',
                },
              },
              {
                name: 'customTextColor',
                type: 'text',
                label: 'Custom Text Color (Hex)',
                admin: {
                  width: '25%',
                  condition: (_: any, siblingData: any) => siblingData?.textColor === 'custom',
                  placeholder: 'e.g. #10b981',
                },
              },
              {
                name: 'spacing',
                type: 'select',
                label: 'Vertical Padding',
                defaultValue: 'medium',
                options: [
                  { label: 'Small (Compact padding)', value: 'small' },
                  { label: 'Medium (Standard padding)', value: 'medium' },
                  { label: 'Large (Spacious padding)', value: 'large' },
                ],
                admin: {
                  width: '25%',
                  description: 'Top and bottom section padding.',
                },
              },
              {
                name: 'animation',
                type: 'select',
                label: 'Scroll Animation',
                defaultValue: 'none',
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'Fade Up', value: 'fade-up' },
                  { label: 'Fade In', value: 'fade-in' },
                  { label: 'Zoom In', value: 'zoom' },
                ],
                admin: {
                  width: '25%',
                  description: 'Entrance animation on scroll.',
                },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'height',
                type: 'select',
                label: 'Section Height',
                defaultValue: 'fit',
                options: heightOptions,
                admin: {
                  width: '25%',
                  description: 'Viewport height boundary (min-h).',
                },
              },
              {
                name: 'mobileHeight',
                type: 'select',
                label: 'Mobile Height (under 768px)',
                defaultValue: 'same-as-desktop',
                options: mobileHeightOptions,
                admin: {
                  width: '25%',
                  description: 'Optional separate height for phones.',
                },
              },
              {
                name: 'contentVerticalAlign',
                type: 'select',
                label: 'Vertical Alignment',
                defaultValue: 'center',
                options: verticalAlignOptions,
                admin: {
                  width: '25%',
                  description: 'Placement when height exceeds content.',
                  condition: (_, siblingData) =>
                    Boolean(siblingData?.height && siblingData.height !== 'fit'),
                },
              },
              {
                name: 'width',
                type: 'select',
                label: 'Container Width',
                defaultValue: 'contained',
                options: [
                  { label: 'Contained (Standard Container)', value: 'contained' },
                  { label: 'Wide (7xl Max Width)', value: 'wide' },
                  { label: 'Full Width', value: 'full' },
                ],
                admin: {
                  width: '25%',
                  description: 'Horizontal content width boundary.',
                },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'accentColor',
                type: 'select',
                label: 'Accent Color',
                defaultValue: 'primary',
                options: [
                  { label: 'Primary Brand Color', value: 'primary' },
                  { label: 'Secondary Accent Color', value: 'secondary' },
                  { label: 'High Contrast Foreground', value: 'foreground' },
                ],
                admin: {
                  width: '33.33%',
                  description: 'Applied to titles, card numbers, badges, and highlights.',
                },
              },
              {
                name: 'backgroundImage',
                type: 'upload',
                relationTo: 'media',
                label: 'Background Image',
                admin: {
                  width: '33.33%',
                  description: 'Optional image layer covering the entire section.',
                },
              },
              {
                name: 'overlay',
                type: 'select',
                label: 'Image Overlay Tint',
                defaultValue: 'none',
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'Light Tint (Theme Background / 80%)', value: 'light' },
                  { label: 'Dark Tint (Theme Foreground / 60%)', value: 'dark' },
                ],
                admin: {
                  width: '33.33%',
                  description: 'Token-based overlay tint over background image.',
                  condition: (_, siblingData) => Boolean(siblingData?.backgroundImage),
                },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'sideImage',
                type: 'upload',
                relationTo: 'media',
                label: 'Section Side Image (Split Layout)',
                admin: {
                  width: '50%',
                  description: 'Splits this section into a 2-column layout: content on one side, image on the other.',
                },
              },
              {
                name: 'sideImagePosition',
                type: 'select',
                label: 'Side Image Position',
                defaultValue: 'right',
                options: [
                  { label: 'Divide: Image on Right (Content Left, Image Right)', value: 'right' },
                  { label: 'Divide: Image on Left (Image Left, Content Right)', value: 'left' },
                ],
                admin: {
                  width: '25%',
                  condition: (_: any, siblingData: any) => Boolean(siblingData?.sideImage),
                },
              },
              {
                name: 'sideImageAspect',
                type: 'select',
                label: 'Side Image Aspect Ratio',
                defaultValue: '4:3',
                options: [
                  { label: 'Classic (4:3)', value: '4:3' },
                  { label: 'Widescreen (16:9)', value: '16:9' },
                  { label: 'Square (1:1)', value: '1:1' },
                  { label: 'Natural Ratio', value: 'natural' },
                ],
                admin: {
                  width: '25%',
                  condition: (_: any, siblingData: any) => Boolean(siblingData?.sideImage),
                },
              },
            ],
          },
        ],
      },
    ],
  }
}
