'use client'

import React, { useEffect, useRef } from 'react'
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
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Manage focus and scroll lock
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'

      // Focus first interactive element or close button
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          )
          focusable?.focus()
        }
      }, 50)

      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ''
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = ''
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

  if (!isOpen) return null

  const formTitle = typeof form === 'object' && form?.title ? form.title : title || 'Contact Us'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full max-w-xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden z-10 my-auto flex flex-col',
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
}
