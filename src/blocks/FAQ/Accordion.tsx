'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

export interface FAQItem {
  id?: string | null
  question: string
  answer: any
}

export const FAQAccordion: React.FC<{ items: FAQItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="w-full max-w-3xl mx-auto divide-y divide-border border-y border-border">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        const itemId = item.id || `faq-item-${idx}`
        const contentId = `faq-content-${idx}`

        return (
          <div key={itemId} className="py-4 sm:py-6">
            <button
              type="button"
              id={itemId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1"
            >
              <span className="text-lg sm:text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                {item.question}
              </span>
              <span
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-transform duration-300',
                  isOpen && 'rotate-180 bg-primary/10 text-primary',
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            <div
              id={contentId}
              role="region"
              aria-labelledby={itemId}
              className={cn(
                'grid transition-all duration-300 ease-in-out',
                isOpen ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0 overflow-hidden',
              )}
            >
              <div className="overflow-hidden">
                <div className="prose dark:prose-invert max-w-none text-muted-foreground text-base leading-relaxed">
                  <RichText data={item.answer} enableGutter={false} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
