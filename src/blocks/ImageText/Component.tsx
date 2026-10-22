import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Check } from 'lucide-react'
import type { Media } from '@/payload-types'

export interface ImageTextBlockProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: any
  image: string | Media
  imagePosition?: 'left' | 'right' | null
  mobileOrder?: 'image-first' | 'text-first' | null
  verticalAlign?: 'top' | 'center' | null
  content?: any
  bulletPoints?: { point: string; id?: string | null }[] | null
  enableLink?: boolean | null
  link?: any
}

export const ImageTextBlock: React.FC<ImageTextBlockProps> = (props) => {
  const {
    sectionHeader,
    sectionStyle,
    image,
    imagePosition = 'left',
    mobileOrder = 'image-first',
    verticalAlign = 'center',
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

  return (
    <SectionWrapper sectionStyle={sectionStyle}>
      <SectionHeader
        title={sectionHeader?.title}
        description={sectionHeader?.description}
        alignment={sectionHeader?.alignment}
      />

      <div
        className={cn(
          'flex flex-col gap-10 md:gap-14 lg:gap-20',
          isTopAlign ? 'lg:items-start' : 'lg:items-center',
          isImageRight ? 'lg:flex-row-reverse' : 'lg:flex-row',
          isTextFirst && 'flex-col-reverse',
        )}
      >
        {/* Media Column */}
        <div className="w-full lg:w-1/2 flex-1">
          {imageUrl && (
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border bg-muted">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="w-full lg:w-1/2 flex-1 flex flex-col justify-center">
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
                  <span className="flex-shrink-0 mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">
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
            <div className="pt-2">
              <CMSLink {...link} size="lg" />
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
