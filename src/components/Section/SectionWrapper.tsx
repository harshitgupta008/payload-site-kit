import React from 'react'
import { cn } from '@/utilities/ui'
import { AnimateIn } from './AnimateIn'
import type { SectionStyleType } from '@/fields/sectionStyle'

export interface SectionWrapperProps {
  sectionStyle?: SectionStyleType | null
  children: React.ReactNode
  className?: string
  containerClassName?: string
  enableContainer?: boolean
  id?: string
}

// Static Tailwind class maps - no dynamic string interpolation
const backgroundClasses: Record<string, string> = {
  none: 'bg-transparent text-foreground',
  light: 'bg-muted text-foreground',
  dark: 'bg-foreground text-background',
  primary: 'bg-primary text-primary-foreground',
}

const spacingClasses: Record<string, string> = {
  small: 'py-8 md:py-12',
  medium: 'py-12 md:py-20',
  large: 'py-16 md:py-28',
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  sectionStyle,
  children,
  className,
  containerClassName,
  enableContainer = true,
  id,
}) => {
  const bg = sectionStyle?.background || 'none'
  const spacing = sectionStyle?.spacing || 'medium'
  const animation = sectionStyle?.animation || 'none'

  const bgClass = backgroundClasses[bg] || backgroundClasses.none
  const spacingClass = spacingClasses[spacing] || spacingClasses.medium

  return (
    <section
      id={id}
      className={cn('w-full relative overflow-hidden transition-colors', bgClass, spacingClass, className)}
    >
      <AnimateIn animation={animation}>
        {enableContainer ? (
          <div className={cn('container mx-auto', containerClassName)}>{children}</div>
        ) : (
          children
        )}
      </AnimateIn>
    </section>
  )
}
