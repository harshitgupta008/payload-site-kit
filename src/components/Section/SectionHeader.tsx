import React from 'react'
import { cn } from '@/utilities/ui'
import { renderHighlightedText } from '@/utilities/highlightText'
import { titleColorClasses, descColorClasses } from '@/utilities/colorOptions'
import type { SectionHeaderType } from '@/fields/sectionHeader'

export interface SectionHeaderProps {
  sectionHeader?: SectionHeaderType | null
  title?: string | null
  description?: string | null
  alignment?: 'left' | 'center' | 'right' | null
  highlightWords?: string | null
  highlightColor?: string | null
  customHighlightColor?: string | null
  titleColor?: string | null
  customTitleColor?: string | null
  descriptionColor?: string | null
  customDescriptionColor?: string | null
  headingLevel?: 'h1' | 'h2' | 'h3'
  accentColor?: 'primary' | 'secondary' | 'foreground' | null
  className?: string
}

const alignmentClasses = {
  left: 'text-left mr-auto items-start',
  center: 'text-center mx-auto items-center',
  right: 'text-right ml-auto items-end',
}

const accentClasses: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary-foreground',
  foreground: 'text-foreground',
}

export const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  const {
    sectionHeader,
    headingLevel = 'h2',
    accentColor,
    className,
  } = props

  // Support both nested sectionHeader object and flat props
  const title = props.title !== undefined ? props.title : sectionHeader?.title
  const description = props.description !== undefined ? props.description : sectionHeader?.description
  const alignment = props.alignment !== undefined ? props.alignment : sectionHeader?.alignment || 'center'
  const highlightWords = props.highlightWords !== undefined ? props.highlightWords : sectionHeader?.highlightWords
  const highlightColor = props.highlightColor !== undefined ? props.highlightColor : sectionHeader?.highlightColor
  const customHighlightColor = props.customHighlightColor !== undefined ? props.customHighlightColor : sectionHeader?.customHighlightColor

  const titleColor = props.titleColor !== undefined ? props.titleColor : sectionHeader?.titleColor || 'default'
  const customTitleColor = props.customTitleColor !== undefined ? props.customTitleColor : sectionHeader?.customTitleColor
  const descriptionColor = props.descriptionColor !== undefined ? props.descriptionColor : sectionHeader?.descriptionColor || 'default'
  const customDescriptionColor = props.customDescriptionColor !== undefined ? props.customDescriptionColor : sectionHeader?.customDescriptionColor

  if (!title && !description) return null

  const alignClass = alignmentClasses[alignment || 'center'] || alignmentClasses.center
  const accentClass = accentColor ? accentClasses[accentColor] || '' : ''
  const HeadingTag = headingLevel

  const titleColorClass =
    titleColor && titleColor !== 'default' && titleColor !== 'custom'
      ? titleColorClasses[titleColor] || ''
      : ''
  const descColorClass =
    descriptionColor && descriptionColor !== 'default' && descriptionColor !== 'custom'
      ? descColorClasses[descriptionColor] || 'text-muted-foreground'
      : 'text-muted-foreground'

  const titleStyle: React.CSSProperties | undefined =
    titleColor === 'custom' && customTitleColor ? { color: customTitleColor } : undefined
  const descStyle: React.CSSProperties | undefined =
    descriptionColor === 'custom' && customDescriptionColor ? { color: customDescriptionColor } : undefined

  return (
    <div className={cn('flex flex-col max-w-3xl mb-12 md:mb-16', alignClass, className)}>
      {title && (
        <HeadingTag
          style={titleStyle}
          className={cn(
            'font-heading tracking-tight leading-tight',
            titleColorClass,
            accentClass,
            headingLevel === 'h1'
              ? 'text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 md:mb-6'
              : 'text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4',
          )}
        >
          {renderHighlightedText(title, highlightWords, highlightColor, customHighlightColor)}
        </HeadingTag>
      )}
      {description && (
        <p
          style={descStyle}
          className={cn('text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl', descColorClass)}
        >
          {description}
        </p>
      )}
    </div>
  )
}

SectionHeader.displayName = 'SectionHeader'
