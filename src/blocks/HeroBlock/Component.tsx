import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { CMSLink } from '@/components/Link'
import { ActionButton } from '@/components/ActionButton'
import type { Media } from '@/payload-types'
import type { SectionStyleType } from '@/fields/sectionStyle'

export interface HeroBlockComponentProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: SectionStyleType | null
  variant?: 'centered' | 'split-left' | 'split-right' | null
  textAlign?: 'left' | 'center' | 'right' | null
  image?: string | Media | null
  links?: { link: any; id?: string | null }[] | null
  hasOldHero?: boolean
}

const textAlignContainerClasses: Record<string, string> = {
  left: 'text-left items-start mr-auto',
  center: 'text-center items-center mx-auto',
  right: 'text-right items-end ml-auto',
}

const buttonAlignClasses: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

export const HeroBlockComponent: React.FC<HeroBlockComponentProps> = (props) => {
  const {
    sectionHeader,
    sectionStyle,
    variant = 'centered',
    textAlign = 'center',
    image,
    links,
    hasOldHero = false,
  } = props

  const mediaObj = typeof image === 'object' && image !== null ? (image as Media) : null
  const imageUrl = mediaObj?.url || (typeof image === 'string' ? image : '')
  const imageAlt = mediaObj?.alt || 'Hero Image'

  // Per specification: A page must never have two h1 tags.
  const HeadingTag = hasOldHero ? 'h2' : 'h1'

  const title = sectionHeader?.title
  const description = sectionHeader?.description

  const isSplitLeft = variant === 'split-left'
  const isSplitRight = variant === 'split-right'
  const isCentered = !isSplitLeft && !isSplitRight

  const activeAlign = textAlign || 'center'
  const alignContainerClass =
    textAlignContainerClasses[activeAlign] || textAlignContainerClasses.center
  const btnAlignClass = buttonAlignClasses[activeAlign] || buttonAlignClasses.center

  return (
    <SectionWrapper sectionStyle={sectionStyle} className="py-12 md:py-20 lg:py-24">
      {isCentered ? (
        <div className={cn('flex flex-col max-w-4xl w-full', alignContainerClass)}>
          {title && (
            <HeadingTag className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight leading-[1.1] mb-6">
              {title}
            </HeadingTag>
          )}

          {description && (
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-8 md:mb-10">
              {description}
            </p>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <div className={cn('flex flex-wrap items-center gap-4 mb-12 w-full', btnAlignClass)}>
              {links.map((item: any, idx) => {
                const actionData = item.actionData || item
                return (
                  <ActionButton
                    key={item.id || idx}
                    size="lg"
                    actionData={actionData}
                    action={actionData?.action || item.action}
                    form={actionData?.form || item.form}
                    popupContent={actionData?.popupContent || item.popupContent}
                    phone={actionData?.phone || item.phone}
                    whatsappMessage={actionData?.whatsappMessage || item.whatsappMessage}
                    file={actionData?.file || item.file}
                    link={actionData?.link || item.link}
                    label={actionData?.label || item.label || item.link?.label || 'Learn More'}
                    appearance={item.link?.appearance}
                    style={actionData?.style || (item.link?.appearance === 'outline' ? 'outline' : 'solid')}
                    showArrow={Boolean(actionData?.showArrow)}
                  />
                )
              })}
            </div>
          )}

          {imageUrl && (
            <div className="w-full relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted mt-4">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority={true}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className={cn(
            'flex flex-col lg:flex-row items-center gap-10 md:gap-14 lg:gap-16 w-full',
            isSplitLeft ? 'lg:flex-row-reverse' : '',
          )}
        >
          {/* Text Column */}
          <div
            className={cn(
              'w-full lg:w-1/2 flex-1 flex flex-col justify-center',
              alignContainerClass,
            )}
          >
            {title && (
              <HeadingTag className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight leading-[1.15] mb-6">
                {title}
              </HeadingTag>
            )}

            {description && (
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                {description}
              </p>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className={cn('flex flex-wrap items-center gap-4', btnAlignClass)}>
                {links.map((item: any, idx) => {
                  const actionData = item.actionData || item
                  return (
                    <ActionButton
                      key={item.id || idx}
                      size="lg"
                      actionData={actionData}
                      action={actionData?.action || item.action}
                      form={actionData?.form || item.form}
                      popupContent={actionData?.popupContent || item.popupContent}
                      phone={actionData?.phone || item.phone}
                      whatsappMessage={actionData?.whatsappMessage || item.whatsappMessage}
                      file={actionData?.file || item.file}
                      link={actionData?.link || item.link}
                      label={actionData?.label || item.label || item.link?.label || 'Learn More'}
                      appearance={item.link?.appearance}
                      style={actionData?.style || (item.link?.appearance === 'outline' ? 'outline' : 'solid')}
                      showArrow={Boolean(actionData?.showArrow)}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* Image Column */}
          {imageUrl && (
            <div className="w-full lg:w-1/2 flex-1">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border bg-muted">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  )
}
