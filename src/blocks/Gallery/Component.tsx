import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import type { Media } from '@/payload-types'

export interface GalleryBlockProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: any
  columns?: '2' | '3' | '4' | null
  images?: {
    image: string | Media
    caption?: string | null
    id?: string | null
  }[] | null
}

const galleryColumnsMap: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}

export const GalleryBlock: React.FC<GalleryBlockProps> = (props) => {
  const { sectionHeader, sectionStyle, columns = '3', images } = props

  const gridClass = galleryColumnsMap[columns || '3'] || galleryColumnsMap['3']

  return (
    <SectionWrapper sectionStyle={sectionStyle}>
      <SectionHeader
        sectionHeader={sectionHeader}
        title={sectionHeader?.title}
        description={sectionHeader?.description}
        alignment={sectionHeader?.alignment}
      />

      {Array.isArray(images) && images.length > 0 && (
        <div className={cn('grid gap-4 sm:gap-6', gridClass)}>
          {images.map((item, idx) => {
            const mediaObj = typeof item.image === 'object' && item.image !== null ? (item.image as Media) : null
            const imageUrl = mediaObj?.url || (typeof item.image === 'string' ? item.image : '')
            const imageAlt = item.caption || mediaObj?.alt || `Gallery Image ${idx + 1}`

            if (!imageUrl) return null

            return (
              <figure key={item.id || idx} className="group flex flex-col m-0">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border shadow-sm">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {item.caption && (
                  <figcaption className="mt-2 text-sm text-muted-foreground text-center italic">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
      )}
    </SectionWrapper>
  )
}
