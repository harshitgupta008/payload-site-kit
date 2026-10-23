import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import { FAQAccordion, type FAQItem } from './Accordion'
import type { SectionStyleType } from '@/fields/sectionStyle'
import type { Media } from '@/payload-types'

export interface FAQBlockProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: SectionStyleType | null
  layout?: 'one-column' | 'two-columns' | 'image-left' | 'image-right' | null
  style?: 'card' | 'line' | 'plain' | null
  sideImage?: string | Media | null
  allowMultipleOpen?: boolean | null
  firstOpen?: boolean | null
  items?: FAQItem[] | null
}

export const FAQBlock: React.FC<FAQBlockProps> = (props) => {
  const {
    sectionHeader,
    sectionStyle,
    layout = 'one-column',
    style = 'line',
    sideImage,
    allowMultipleOpen = false,
    firstOpen = true,
    items,
  } = props

  const hasItems = Array.isArray(items) && items.length > 0
  const isImageLeft = layout === 'image-left'
  const isImageRight = layout === 'image-right'
  const hasSideImage = (isImageLeft || isImageRight) && Boolean(sideImage)

  const sideMedia =
    typeof sideImage === 'object' && sideImage !== null ? (sideImage as Media) : null
  const sideImageUrl =
    sideMedia?.url || (typeof sideImage === 'string' ? sideImage : null)
  const sideImageAlt = sideMedia?.alt || 'FAQ side illustration'

  const accentColor = sectionStyle?.accentColor || 'primary'

  return (
    <SectionWrapper sectionStyle={sectionStyle}>
      <SectionHeader
        sectionHeader={sectionHeader}
        title={sectionHeader?.title}
        description={sectionHeader?.description}
        alignment={sectionHeader?.alignment}
        accentColor={accentColor}
      />

      {hasItems && (
        hasSideImage && sideImageUrl ? (
          <div
            className={cn(
              'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start',
              isImageRight && 'lg:flex-row-reverse',
            )}
          >
            <div
              className={cn(
                'w-full lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-[var(--radius)] overflow-hidden bg-muted border border-border shadow-sm',
                isImageRight && 'lg:order-2',
              )}
            >
              <Image
                src={sideImageUrl}
                alt={sideImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className={cn('w-full lg:col-span-7', isImageRight && 'lg:order-1')}>
              <FAQAccordion
                items={items}
                style={style}
                layout="one-column"
                allowMultipleOpen={allowMultipleOpen}
                firstOpen={firstOpen}
                accentColor={accentColor}
              />
            </div>
          </div>
        ) : (
          <FAQAccordion
            items={items}
            style={style}
            layout={layout}
            allowMultipleOpen={allowMultipleOpen}
            firstOpen={firstOpen}
            accentColor={accentColor}
          />
        )
      )}
    </SectionWrapper>
  )
}
