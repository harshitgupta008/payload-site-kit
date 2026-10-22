import React from 'react'
import { SectionWrapper } from '@/components/Section/SectionWrapper'
import { SectionHeader } from '@/components/Section/SectionHeader'
import { FAQAccordion, type FAQItem } from './Accordion'

export interface FAQBlockProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: any
  items?: FAQItem[] | null
}

export const FAQBlock: React.FC<FAQBlockProps> = (props) => {
  const { sectionHeader, sectionStyle, items } = props

  return (
    <SectionWrapper sectionStyle={sectionStyle}>
      <SectionHeader
        title={sectionHeader?.title}
        description={sectionHeader?.description}
        alignment={sectionHeader?.alignment}
      />

      {Array.isArray(items) && items.length > 0 && <FAQAccordion items={items} />}
    </SectionWrapper>
  )
}
