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

export interface FAQAccordionProps {
  items: FAQItem[]
  style?: 'card' | 'line' | 'plain' | null
  layout?: 'one-column' | 'two-columns' | 'image-left' | 'image-right' | null
  allowMultipleOpen?: boolean | null
  firstOpen?: boolean | null
  accentColor?: 'primary' | 'secondary' | 'foreground' | null
}

const accentTextClasses: Record<string, string> = {
  primary: 'text-primary group-hover:text-primary',
  secondary: 'text-secondary-foreground group-hover:text-secondary-foreground',
  foreground: 'text-foreground group-hover:text-foreground',
}

const accentIconClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/40 text-secondary-foreground',
  foreground: 'bg-foreground/10 text-foreground',
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  style = 'line',
  layout = 'one-column',
  allowMultipleOpen = false,
  firstOpen = true,
  accentColor = 'primary',
}) => {
  // Store open state either as an array of indices or single index
  const [openIndices, setOpenIndices] = useState<number[]>(() => {
    return firstOpen && items.length > 0 ? [0] : []
  })

  const toggle = (idx: number) => {
    if (allowMultipleOpen) {
      setOpenIndices((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
      )
    } else {
      setOpenIndices((prev) => (prev.includes(idx) ? [] : [idx]))
    }
  }

  const accentText = accentTextClasses[accentColor || 'primary'] || accentTextClasses.primary
  const accentIcon = accentIconClasses[accentColor || 'primary'] || accentIconClasses.primary

  const renderItem = (item: FAQItem, idx: number) => {
    const isOpen = openIndices.includes(idx)
    const itemId = item.id || `faq-item-${idx}`
    const contentId = `faq-content-${idx}`

    const itemWrapperClasses = cn(
      'transition-colors duration-200',
      style === 'line' && 'py-4 sm:py-6 border-b border-border first:border-t',
      style === 'card' &&
        'p-5 sm:p-6 mb-4 rounded-[var(--radius)] border border-border bg-card shadow-sm',
      style === 'plain' && 'py-4 sm:py-5',
    )

    return (
      <div key={itemId} className={itemWrapperClasses}>
        <button
          type="button"
          id={itemId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => toggle(idx)}
          className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1"
        >
          <span
            className={cn(
              'text-lg sm:text-xl font-bold font-heading text-foreground transition-colors leading-snug',
              isOpen && accentText,
            )}
          >
            {item.question}
          </span>
          <span
            className={cn(
              'shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground transition-all duration-300',
              isOpen ? cn('rotate-180', accentIcon) : 'group-hover:bg-muted/80',
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
  }

  // Two-column independent stacks
  if (layout === 'two-columns') {
    const midpoint = Math.ceil(items.length / 2)
    const firstCol = items.slice(0, midpoint)
    const secondCol = items.slice(midpoint)

    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
        <div className="flex flex-col">
          {firstCol.map((item, idx) => renderItem(item, idx))}
        </div>
        <div className="flex flex-col">
          {secondCol.map((item, idx) => renderItem(item, midpoint + idx))}
        </div>
      </div>
    )
  }

  // Single column or side-image column
  return (
    <div
      className={cn(
        'w-full',
        layout === 'one-column' && 'max-w-3xl mx-auto',
      )}
    >
      {items.map((item, idx) => renderItem(item, idx))}
    </div>
  )
}
