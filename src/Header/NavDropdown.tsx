'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'

export interface NavDropdownProps {
  label: string
  children: {
    label: string
    description?: string | null
    link?: any
    id?: string | null
  }[]
  isUppercase?: boolean
  className?: string
}

export const NavDropdown: React.FC<NavDropdownProps> = ({
  label,
  children,
  isUppercase = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  // Keyboard accessibility: Escape key closes dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      className={cn('relative inline-block text-left', className)}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((prev) => !prev)}
        onFocus={() => setIsOpen(true)}
        className={cn(
          'inline-flex items-center gap-1.5 py-2 text-foreground/80 hover:text-foreground font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md',
          isUppercase && 'uppercase tracking-wider text-xs font-semibold',
          isOpen && 'text-primary',
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-200 text-muted-foreground',
            isOpen && 'rotate-180 text-primary',
          )}
        />
      </button>

      {/* Dropdown Menu Panel */}
      <div
        className={cn(
          'absolute left-0 top-full pt-2 w-64 z-50 transition-all duration-200 ease-out origin-top-left',
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none',
        )}
      >
        <div className="bg-card border border-border rounded-[var(--radius)] shadow-xl p-2 divide-y divide-border/50">
          {children.map((item, idx) => (
            <div key={item.id || idx} className="py-1 first:pt-0 last:pb-0">
              <CMSLink
                {...item.link}
                appearance="link"
                className="w-full flex items-center justify-between p-2.5 rounded-md hover:bg-muted transition-colors group text-left"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="text-xs text-muted-foreground mt-0.5 leading-normal">
                      {item.description}
                    </span>
                  )}
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </CMSLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
