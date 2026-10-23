'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { DynamicForm } from '@/components/DynamicForm'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

export interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  form?: any
  title?: string | null
  content?: any
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  form,
  title,
  content,
}) => {
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Manage focus and complete scroll lock
  useEffect(() => {
    if (!isOpen) return

    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    previousActiveElement.current = document.activeElement as HTMLElement

    // Completely lock scrolling on both html and body while modal is active
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    // Prevent wheel and touch scrolling on page behind the modal
    const handleWheelOrTouch = (e: WheelEvent | TouchEvent) => {
      if (modalRef.current && modalRef.current.contains(e.target as Node)) {
        return // allow scrolling inside the modal dialog itself
      }
      e.preventDefault()
    }

    window.addEventListener('wheel', handleWheelOrTouch, { passive: false })
    window.addEventListener('touchmove', handleWheelOrTouch, { passive: false })

    // Focus first interactive element or close button
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        focusable?.focus()
      }
    }, 50)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('wheel', handleWheelOrTouch)
      window.removeEventListener('touchmove', handleWheelOrTouch)

      // Always restore scrollbar cleanly on modal close
      document.body.style.removeProperty('overflow')
      document.documentElement.style.removeProperty('overflow')
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (originalBodyOverflow && originalBodyOverflow !== 'hidden') {
        document.body.style.overflow = originalBodyOverflow
      }
      if (originalHtmlOverflow && originalHtmlOverflow !== 'hidden') {
        document.documentElement.style.overflow = originalHtmlOverflow
      }
      // Trigger a window resize event so browsers immediately repaint scrollbars
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'))
      }
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen])

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !mounted) return null

  const formTitle = typeof form === 'object' && form?.title ? form.title : title || 'Contact Us'

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full max-w-xl bg-background border border-border shadow-2xl rounded-2xl overflow-hidden z-10 my-auto flex flex-col',
          'max-sm:fixed max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:rounded-none max-sm:border-0 max-sm:my-0 max-sm:overflow-y-auto',
          'animate-in zoom-in-95 fade-in duration-200',
        )}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border/80 bg-muted/30">
          <h2 id="modal-title" className="text-xl sm:text-2xl font-bold font-heading">
            {formTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto">
          {form && <DynamicForm form={form} isPopup={true} onClose={onClose} />}
          {content && !form && <RichText data={content} />}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
