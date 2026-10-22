import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { AnimateIn } from './AnimateIn'
import { Container } from '@/components/Container'
import type { SectionStyleType } from '@/fields/sectionStyle'
import type { Media } from '@/payload-types'

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

const heightClasses: Record<string, string> = {
  fit: 'min-h-0',
  screen: 'min-h-svh',
  tall: 'min-h-[75svh]',
  medium: 'min-h-[50svh]',
}

const verticalAlignClasses: Record<string, string> = {
  top: 'justify-start',
  center: 'justify-center',
  bottom: 'justify-end',
}

const overlayClasses: Record<string, string> = {
  none: '',
  light: 'bg-background/80',
  dark: 'bg-foreground/60',
}

const accentColorClasses: Record<string, string> = {
  primary: '[--section-accent:var(--primary)]',
  secondary: '[--section-accent:var(--secondary)]',
  foreground: '[--section-accent:var(--foreground)]',
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
  const height = sectionStyle?.height || 'fit'
  const verticalAlign = sectionStyle?.contentVerticalAlign || 'center'
  const width = sectionStyle?.width || 'contained'
  const accent = sectionStyle?.accentColor || 'primary'
  const overlay = sectionStyle?.overlay || 'none'

  const bgClass = backgroundClasses[bg] || backgroundClasses.none
  const spacingClass = spacingClasses[spacing] || spacingClasses.medium
  const heightClass = heightClasses[height] || heightClasses.fit
  const verticalAlignClass = verticalAlignClasses[verticalAlign] || verticalAlignClasses.center
  const overlayClass = overlayClasses[overlay] || ''
  const accentClass = accentColorClasses[accent] || accentColorClasses.primary

  // Media object resolution for background image
  const bgImageMedia =
    typeof sectionStyle?.backgroundImage === 'object' && sectionStyle.backgroundImage !== null
      ? (sectionStyle.backgroundImage as Media)
      : null
  const bgImageUrl =
    bgImageMedia?.url ||
    (typeof sectionStyle?.backgroundImage === 'string' ? sectionStyle.backgroundImage : null)
  const bgImageAlt = bgImageMedia?.alt || 'Section background'

  const hasOverlay = overlay !== 'none' && overlayClass.length > 0

  return (
    <section
      id={id}
      className={cn(
        'w-full relative isolate overflow-hidden transition-colors flex flex-col',
        bgClass,
        spacingClass,
        heightClass,
        accentClass,
        className,
      )}
    >
      {/* Layer 1: Background Image (z-0) */}
      {bgImageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={bgImageUrl}
            alt={bgImageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
        </div>
      )}

      {/* Layer 2: Overlay (z-10) */}
      {hasOverlay && (
        <div
          className={cn('absolute inset-0 z-10 pointer-events-none backdrop-blur-[1px]', overlayClass)}
          aria-hidden="true"
        />
      )}

      {/* Layer 3: Content (relative z-20) */}
      <div className={cn('relative z-20 w-full flex flex-col flex-1', verticalAlignClass)}>
        <AnimateIn animation={animation}>
          {enableContainer ? (
            <Container width={width} className={containerClassName}>
              {children}
            </Container>
          ) : (
            children
          )}
        </AnimateIn>
      </div>
    </section>
  )
}
