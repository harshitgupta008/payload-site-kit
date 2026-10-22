import type { Field } from 'payload'

export interface SectionStyleType {
  background?: 'none' | 'light' | 'dark' | 'primary' | null
  spacing?: 'small' | 'medium' | 'large' | null
  animation?: 'none' | 'fade-up' | 'fade-in' | 'zoom' | null
}

export const sectionStyle = (): Field => {
  return {
    type: 'collapsible',
    label: 'Section Styling',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'sectionStyle',
        type: 'group',
        label: false,
        admin: {
          description: 'Controls background color, vertical padding, and entry animation.',
          hideGutter: true,
        },
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'background',
                type: 'select',
                label: 'Background',
                defaultValue: 'none',
                options: [
                  { label: 'None (Default / Transparent)', value: 'none' },
                  { label: 'Light (Muted Surface)', value: 'light' },
                  { label: 'Dark (High Contrast Foreground)', value: 'dark' },
                  { label: 'Primary Brand Color', value: 'primary' },
                ],
                admin: {
                  width: '33.33%',
                  description: 'Applies theme token background colors respecting light/dark mode.',
                },
              },
              {
                name: 'spacing',
                type: 'select',
                label: 'Vertical Spacing',
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
                  description: 'Entrance animation when scrolling into viewport.',
                },
              },
            ],
          },
        ],
      },
    ],
  }
}
