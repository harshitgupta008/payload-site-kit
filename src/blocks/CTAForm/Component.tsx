import React from 'react'
import Image from 'next/image'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import { DynamicForm } from '@/components/DynamicForm'
import { renderHighlightedText } from '@/utilities/highlightText'
import { titleColorClasses, descColorClasses } from '@/utilities/colorOptions'
import type { SectionHeaderType } from '@/fields/sectionHeader'
import type { Media } from '@/payload-types'
import { cn } from '@/utilities/ui'

export interface CTAFormBlockProps {
  id?: string
  blockName?: string
  blockType?: 'ctaForm'
  sectionHeader?: SectionHeaderType | null
  sectionStyle?: any
  form: FormType | string
  layout?: 'text-left-form-right' | 'form-left-text-right' | 'centered' | null
  image?: string | Media | null
  note?: string | null
}

export const CTAFormBlock: React.FC<CTAFormBlockProps> = (props) => {
  const {
    sectionHeader,
    sectionStyle,
    form,
    layout = 'text-left-form-right',
    image,
    note,
  } = props

  const isCentered = layout === 'centered'
  const isFormLeft = layout === 'form-left-text-right'

  const mediaObj = typeof image === 'object' && image !== null ? (image as Media) : null
  const imageUrl = mediaObj?.url || (typeof image === 'string' ? image : null)
  const imageAlt = mediaObj?.alt || sectionHeader?.title || 'CTA Visual'

  if (isCentered) {
    return (
      <SectionWrapper sectionStyle={sectionStyle} className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <SectionHeader
            sectionHeader={sectionHeader}
            title={sectionHeader?.title}
            description={sectionHeader?.description}
            alignment="center"
          />

          {imageUrl && (
            <div className="w-full relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-border bg-muted mb-8">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          <div className="w-full bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm text-left">
            <DynamicForm form={form} fieldLayout="two-column" />
            {note && (
              <p className="mt-4 text-xs text-muted-foreground text-center">{note}</p>
            )}
          </div>
        </div>
      </SectionWrapper>
    )
  }

  const titleColClass =
    sectionHeader?.titleColor && sectionHeader.titleColor !== 'default' && sectionHeader.titleColor !== 'custom'
      ? titleColorClasses[sectionHeader.titleColor] || ''
      : ''
  const titleStyle: React.CSSProperties | undefined =
    sectionHeader?.titleColor === 'custom' && sectionHeader?.customTitleColor
      ? { color: sectionHeader.customTitleColor }
      : undefined

  const descColClass =
    sectionHeader?.descriptionColor && sectionHeader.descriptionColor !== 'default' && sectionHeader.descriptionColor !== 'custom'
      ? descColorClasses[sectionHeader.descriptionColor] || 'text-muted-foreground'
      : 'text-muted-foreground'
  const descStyle: React.CSSProperties | undefined =
    sectionHeader?.descriptionColor === 'custom' && sectionHeader?.customDescriptionColor
      ? { color: sectionHeader.customDescriptionColor }
      : undefined

  return (
    <SectionWrapper sectionStyle={sectionStyle} className="py-12 md:py-20">
      <div
        className={cn(
          'flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-6xl mx-auto w-full',
          isFormLeft && 'lg:flex-row-reverse',
        )}
      >
        {/* Text & Visual Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          {sectionHeader?.title && (
            <h2
              style={titleStyle}
              className={cn('text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight mb-4', titleColClass)}
            >
              {renderHighlightedText(
                sectionHeader.title,
                sectionHeader.highlightWords,
                sectionHeader.highlightColor,
                sectionHeader.customHighlightColor,
              )}
            </h2>
          )}
          {sectionHeader?.description && (
            <p style={descStyle} className={cn('text-base sm:text-lg leading-relaxed mb-6', descColClass)}>
              {sectionHeader.description}
            </p>
          )}

          {imageUrl && (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-border bg-muted mt-2">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Form Column */}
        <div className="w-full lg:w-1/2">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
            <DynamicForm form={form} fieldLayout="two-column" />
            {note && (
              <p className="mt-4 text-xs text-muted-foreground text-center">{note}</p>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
