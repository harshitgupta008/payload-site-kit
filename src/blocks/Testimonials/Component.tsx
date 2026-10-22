import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import { Quote } from 'lucide-react'
import type { Media } from '@/payload-types'

export interface TestimonialsBlockProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: any
  layout?: 'grid' | 'single' | null
  items?: {
    quote: string
    name: string
    role?: string | null
    photo?: string | Media | null
    id?: string | null
  }[] | null
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
  const { sectionHeader, sectionStyle, layout = 'grid', items } = props

  const isSingle = layout === 'single'

  return (
    <SectionWrapper sectionStyle={sectionStyle}>
      <SectionHeader
        title={sectionHeader?.title}
        description={sectionHeader?.description}
        alignment={sectionHeader?.alignment}
      />

      {Array.isArray(items) && items.length > 0 && (
        isSingle ? (
          <div className="max-w-4xl mx-auto p-8 sm:p-12 md:p-16 rounded-3xl bg-card border border-border shadow-md flex flex-col items-center text-center relative">
            <Quote className="w-12 h-12 text-primary/20 mb-6" />
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-8 italic">
              "{items[0].quote}"
            </p>
            <div className="flex items-center gap-4">
              {items[0].photo && (
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 bg-muted">
                  <Image
                    src={
                      typeof items[0].photo === 'object' && items[0].photo?.url
                        ? items[0].photo.url
                        : String(items[0].photo)
                    }
                    alt={items[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-left">
                <h4 className="font-bold font-heading text-lg text-foreground">{items[0].name}</h4>
                {items[0].role && <p className="text-sm text-muted-foreground">{items[0].role}</p>}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item, idx) => {
              const photoUrl =
                typeof item.photo === 'object' && item.photo !== null && item.photo.url
                  ? item.photo.url
                  : typeof item.photo === 'string'
                  ? item.photo
                  : null

              return (
                <div
                  key={item.id || idx}
                  className="flex flex-col p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  <p className="text-foreground/90 text-base leading-relaxed flex-1 mb-6 italic">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    {photoUrl && (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border bg-muted flex-shrink-0">
                        <Image src={photoUrl} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold font-heading text-base text-foreground">
                        {item.name}
                      </h4>
                      {item.role && <p className="text-xs text-muted-foreground">{item.role}</p>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      )}
    </SectionWrapper>
  )
}
