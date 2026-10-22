import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps & { disableInnerContainer?: boolean }> = (props) => {
  const { columns, sectionHeader, sectionStyle } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <SectionWrapper sectionStyle={sectionStyle}>
      <SectionHeader
        title={sectionHeader?.title}
        description={sectionHeader?.description}
        alignment={sectionHeader?.alignment}
      />
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-12 md:gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, title } = col as any

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size as keyof typeof colsSpanClasses] || '12'}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {title && (
                  <h3 className="text-xl md:text-2xl font-bold font-heading mb-3 tracking-tight">
                    {title}
                  </h3>
                )}
                {richText && <RichText data={richText} enableGutter={false} />}
                {enableLink && (
                  <div className="mt-4">
                    <CMSLink {...link} />
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </SectionWrapper>
  )
}
