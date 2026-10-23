import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Check, ArrowRight } from 'lucide-react'
import type { Media } from '@/payload-types'
import type { SectionStyleType } from '@/fields/sectionStyle'

export interface ImageTextBlockProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: SectionStyleType | null
  image: string | Media
  imagePosition?: 'left' | 'right' | null
  mobileOrder?: 'image-first' | 'text-first' | null
  verticalAlign?: 'top' | 'center' | null
  imageDecoration?: 'none' | 'offset-shape' | 'outline' | null
  imageRadius?: 'none' | 'small' | 'large' | null
  buttonStyle?: 'default' | 'arrow-circle' | null
  content?: any
  bulletPoints?: { point: string; id?: string | null }[] | null
  enableLink?: boolean | null
  link?: any
}

const radiusClasses: Record<string, string> = {
  none: 'rounded-none',
  small: 'rounded-lg',
  large: 'rounded-2xl',
}

export const ImageTextBlock: React.FC<ImageTextBlockProps> = (props) => {
  const {
    sectionHeader,
    sectionStyle,
    image,
    imagePosition = 'left',
    mobileOrder = 'image-first',
    verticalAlign = 'center',
    imageDecoration = 'none',
    imageRadius = 'large',
    buttonStyle = 'default',
    content,
    bulletPoints,
    enableLink,
    link,
  } = props

  const mediaObj = typeof image === 'object' && image !== null ? (image as Media) : null
  const imageUrl = mediaObj?.url || (typeof image === 'string' ? image : '')
  const imageAlt = mediaObj?.alt || 'Section Image'

  const isImageRight = imagePosition === 'right'
  const isTextFirst = mobileOrder === 'text-first'
  const isTopAlign = verticalAlign === 'top'

  const radiusClass = radiusClasses[imageRadius || 'large'] || radiusClasses.large
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

      <div
        className={cn(
          'flex flex-col gap-10 md:gap-14 lg:gap-20 items-stretch',
          imageUrl && isTopAlign ? 'lg:items-start' : 'lg:items-center',
          imageUrl && (isImageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'),
          imageUrl && isTextFirst && 'flex-col-reverse',
        )}
      >
        {/* Media Column with Optional Decoration */}
        {imageUrl && (
          <div className="w-full lg:w-1/2 flex-1">
            <div className="relative isolate p-2 sm:p-4">
              {/* Offset Shape Decoration */}
              {imageDecoration === 'offset-shape' && (
                <div
                  className={cn(
                    'absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-full h-full bg-primary/15 -z-10',
                    radiusClass,
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Offset Outline Decoration */}
              {imageDecoration === 'outline' && (
                <div
                  className={cn(
                    'absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-full h-full border-2 border-primary/40 -z-10',
                    radiusClass,
                  )}
                  aria-hidden="true"
                />
              )}

              <div
                className={cn(
                  'relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden shadow-lg border border-border bg-muted',
                  radiusClass,
                )}
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content Column */}
        <div className={cn('w-full flex flex-col justify-center', imageUrl ? 'lg:w-1/2 flex-1' : 'max-w-4xl mx-auto')}>
          {content && (
            <div className="prose dark:prose-invert max-w-none mb-6">
              <RichText data={content} enableGutter={false} />
            </div>
          )}

          {/* Bullet Points */}
          {Array.isArray(bulletPoints) && bulletPoints.length > 0 && (
            <ul className="space-y-3 mb-8">
              {bulletPoints.map((item, idx) => (
                <li key={item.id || idx} className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-foreground/90 font-medium leading-relaxed">
                    {item.point}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA Link Button */}
          {enableLink && link && (
            <div className="pt-2 flex items-center">
              {buttonStyle === 'arrow-circle' ? (
                <div className="inline-flex items-center gap-3 group">
                  <CMSLink {...link} size="lg" />
                  <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              ) : (
                <CMSLink {...link} size="lg" />
              )}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
