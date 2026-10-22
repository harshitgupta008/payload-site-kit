import type { Field } from 'payload'
import type { Media } from '@/payload-types'

export interface SectionStyleType {
  background?: 'none' | 'light' | 'dark' | 'primary' | null
  spacing?: 'small' | 'medium' | 'large' | null
  animation?: 'none' | 'fade-up' | 'fade-in' | 'zoom' | null
  height?: 'fit' | 'screen' | 'tall' | 'medium' | null
  contentVerticalAlign?: 'top' | 'center' | 'bottom' | null
  width?: 'contained' | 'wide' | 'full' | null
  accentColor?: 'primary' | 'secondary' | 'foreground' | null
  backgroundImage?: string | Media | null
  overlay?: 'none' | 'light' | 'dark' | null
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
          description: 'Controls background color, height, container width, overlays, and animations.',
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
                  width: '33.33%',
                  description: 'Theme token background colors.',
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
                  width: '33.33%',
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
                  width: '33.33%',
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
                options: [
                  { label: 'Fit Content (Default)', value: 'fit' },
                  { label: 'Full Screen (100svh)', value: 'screen' },
                  { label: 'Tall (~75svh)', value: 'tall' },
                  { label: 'Medium (~50svh)', value: 'medium' },
                ],
                admin: {
                  width: '33.33%',
                  description: 'Viewport height constraints for the section.',
                },
              },
              {
                name: 'contentVerticalAlign',
                type: 'select',
                label: 'Vertical Alignment',
                defaultValue: 'center',
                options: [
                  { label: 'Top', value: 'top' },
                  { label: 'Center', value: 'center' },
                  { label: 'Bottom', value: 'bottom' },
                ],
                admin: {
                  width: '33.33%',
                  description: 'Applies when height is taller than content.',
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
                  width: '33.33%',
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
        ],
      },
    ],
  }
}
