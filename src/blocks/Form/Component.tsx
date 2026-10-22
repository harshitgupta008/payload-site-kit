import React from 'react'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import { DynamicForm } from '@/components/DynamicForm'
import RichText from '@/components/RichText'
import { MapPin, Phone, Mail } from 'lucide-react'
import { cn } from '@/utilities/ui'

export interface FormBlockProps {
  id?: string
  blockName?: string
  blockType?: 'formBlock'
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: any
  form: FormType | string
  fieldLayout?: 'two-column' | 'stacked' | null
  contactInfo?: {
    enableContactInfo?: boolean | null
    contactInfoPosition?: 'left' | 'right' | null
    address?: string | null
    phone?: string | null
    email?: string | null
  } | null
  enableIntro?: boolean | null
  introContent?: any
}

export const FormBlock: React.FC<FormBlockProps> = (props) => {
  const {
    sectionHeader,
    sectionStyle,
    form,
    fieldLayout = 'two-column',
    contactInfo,
    enableIntro,
    introContent,
  } = props

  const hasContactInfo = Boolean(contactInfo?.enableContactInfo)
  const isInfoLeft = contactInfo?.contactInfoPosition === 'left'

  return (
    <SectionWrapper sectionStyle={sectionStyle} className="py-12 md:py-20">
      <SectionHeader
        title={sectionHeader?.title}
        description={sectionHeader?.description}
        alignment={sectionHeader?.alignment}
      />

      {enableIntro && introContent && (
        <div className="max-w-3xl mx-auto mb-8">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}

      {hasContactInfo ? (
        <div
          className={cn(
            'flex flex-col lg:flex-row gap-10 lg:gap-14 items-start max-w-6xl mx-auto w-full',
            isInfoLeft && 'lg:flex-row-reverse',
          )}
        >
          {/* Main Form Column */}
          <div className="w-full lg:w-7/12 flex-1 bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
            <DynamicForm form={form} fieldLayout={fieldLayout || 'two-column'} />
          </div>

          {/* Contact Details Column */}
          <div className="w-full lg:w-5/12 bg-muted/40 border border-border rounded-2xl p-6 sm:p-8 flex flex-col justify-start h-fit">
            <h3 className="text-xl font-bold font-heading mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo?.address && (
                <div className="flex items-start gap-4">
                  <span className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                      Our Location
                    </span>
                    <p className="text-foreground text-sm sm:text-base leading-relaxed">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              )}

              {contactInfo?.phone && (
                <div className="flex items-start gap-4">
                  <span className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                      Phone Number
                    </span>
                    <a
                      href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}
                      className="text-foreground hover:text-primary transition-colors text-sm sm:text-base font-semibold"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo?.email && (
                <div className="flex items-start gap-4">
                  <span className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-foreground hover:text-primary transition-colors text-sm sm:text-base font-semibold"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto w-full bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
          <DynamicForm form={form} fieldLayout={fieldLayout || 'two-column'} />
        </div>
      )}
    </SectionWrapper>
  )
}
