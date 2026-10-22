import React from 'react'
import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import { CMSLink } from '@/components/Link'
import { Check } from 'lucide-react'

export interface PricingBlockProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: any
  plans?: {
    highlighted?: boolean | null
    name: string
    badge?: string | null
    price: string
    period?: string | null
    description?: string | null
    features?: { feature: string; id?: string | null }[] | null
    link?: any
    id?: string | null
  }[] | null
}

export const PricingBlock: React.FC<PricingBlockProps> = (props) => {
  const { sectionHeader, sectionStyle, plans } = props

  return (
    <SectionWrapper sectionStyle={sectionStyle}>
      <SectionHeader
        title={sectionHeader?.title}
        description={sectionHeader?.description}
        alignment={sectionHeader?.alignment}
      />

      {Array.isArray(plans) && plans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => {
            const isFeatured = Boolean(plan.highlighted)

            return (
              <div
                key={plan.id || idx}
                className={cn(
                  'flex flex-col p-8 sm:p-10 rounded-3xl transition-all duration-300 relative border',
                  isFeatured
                    ? 'border-primary shadow-xl bg-card scale-105 z-10 ring-2 ring-primary/20'
                    : 'border-border shadow-sm bg-card/60 hover:bg-card hover:shadow-md',
                )}
              >
                {isFeatured && plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-primary text-primary-foreground shadow">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold font-heading mb-2">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm font-medium text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>

                {Array.isArray(plan.features) && plan.features.length > 0 && (
                  <ul className="space-y-3.5 flex-1 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={feat.id || fIdx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-sm text-foreground/90 font-medium">
                          {feat.feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {plan.link && (
                  <div className="pt-2">
                    <CMSLink
                      {...plan.link}
                      appearance={isFeatured ? 'default' : 'outline'}
                      size="lg"
                      className="w-full justify-center"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </SectionWrapper>
  )
}
