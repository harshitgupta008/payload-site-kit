import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { AnimateIn } from './AnimateIn'
import { Container } from '@/components/Container'
import { SectionHeader } from './SectionHeader'
import {
  getSectionHeightClasses,
  verticalAlignClasses,
} from '@/lib/sectionHeight'
import type { SectionStyleType } from '@/fields/sectionStyle'
import type { Media } from '@/payload-types'

export interface SectionWrapperProps {
  sectionStyle?: SectionStyleType | null
  header?: React.ReactNode
  children: React.ReactNode
  className?: string
  containerClassName?: string
  enableContainer?: boolean
  id?: string
}

// Static Tailwind class maps
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

const textColorClasses: Record<string, string> = {
  default: '',
  light:
    'text-white [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_h4]:!text-white [&_p]:!text-white/85 [&_span]:!text-inherit',
  dark:
    'text-slate-950 [&_h1]:!text-slate-950 [&_h2]:!text-slate-950 [&_h3]:!text-slate-950 [&_h4]:!text-slate-950 [&_p]:!text-slate-700 [&_span]:!text-inherit',
  primary:
    'text-primary [&_h1]:!text-primary [&_h2]:!text-primary [&_h3]:!text-primary [&_h4]:!text-primary [&_p]:!text-primary/85',
  secondary:
    'text-secondary-foreground [&_h1]:!text-secondary-foreground [&_h2]:!text-secondary-foreground [&_h3]:!text-secondary-foreground [&_p]:!text-secondary-foreground/85',
  muted:
    'text-muted-foreground [&_h1]:!text-muted-foreground [&_h2]:!text-muted-foreground [&_p]:!text-muted-foreground',
  custom:
    '[&_h1]:!text-[inherit] [&_h2]:!text-[inherit] [&_h3]:!text-[inherit] [&_h4]:!text-[inherit] [&_p]:!text-[inherit]',
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  sectionStyle,
  header,
  children,
  className,
  containerClassName,
  enableContainer = true,
  id,
}) => {
  const bg = sectionStyle?.background || 'none'
  const textColor = sectionStyle?.textColor || 'default'
  const customTextColor = sectionStyle?.customTextColor
  const spacing = sectionStyle?.spacing || 'medium'
  const animation = sectionStyle?.animation || 'none'
  const height = sectionStyle?.height || 'fit'
  const mobileHeight = sectionStyle?.mobileHeight || 'same-as-desktop'
  const verticalAlign = sectionStyle?.contentVerticalAlign || 'center'
  const width = sectionStyle?.width || 'contained'
  const accent = sectionStyle?.accentColor || 'primary'
  const overlay = sectionStyle?.overlay || 'none'

  const bgClass = backgroundClasses[bg] || backgroundClasses.none
  const textColorClass = textColorClasses[textColor] || ''
  const customColorStyle: React.CSSProperties | undefined =
    textColor === 'custom' && customTextColor ? { color: customTextColor } : undefined

  // Spacing: when height is 'fit', spacing controls the padding; when height is taller, keep safe padding (py-8 md:py-12)
  const isFitHeight = !height || height === 'fit'
  const paddingClass = isFitHeight
    ? spacingClasses[spacing] || spacingClasses.medium
    : 'py-8 md:py-12'

  const heightClass = getSectionHeightClasses(height, mobileHeight)
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

  // Side image resolution for section-level split layout
  const sideImageMedia =
    typeof sectionStyle?.sideImage === 'object' && sectionStyle.sideImage !== null
      ? (sectionStyle.sideImage as Media)
      : null
  const sideImageUrl =
    sideImageMedia?.url ||
    (typeof sectionStyle?.sideImage === 'string' ? sectionStyle.sideImage : null)
  const sideImageAlt = sideImageMedia?.alt || 'Section Visual'
  const sideImagePosition = sectionStyle?.sideImagePosition || 'right'
  const sideImageAspect = sectionStyle?.sideImageAspect || '4:3'

  const aspectClasses: Record<string, string> = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    natural: 'aspect-auto min-h-[300px]',
  }
  const sideAspectClass = aspectClasses[sideImageAspect || '4:3'] || 'aspect-[4/3]'

  const hasOverlay = overlay !== 'none' && overlayClass.length > 0

  // Separate SectionHeader from other children if header prop is not explicitly provided
  let extractedHeader: React.ReactNode = header || null
  let activeContent: React.ReactNode = children

  if (!header) {
    const remainingChildren: React.ReactNode[] = []
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        (child.type === SectionHeader ||
          (child.type as any)?.displayName === 'SectionHeader' ||
          (typeof child.type === 'function' &&
            ((child.type as any).displayName === 'SectionHeader' || (child.type as any).name === 'SectionHeader')))
      ) {
        extractedHeader = child
      } else {
        remainingChildren.push(child)
      }
    })
    if (extractedHeader) {
      activeContent = remainingChildren
    }
  }

  const renderContent = (contentToRender: React.ReactNode) => {
    if (!sideImageUrl) return contentToRender

    return (
      <div
        className={cn(
          'flex flex-col lg:flex-row items-center gap-10 md:gap-14 lg:gap-16 w-full',
          sideImagePosition === 'left' && 'lg:flex-row-reverse',
        )}
      >
        {/* Content Column (50%) */}
        <div className="w-full lg:w-1/2 flex-1 flex flex-col justify-center">
          {contentToRender}
        </div>

        {/* Side Image Column (50%) */}
        <div className="w-full lg:w-1/2 flex-1">
          <div
            className={cn(
              'relative w-full rounded-2xl overflow-hidden shadow-xl border border-border bg-muted/40',
              sideAspectClass,
            )}
          >
            <Image
              src={sideImageUrl}
              alt={sideImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      id={id}
      style={customColorStyle}
      className={cn(
        'w-full relative isolate overflow-hidden transition-colors flex flex-col',
        id && 'scroll-mt-[var(--header-height,4.5rem)]',
        bgClass,
        textColorClass,
        paddingClass,
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
              {extractedHeader}
              {renderContent(activeContent)}
            </Container>
          ) : (
            <>
              {extractedHeader}
              {renderContent(activeContent)}
            </>
          )}
        </AnimateIn>
      </div>
    </section>
  )
}
