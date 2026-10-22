'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Download, Phone, MessageSquare } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import type { Media } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

// Dynamically load the Modal so form JS only loads when clicked
const FormModal = dynamic(
  () => import('@/components/Modal/FormModal').then((mod) => mod.FormModal),
  { ssr: false },
)

export interface ActionButtonProps {
  actionData?: {
    action?: 'link' | 'popupForm' | 'popupContent' | 'tel' | 'whatsapp' | 'download' | null
    link?: any
    form?: any
    popupContent?: any
    phone?: string | null
    whatsappMessage?: string | null
    file?: string | Media | null
  } | null
  action?: 'link' | 'popupForm' | 'popupContent' | 'tel' | 'whatsapp' | 'download' | null
  link?: any
  form?: any
  popupContent?: any
  phone?: string | null
  whatsappMessage?: string | null
  file?: string | Media | null

  label?: string | null
  children?: React.ReactNode
  style?: 'solid' | 'outline' | 'ghost' | 'default' | null
  appearance?: 'default' | 'outline' | 'ghost' | 'link' | null
  size?: 'sm' | 'md' | 'lg' | 'default' | null
  icon?: 'none' | 'arrow-right' | 'arrow-circle' | null
  showArrow?: boolean | null
  className?: string
  onClick?: () => void
}

const styleClasses: Record<string, string> = {
  solid: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border border-transparent',
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border border-transparent',
  outline: 'border border-primary text-primary hover:bg-primary/10 shadow-sm bg-transparent',
  ghost: 'text-foreground hover:bg-muted bg-transparent border border-transparent',
  link: 'text-primary underline-offset-4 hover:underline p-0 h-auto bg-transparent border-0',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 text-sm min-h-[40px]',
  default: 'px-5 py-2.5 text-base min-h-[44px]',
  md: 'px-5 py-2.5 text-base min-h-[44px]',
  lg: 'px-7 py-3.5 text-lg min-h-[48px]',
}

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Merge nested actionData or flat props
  const rawActionData = props.actionData || {}
  const actionType = props.action || rawActionData.action || 'link'
  const linkData = props.link || rawActionData.link
  const formData = props.form || rawActionData.form
  const popupContent = props.popupContent || rawActionData.popupContent
  const phone = props.phone || rawActionData.phone || ''
  const whatsappMsg = props.whatsappMessage || rawActionData.whatsappMessage || ''
  const file = props.file || rawActionData.file

  const styleChoice = props.style || props.appearance || 'solid'
  const sizeChoice = props.size || 'md'
  const iconChoice = props.icon || (props.showArrow ? 'arrow-right' : 'none')

  const baseStyle = cn(
    'inline-flex items-center justify-center font-semibold rounded-[var(--radius)] transition-all duration-150 gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    styleClasses[styleChoice] || styleClasses.solid,
    sizeClasses[sizeChoice] || sizeClasses.md,
    props.className,
  )

  const renderIcon = () => {
    if (iconChoice === 'arrow-right') {
      return <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
    }
    if (iconChoice === 'arrow-circle') {
      return <ArrowUpRight className="w-4 h-4 shrink-0 p-0.5 rounded-full bg-current/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    }
    return null
  }

  const content = props.children || props.label || linkData?.label || 'Learn More'

  // 1. Phone Call Action
  if (actionType === 'tel' && phone) {
    const cleanPhone = phone.replace(/[^\d+]/g, '')
    return (
      <a href={`tel:${cleanPhone}`} className={cn(baseStyle, 'group')} onClick={props.onClick}>
        <Phone className="w-4 h-4 shrink-0" />
        <span>{content}</span>
      </a>
    )
  }

  // 2. WhatsApp Action
  if (actionType === 'whatsapp' && phone) {
    const cleanPhone = phone.replace(/[^\d]/g, '')
    const encoded = whatsappMsg ? `?text=${encodeURIComponent(whatsappMsg)}` : ''
    return (
      <a
        href={`https://wa.me/${cleanPhone}${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyle, 'group')}
        onClick={props.onClick}
      >
        <MessageSquare className="w-4 h-4 shrink-0" />
        <span>{content}</span>
      </a>
    )
  }

  // 3. File Download Action
  if (actionType === 'download' && file) {
    const fileUrl = typeof file === 'object' && file?.url ? file.url : typeof file === 'string' ? file : '#'
    return (
      <a
        href={fileUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyle, 'group')}
        onClick={props.onClick}
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>{content}</span>
      </a>
    )
  }

  // 4. Modal Popup Form or Popup Content
  if (actionType === 'popupForm' || actionType === 'popupContent') {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true)
            props.onClick?.()
          }}
          className={cn(baseStyle, 'group')}
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
        >
          <span>{content}</span>
          {renderIcon()}
        </button>

        {isModalOpen && (
          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            form={formData}
            content={popupContent}
            title={typeof content === 'string' ? content : undefined}
          />
        )}
      </>
    )
  }

  // 5. Standard Link (CMSLink fallback)
  if (linkData) {
    return (
      <CMSLink
        {...linkData}
        className={cn(baseStyle, 'group')}
        size={sizeChoice === 'lg' ? 'lg' : sizeChoice === 'sm' ? 'sm' : 'default'}
      >
        <span>{content}</span>
        {renderIcon()}
      </CMSLink>
    )
  }

  // Fallback button
  return (
    <button type="button" className={cn(baseStyle, 'group')} onClick={props.onClick}>
      <span>{content}</span>
      {renderIcon()}
    </button>
  )
}
