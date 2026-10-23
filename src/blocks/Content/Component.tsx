import { cn } from '@/utilities/ui'
import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import { ActionButton } from '@/components/ActionButton'
import { renderHighlightedText } from '@/utilities/highlightText'
import { titleColorClasses } from '@/utilities/colorOptions'
import type { ContentBlock as ContentBlockProps, Media } from '@/payload-types'

const colSpanClasses: Record<string, string> = {
  full: 'col-span-4 lg:col-span-12',
  half: 'col-span-4 md:col-span-6 lg:col-span-6',
  oneThird: 'col-span-4 md:col-span-6 lg:col-span-4',
  twoThirds: 'col-span-4 md:col-span-6 lg:col-span-8',
}

const aspectClasses: Record<string, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  auto: 'aspect-auto',
}

export const ContentBlock: React.FC<ContentBlockProps & { disableInnerContainer?: boolean }> = (props) => {
  const { columns, sectionHeader, sectionStyle } = props

  const isSingleColumn = columns && columns.length === 1

  const headerElement = sectionHeader?.title || sectionHeader?.description ? (
    <SectionHeader
      sectionHeader={sectionHeader}
      title={sectionHeader?.title}
      description={sectionHeader?.description}
      alignment={sectionHeader?.alignment}
      highlightWords={sectionHeader?.highlightWords}
      highlightColor={sectionHeader?.highlightColor}
      customHighlightColor={sectionHeader?.customHighlightColor}
      titleColor={sectionHeader?.titleColor}
      customTitleColor={sectionHeader?.customTitleColor}
      descriptionColor={sectionHeader?.descriptionColor}
      customDescriptionColor={sectionHeader?.customDescriptionColor}
    />
  ) : null

  return (
    <SectionWrapper sectionStyle={sectionStyle} header={headerElement}>
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-12 md:gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const {
              enableLink,
              link,
              actionData,
              richText,
              size = 'full',
              title,
              highlightWords,
              highlightColor,
              customHighlightColor,
              titleColor,
              customTitleColor,
              image,
              imagePosition = 'right',
              imageAspect = '16:9',
              imageFit = 'cover',
            } = col as any

            const mediaObj = typeof image === 'object' && image !== null ? (image as Media) : null
            const imageUrl = mediaObj?.url || (typeof image === 'string' ? image : null)
            const imageAlt = mediaObj?.alt || title || 'Section visual'
            const hasImage = Boolean(imageUrl)

            const isSplit = hasImage && (imagePosition === 'right' || imagePosition === 'left')
            const isImageTop = hasImage && imagePosition === 'top'
            const isImageBottom = hasImage && imagePosition === 'bottom'
            const aspectClass = aspectClasses[imageAspect || '16:9'] || 'aspect-video'

            const colTitleColorClass =
              titleColor && titleColor !== 'default' && titleColor !== 'custom'
                ? titleColorClasses[titleColor] || ''
                : ''
            const colTitleStyle: React.CSSProperties | undefined =
              titleColor === 'custom' && customTitleColor ? { color: customTitleColor } : undefined

            // If single column or full, span 12; otherwise follow configured size
            const spanClass = isSingleColumn
              ? 'col-span-4 lg:col-span-12'
              : colSpanClasses[size] || colSpanClasses.full

            const renderButton = () => {
              if (!enableLink) return null
              const action = actionData?.action || (link ? 'link' : undefined)
              return (
                <div className="mt-6">
                  <ActionButton
                    actionData={actionData}
                    action={action}
                    form={actionData?.form}
                    popupContent={actionData?.popupContent}
                    phone={actionData?.phone}
                    whatsappMessage={actionData?.whatsappMessage}
                    file={actionData?.file}
                    link={actionData?.link || link}
                    label={actionData?.label || link?.label || 'Learn More'}
                    style={actionData?.style || (link?.appearance === 'outline' ? 'outline' : 'solid')}
                    buttonBg={actionData?.buttonBg}
                    customButtonBg={actionData?.customButtonBg}
                    buttonTextColor={actionData?.buttonTextColor}
                    customButtonTextColor={actionData?.customButtonTextColor}
                    showArrow={Boolean(actionData?.showArrow)}
                  />
                </div>
              )
            }

            return (
              <div className={cn(spanClass, 'w-full')} key={index}>
                {isSplit ? (
                  /* Split Layout: Content on one side, Image on the other (50/50) */
                  <div
                    className={cn(
                      'flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 w-full',
                      imagePosition === 'left' && 'lg:flex-row-reverse',
                    )}
                  >
                    {/* Text Column */}
                    <div className="w-full lg:w-1/2 flex-1 flex flex-col justify-center">
                      {title && (
                        <h3
                          style={colTitleStyle}
                          className={cn(
                            'text-2xl sm:text-3xl font-bold font-heading mb-4 tracking-tight',
                            colTitleColorClass,
                          )}
                        >
                          {renderHighlightedText(title, highlightWords, highlightColor, customHighlightColor)}
                        </h3>
                      )}
                      {richText && <RichText data={richText} enableGutter={false} />}
                      {renderButton()}
                    </div>

                    {/* Image Column */}
                    <div className="w-full lg:w-1/2 flex-1">
                      <div
                        className={cn(
                          'relative w-full rounded-2xl overflow-hidden shadow-xl border border-border bg-muted/40',
                          aspectClass,
                        )}
                      >
                        <Image
                          src={imageUrl!}
                          alt={imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className={cn(imageFit === 'contain' ? 'object-contain' : 'object-cover')}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Column (Text or Top/Bottom Image) */
                  <div className="flex flex-col w-full">
                    {isImageTop && (
                      <div
                        className={cn(
                          'relative w-full rounded-2xl overflow-hidden shadow-md border border-border bg-muted/40 mb-6',
                          aspectClass,
                        )}
                      >
                        <Image
                          src={imageUrl!}
                          alt={imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className={cn(imageFit === 'contain' ? 'object-contain' : 'object-cover')}
                        />
                      </div>
                    )}

                    {title && (
                      <h3
                        style={colTitleStyle}
                        className={cn(
                          'text-xl md:text-2xl font-bold font-heading mb-3 tracking-tight',
                          colTitleColorClass,
                        )}
                      >
                        {renderHighlightedText(title, highlightWords, highlightColor, customHighlightColor)}
                      </h3>
                    )}
                    {richText && <RichText data={richText} enableGutter={false} />}
                    {renderButton()}

                    {isImageBottom && (
                      <div
                        className={cn(
                          'relative w-full rounded-2xl overflow-hidden shadow-md border border-border bg-muted/40 mt-6',
                          aspectClass,
                        )}
                      >
                        <Image
                          src={imageUrl!}
                          alt={imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className={cn(imageFit === 'contain' ? 'object-contain' : 'object-cover')}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </SectionWrapper>
  )
}
