import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import { CMSLink } from '@/components/Link'
import type { Media } from '@/payload-types'

export interface ServicesGridBlockProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: any
  columns?: '2' | '3' | '4' | null
  cards?: {
    icon?: string | Media | null
    title: string
    description: string
    enableLink?: boolean | null
    link?: any
    id?: string | null
  }[] | null
}

const gridColumnsMap: Record<string, string> = {
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

export const ServicesGridBlock: React.FC<ServicesGridBlockProps> = (props) => {
  const { sectionHeader, sectionStyle, columns = '3', cards } = props

  const gridClass = gridColumnsMap[columns || '3'] || gridColumnsMap['3']

  return (
    <SectionWrapper sectionStyle={sectionStyle}>
      <SectionHeader
        title={sectionHeader?.title}
        description={sectionHeader?.description}
        alignment={sectionHeader?.alignment}
      />

      {Array.isArray(cards) && cards.length > 0 && (
        <div className={cn('grid gap-6 md:gap-8', gridClass)}>
          {cards.map((card, idx) => {
            const mediaObj = typeof card.icon === 'object' && card.icon !== null ? (card.icon as Media) : null
            const iconUrl = mediaObj?.url || (typeof card.icon === 'string' ? card.icon : '')

            return (
              <div
                key={card.id || idx}
                className="flex flex-col p-6 sm:p-8 rounded-2xl border border-border bg-card/60 hover:bg-card transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                {iconUrl && (
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 overflow-hidden relative">
                    <Image
                      src={iconUrl}
                      alt={mediaObj?.alt || card.title}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-bold font-heading mb-3 tracking-tight">
                  {card.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                  {card.description}
                </p>

                {card.enableLink && card.link && (
                  <div className="pt-2">
                    <CMSLink {...card.link} appearance="link" className="font-semibold text-primary" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </SectionWrapper>
  )
}
