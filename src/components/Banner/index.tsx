import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { Container } from '@/components/Container'
import { ActionButton } from '@/components/ActionButton'
import { getCachedGlobal } from '@/utilities/getGlobals'
import RichText from '@/components/RichText'
import { renderHighlightedText } from '@/utilities/highlightText'
import type { Media as MediaType } from '@/payload-types'

export interface BannerProps {
  id?: string
  eyebrow?: string | null
  title?: string | null
  pageTitle?: string | null
  description?: string | null
  titleSize?: 'small' | 'medium' | 'large' | 'extra-large' | null
  descriptionSize?: 'small' | 'medium' | 'large' | null
  highlightWords?: string | null
  highlightColor?: string | null
  customHighlightColor?: string | null
  textWidth?: 'narrow' | 'medium' | 'wide' | null
  textAlign?: 'left' | 'center' | 'right' | null
  buttonsAlign?: 'follow-text' | 'left' | 'center' | 'right' | null
  verticalAlign?: 'top' | 'center' | 'bottom' | null
  height?:
    | 'fit'
    | 'compact'
    | 'medium'
    | 'tall'
    | 'screen'
    | 'screen-below-header'
    | 'image'
    | null
  mobileHeight?:
    | 'same-as-desktop'
    | 'fit'
    | 'compact'
    | 'medium'
    | 'tall'
    | 'screen'
    | 'screen-below-header'
    | null
  image?: string | MediaType | null
  mobileImage?: string | MediaType | null
  isDecorative?: boolean | null
  imageMode?: 'background' | 'side' | 'below' | 'none' | null
  imagePosition?: 'left' | 'right' | null
  imageFit?: 'cover' | 'contain' | 'natural' | null
  focalPoint?:
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | null
  overlay?: 'none' | 'light' | 'dark' | 'primary' | null
  overlayStrength?: 'low' | 'medium' | 'high' | null
  textTone?: 'auto' | 'light' | 'dark' | null
  textColor?: 'default' | 'light' | 'dark' | 'primary' | 'secondary' | 'muted' | 'custom' | null
  customTextColor?: string | null
  buttons?: any[] | null
  headingLevel?: 'h1' | 'h2'
  isPageHero?: boolean
  className?: string

  // Legacy fallback props
  richText?: any
  media?: any
  links?: any[]
}

// 1. Static Typography & Sizing Maps
const titleSizeClasses: Record<string, string> = {
  small: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight',
  medium: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]',
  large: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]',
  'extra-large':
    'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[1.05]',
}

const descriptionSizeClasses: Record<string, string> = {
  small: 'text-sm sm:text-base md:text-lg leading-relaxed',
  medium: 'text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed',
  large: 'text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed',
}

const textWidthClasses: Record<string, string> = {
  narrow: 'max-w-xl',
  medium: 'max-w-3xl',
  wide: 'max-w-5xl',
}

// 2. Alignment Maps
const textAlignClasses: Record<string, string> = {
  left: 'text-left items-start mr-auto',
  center: 'text-center items-center mx-auto',
  right: 'text-right items-end ml-auto',
}

const buttonsAlignClasses: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

const verticalAlignClasses: Record<string, string> = {
  top: 'justify-start',
  center: 'justify-center',
  bottom: 'justify-end',
}

// 3. Height Maps (Minimum heights prevent content clipping)
const heightClasses: Record<string, string> = {
  fit: 'min-h-0',
  compact: 'min-h-[30svh]',
  medium: 'min-h-[50svh]',
  tall: 'min-h-[75svh]',
  screen: 'min-h-svh',
  'screen-below-header': 'min-h-[calc(100svh-var(--header-height,4.5rem))]',
  image: 'min-h-0',
}

// 4. Object Position / Focal Point Maps
const focalPointClasses: Record<string, string> = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
  'top-left': 'object-left-top',
  'top-right': 'object-right-top',
  'bottom-left': 'object-left-bottom',
  'bottom-right': 'object-right-bottom',
}

// 5. Overlay Maps
const overlayClasses: Record<string, string> = {
  'light-low': 'bg-background/40',
  'light-medium': 'bg-background/80',
  'light-high': 'bg-background/95',
  'dark-low': 'bg-foreground/40',
  'dark-medium': 'bg-foreground/60',
  'dark-high': 'bg-foreground/80',
  'primary-low': 'bg-primary/30',
  'primary-medium': 'bg-primary/50',
  'primary-high': 'bg-primary/80',
}

