import React from 'react'
import { cn } from '@/utilities/ui'

export interface SectionHeaderProps {
  title?: string | null
  description?: string | null
  alignment?: 'left' | 'center' | 'right' | null
  headingLevel?: 'h1' | 'h2' | 'h3'
  className?: string
}

const alignmentClasses = {
  left: 'text-left mr-auto items-start',
  center: 'text-center mx-auto items-center',
  right: 'text-right ml-auto items-end',
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  alignment = 'center',
  headingLevel = 'h2',
  className,
}) => {
  if (!title && !description) return null

  const alignClass = alignmentClasses[alignment || 'center'] || alignmentClasses.center
  const HeadingTag = headingLevel

  return (
    <div className={cn('flex flex-col max-w-3xl mb-12 md:mb-16', alignClass, className)}>
      {title && (
        <HeadingTag
          className={cn(
            'font-heading tracking-tight leading-tight',
            headingLevel === 'h1'
              ? 'text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 md:mb-6'
              : 'text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4',
          )}
        >
          {title}
        </HeadingTag>
      )}
      {description && (
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
