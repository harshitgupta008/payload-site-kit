import React from 'react'
import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import { Card, type CardItemProps } from '@/components/Card'
import type { SectionStyleType } from '@/fields/sectionStyle'

export interface ServicesGridBlockProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: SectionStyleType | null
  layoutMode?: 'equal' | 'custom' | null
  columns?: '1' | '2' | '3' | '4' | null
  numbered?: boolean | null
  cardStyle?: 'shadow' | 'border' | 'flat' | null
  hover?: 'none' | 'lift' | null
  textAlign?: 'left' | 'center' | null
  cards?: CardItemProps[] | null
}

const gridColumnsMap: Record<string, string> = {
  '1': 'grid-cols-1 max-w-2xl mx-auto',
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const customWidthSpans: Record<string, string> = {
  '1/3': 'lg:col-span-4',
  '1/2': 'lg:col-span-6',
  '2/3': 'lg:col-span-8',
  full: 'lg:col-span-12',
}

export const ServicesGridBlock: React.FC<ServicesGridBlockProps> = (props) => {
  const {
    sectionHeader,
    sectionStyle,
    layoutMode = 'equal',
    columns = '3',
    numbered = false,
    cardStyle = 'shadow',
    hover = 'lift',
    textAlign = 'left',
    cards,
  } = props

  const isCustom = layoutMode === 'custom'
  const equalGridClass = gridColumnsMap[columns || '3'] || gridColumnsMap['3']
  const accentColor = sectionStyle?.accentColor || 'primary'

  return (
    <SectionWrapper sectionStyle={sectionStyle}>
      <SectionHeader
        title={sectionHeader?.title}
        description={sectionHeader?.description}
        alignment={sectionHeader?.alignment}
        accentColor={accentColor}
      />

      {Array.isArray(cards) && cards.length > 0 && (
        <div
          className={cn(
            'grid gap-6 md:gap-8',
            isCustom ? 'grid-cols-1 lg:grid-cols-12' : equalGridClass,
          )}
        >
          {cards.map((card, idx) => {
            const cardWidth = card.width || '1/3'
            const spanClass = isCustom
              ? customWidthSpans[cardWidth] || customWidthSpans['1/3']
              : ''
            const numberPrefix = numbered ? `${idx + 1}.` : null

            return (
              <div key={card.id || idx} className={cn('w-full flex flex-col', spanClass)}>
                <Card
                  card={card}
                  cardStyle={cardStyle}
                  hover={hover}
                  textAlign={textAlign}
                  numberPrefix={numberPrefix}
                  accentColor={accentColor}
                  className="h-full"
                />
              </div>
            )
          })}
        </div>
      )}
    </SectionWrapper>
  )
}