export const Banner: React.FC<BannerProps> = async (props) => {
  const {
    id,
    eyebrow,
    title,
    pageTitle,
    description,
    titleSize = 'large',
    descriptionSize = 'medium',
    highlightWords,
    highlightColor,
    customHighlightColor,
    textWidth = 'medium',
    textAlign = 'center',
    buttonsAlign = 'follow-text',
    verticalAlign = 'center',
    height = 'fit',
    image,
    mobileImage,
    isDecorative = false,
    imageMode = 'background',
    imagePosition = 'right',
    imageFit = 'cover',
    focalPoint = 'center',
    overlay = 'none',
    overlayStrength = 'medium',
    textTone = 'auto',
    textColor = 'default',
    customTextColor,
    buttons,
    headingLevel = 'h1',
    isPageHero = true,
    className,
    richText,
    media: legacyMedia,
    links: legacyLinks,
  } = props

  // Check header global to determine if transparent header is active
  let isTransparentOnTop = false
  if (isPageHero) {
    try {
      const header = await getCachedGlobal('header', 1)()
      isTransparentOnTop = Boolean(header?.layout?.transparentOnTop)
    } catch {
      isTransparentOnTop = false
    }
  }

  // Resolve media objects
  const activeImage = image || legacyMedia
  const mediaObj = typeof activeImage === 'object' && activeImage !== null ? (activeImage as MediaType) : null
  const imageUrl = mediaObj?.url || (typeof activeImage === 'string' ? activeImage : null)
  const imageAlt = isDecorative ? '' : mediaObj?.alt || 'Banner visual'
  const imageWidth = mediaObj?.width || 1920
  const imageHeight = mediaObj?.height || 1080

  const mobileMediaObj =
    typeof mobileImage === 'object' && mobileImage !== null ? (mobileImage as MediaType) : null
  const mobileImageUrl = mobileMediaObj?.url || (typeof mobileImage === 'string' ? mobileImage : null)

  // Title fallback
  const displayTitle = title || pageTitle || ''
  const HeadingTag = headingLevel

  // Alignments
  const activeAlign = textAlign || 'center'
  const alignClass = textAlignClasses[activeAlign] || textAlignClasses.center
  const btnAlignKey = buttonsAlign === 'follow-text' ? activeAlign : buttonsAlign || 'center'
  const btnAlignClass = buttonsAlignClasses[btnAlignKey] || buttonsAlignClasses.center
  const vAlignClass = verticalAlignClasses[verticalAlign || 'center'] || verticalAlignClasses.center

  // Overlay calculation
  const hasOverlay = overlay && overlay !== 'none'
  const overlayKey = hasOverlay ? `${overlay}-${overlayStrength || 'medium'}` : ''
  const overlayClass = overlayClasses[overlayKey] || ''

  // Text tone & color calculation
  let isLightTone = textTone === 'light'
  if (textTone === 'auto') {
    if (imageMode === 'background' && imageUrl && (overlay === 'dark' || overlay === 'primary')) {
      isLightTone = true
    } else if (overlay === 'dark' || overlay === 'primary') {
      isLightTone = true
    } else {
      isLightTone = false
    }
  }

  let titleToneClass = isLightTone ? 'text-white drop-shadow-sm' : 'text-foreground'
  let descToneClass = isLightTone ? 'text-white/85' : 'text-muted-foreground'
  let eyebrowToneClass = isLightTone ? 'text-white/80 bg-white/10' : 'text-primary bg-primary/10'

  if (textColor === 'light') {
    titleToneClass = 'text-white drop-shadow-sm'
    descToneClass = 'text-white/90'
    eyebrowToneClass = 'text-white/80 bg-white/10'
  } else if (textColor === 'dark') {
    titleToneClass = 'text-slate-950'
    descToneClass = 'text-slate-700'
    eyebrowToneClass = 'text-slate-900 bg-slate-900/10'
  } else if (textColor === 'primary') {
    titleToneClass = 'text-primary'
    descToneClass = 'text-primary/85'
    eyebrowToneClass = 'text-primary bg-primary/10'
  } else if (textColor === 'secondary') {
    titleToneClass = 'text-secondary-foreground'
    descToneClass = 'text-secondary-foreground/85'
    eyebrowToneClass = 'text-secondary-foreground bg-secondary/20'
  } else if (textColor === 'muted') {
    titleToneClass = 'text-muted-foreground'
    descToneClass = 'text-muted-foreground'
    eyebrowToneClass = 'text-muted-foreground bg-muted'
  } else if (textColor === 'custom') {
    titleToneClass = 'text-[inherit]'
    descToneClass = 'text-[inherit] opacity-85'
    eyebrowToneClass = 'text-[inherit] bg-foreground/10'
  }

  const customTextStyle: React.CSSProperties =
    textColor === 'custom' && customTextColor ? { color: customTextColor } : {}

  // Natural aspect ratio calculation for natural fit
  const naturalAspectRatio =
    imageFit === 'natural' && imageWidth && imageHeight ? `${imageWidth} / ${imageHeight}` : undefined

  // Safe padding when header is transparent
  const headerPaddingClass =
    isPageHero && isTransparentOnTop ? 'pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24' : 'py-12 md:py-20 lg:py-24'

  const activeHeightClass = heightClasses[height || 'fit'] || heightClasses.fit
  const focalClass = focalPointClasses[focalPoint || 'center'] || focalPointClasses.center

  // Buttons list normalization (supports new buttons array or legacy links)
  const buttonList =
    Array.isArray(buttons) && buttons.length > 0
      ? buttons
      : Array.isArray(legacyLinks) && legacyLinks.length > 0
      ? legacyLinks
      : []

  const isSplitSide = imageMode === 'side' && Boolean(imageUrl)
  const isImageBelow = imageMode === 'below' && Boolean(imageUrl)
  const isBackground = imageMode === 'background' && Boolean(imageUrl)

  return (
    <section
      id={id}
      style={{
        ...customTextStyle,
        ...(naturalAspectRatio ? { aspectRatio: naturalAspectRatio } : {}),
      }}
      className={cn(
        'w-full relative isolate overflow-hidden flex flex-col justify-center transition-colors',
        activeHeightClass,
        headerPaddingClass,
        className,
      )}
    >
      {/* ======================================================== */}
      {/* Background Image Layer (Cover, Contain, or Natural)       */}
      {/* ======================================================== */}
      {isBackground && imageUrl && (
        <div
          className={cn(
            'absolute inset-0 z-0 pointer-events-none select-none',
            imageFit === 'contain' && 'bg-muted/40',
          )}
        >
          {/* Desktop Image */}
          <div className={cn('absolute inset-0', mobileImageUrl && 'hidden md:block')}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority={isPageHero}
              quality={75}
              sizes="100vw"
              className={cn(imageFit === 'contain' ? 'object-contain' : 'object-cover', focalClass)}
            />
          </div>

          {/* Mobile Image (under md breakpoint if configured) */}
          {mobileImageUrl && (
            <div className="block md:hidden absolute inset-0">
              <Image
                src={mobileImageUrl}
                alt={imageAlt}
                fill
                priority={isPageHero}
                quality={75}
                sizes="100vw"
                className={cn('object-cover', focalClass)}
              />
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* Overlay Layer (Uses theme tokens with opacity)           */}
      {/* ======================================================== */}
      {hasOverlay && (
        <div
          className={cn('absolute inset-0 z-10 pointer-events-none backdrop-blur-[1px]', overlayClass)}
          aria-hidden="true"
        />
      )}

      {/* ======================================================== */}
      {/* Content Container (Layer z-20)                           */}
      {/* ======================================================== */}
      <div className={cn('relative z-20 w-full flex flex-col flex-1', vAlignClass)}>
        <Container width="contained">
          {isSplitSide ? (
            /* Split layout: Text on left or right, image on opposing side */
            <div
              className={cn(
                'flex flex-col lg:flex-row items-center gap-10 md:gap-14 lg:gap-16 w-full',
                imagePosition === 'left' ? 'lg:flex-row-reverse' : '',
              )}
            >
              {/* Text Column */}
              <div className={cn('w-full lg:w-1/2 flex-1 flex flex-col', alignClass)}>
                {eyebrow && (
                  <span
                    className={cn(
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 w-fit',
                      eyebrowToneClass,
                    )}
                  >
                    {eyebrow}
                  </span>
                )}

                {displayTitle && (
                  <HeadingTag className={cn(titleSizeClasses[titleSize || 'large'], titleToneClass, 'mb-6')}>
                    {renderHighlightedText(displayTitle, highlightWords, highlightColor, customHighlightColor)}
                  </HeadingTag>
                )}

                {description && (
                  <p
                    className={cn(
                      descriptionSizeClasses[descriptionSize || 'medium'],
                      descToneClass,
                      textWidthClasses[textWidth || 'medium'],
                      'mb-8',
                    )}
                  >
                    {description}
                  </p>
                )}

                {richText && !displayTitle && !description && (
                  <div className="mb-8">
                    <RichText data={richText} enableGutter={false} />
                  </div>
                )}

                {buttonList.length > 0 && (
                  <div className={cn('flex flex-wrap gap-4 items-center w-full', btnAlignClass)}>
                    {buttonList.map((item: any, idx: number) => {
                      const actionData = item.actionData || item
                      return (
                        <ActionButton
                          key={item.id || idx}
                          actionData={actionData}
                          action={actionData?.action || item.action}
                          form={actionData?.form || item.form}
                          popupContent={actionData?.popupContent || item.popupContent}
                          phone={actionData?.phone || item.phone}
                          whatsappMessage={actionData?.whatsappMessage || item.whatsappMessage}
                          file={actionData?.file || item.file}
                          link={actionData?.link || item.link}
                          label={item.label || actionData?.label || item.link?.label || 'Learn More'}
                          style={item.style || actionData?.style || 'solid'}
                          buttonBg={item.buttonBg || actionData?.buttonBg}
                          customButtonBg={item.customButtonBg || actionData?.customButtonBg}
                          buttonTextColor={item.buttonTextColor || actionData?.buttonTextColor}
                          customButtonTextColor={item.customButtonTextColor || actionData?.customButtonTextColor}
                          size={item.size === 'small' ? 'sm' : item.size === 'large' ? 'lg' : 'md'}
                          icon={item.icon || (actionData?.showArrow ? 'arrow-right' : 'none')}
                          className="min-h-[44px]"
                        />
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Side Image Column */}
              <div className="w-full lg:w-1/2 flex-1">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted">
                  <Image
                    src={imageUrl!}
                    alt={imageAlt}
                    fill
                    priority={isPageHero}
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className={cn('object-cover', focalClass)}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Centered / Full-width layout (Background or Below or None) */
            <div className={cn('flex flex-col w-full', alignClass)}>
              {eyebrow && (
                <span
                  className={cn(
                    'inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 w-fit',
                    eyebrowToneClass,
                  )}
                >
                  {eyebrow}
                </span>
              )}

              {displayTitle && (
                <HeadingTag
                  className={cn(
                    titleSizeClasses[titleSize || 'large'],
                    titleToneClass,
                    textWidthClasses[textWidth || 'medium'],
                    'mb-6',
                  )}
                >
                  {renderHighlightedText(displayTitle, highlightWords, highlightColor, customHighlightColor)}
                </HeadingTag>
              )}

              {description && (
                <p
                  className={cn(
                    descriptionSizeClasses[descriptionSize || 'medium'],
                    descToneClass,
                    textWidthClasses[textWidth || 'medium'],
                    'mb-8 md:mb-10',
                  )}
                >
                  {description}
                </p>
              )}

              {richText && !displayTitle && !description && (
                <div className="mb-8 max-w-3xl">
                  <RichText data={richText} enableGutter={false} />
                </div>
              )}

              {buttonList.length > 0 && (
                <div className={cn('flex flex-wrap gap-4 items-center w-full mb-8', btnAlignClass)}>
                  {buttonList.map((item: any, idx: number) => {
                    const actionData = item.actionData || item
                    return (
                      <ActionButton
                        key={item.id || idx}
                        actionData={actionData}
                        action={actionData?.action || item.action}
                        form={actionData?.form || item.form}
                        popupContent={actionData?.popupContent || item.popupContent}
                        phone={actionData?.phone || item.phone}
                        whatsappMessage={actionData?.whatsappMessage || item.whatsappMessage}
                        file={actionData?.file || item.file}
                        link={actionData?.link || item.link}
                        label={item.label || actionData?.label || item.link?.label || 'Learn More'}
                        style={item.style || actionData?.style || 'solid'}
                        buttonBg={item.buttonBg || actionData?.buttonBg}
                        customButtonBg={item.customButtonBg || actionData?.customButtonBg}
                        buttonTextColor={item.buttonTextColor || actionData?.buttonTextColor}
                        customButtonTextColor={item.customButtonTextColor || actionData?.customButtonTextColor}
                        size={item.size === 'small' ? 'sm' : item.size === 'large' ? 'lg' : 'md'}
                        icon={item.icon || (actionData?.showArrow ? 'arrow-right' : 'none')}
                        className="min-h-[44px]"
                      />
                    )
                  })}
                </div>
              )}

              {/* Image Below Mode */}
              {isImageBelow && imageUrl && (
                <div className="w-full relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted mt-6 max-w-5xl">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    priority={isPageHero}
                    quality={75}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className={cn('object-cover', focalClass)}
                  />
                </div>
              )}
            </div>
          )}
        </Container>
      </div>
    </section>
  )
}
