'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronRight, FileText } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import type { Media } from '@/payload-types'

export interface NavDropdownItem {
  id?: string | null
  label: string
  description?: string | null
  icon?: string | Media | null
  link?: any
}

export interface NavDropdownProps {
  label: string
  children: NavDropdownItem[]
  isUppercase?: boolean
  dropdownWidth?: 'auto' | 'narrow' | 'wide' | null
  dropdownStyle?: 'list' | 'cards' | 'mega' | null
  className?: string
}

const widthClasses: Record<'auto' | 'narrow' | 'wide', { default: string; mega: string }> = {
  auto: {
    default: 'w-max min-w-[16rem] max-w-[min(24rem,calc(100vw-2rem))]',
    mega: 'w-max min-w-[32rem] max-w-[min(54rem,calc(100vw-2rem))]',
  },
  narrow: {
    default: 'w-max min-w-[14rem] max-w-[min(18rem,calc(100vw-2rem))]',
    mega: 'w-max min-w-[28rem] max-w-[min(40rem,calc(100vw-2rem))]',
  },
  wide: {
    default: 'w-max min-w-[22rem] max-w-[min(32rem,calc(100vw-2rem))]',
    mega: 'w-max min-w-[38rem] max-w-[min(62rem,calc(100vw-2rem))]',
  },
}

export const NavDropdown: React.FC<NavDropdownProps> = ({
  label,
  children = [],
  isUppercase = false,
  dropdownWidth = 'auto',
  dropdownStyle = 'list',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [alignRight, setAlignRight] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const itemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([])

  const styleMode = dropdownStyle || 'list'
  const widthMode = dropdownWidth || 'auto'
  const isMega = styleMode === 'mega' && children.length >= 3

  const activeWidthClass = isMega
    ? widthClasses[widthMode]?.mega || widthClasses.auto.mega
    : widthClasses[widthMode]?.default || widthClasses.auto.default

  // Evaluate alignment based on trigger position and viewport boundaries
  const updateAlignment = useCallback(() => {
    if (!dropdownRef.current) return
    const rect = dropdownRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const estimatedWidth = isMega ? 580 : 340

    // If extending to the right would push the panel beyond viewport minus 8px padding
    if (rect.left + estimatedWidth > viewportWidth - 8) {
      setAlignRight(true)
    } else {
      setAlignRight(false)
    }
  }, [isMega])

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    updateAlignment()
    setIsOpen(true)
  }

  const closeMenu = (restoreFocus = false) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(false)
    setFocusedIndex(-1)
    if (restoreFocus) {
      triggerRef.current?.focus()
    }
  }

  const handleMouseEnter = () => {
    openMenu()
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      closeMenu()
    }, 150)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openMenu()
        setFocusedIndex(0)
      }
      return
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        closeMenu(true)
        break

      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((prev) => {
          const next = prev < children.length - 1 ? prev + 1 : 0
          itemRefs.current[next]?.focus()
          return next
        })
        break

      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : children.length - 1
          itemRefs.current[next]?.focus()
          return next
        })
        break

      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        itemRefs.current[0]?.focus()
        break

      case 'End':
        e.preventDefault()
        setFocusedIndex(children.length - 1)
        itemRefs.current[children.length - 1]?.focus()
        break

      case 'Tab':
        // Let natural tab happen; if tabbing out of dropdown, close menu
        setTimeout(() => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(document.activeElement)
          ) {
            closeMenu()
          }
        }, 10)
        break

      default:
        break
    }
  }

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    window.addEventListener('resize', updateAlignment)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      window.removeEventListener('resize', updateAlignment)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [updateAlignment])

  // Sync focused element when index changes
  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      className={cn('relative inline-block text-left', className)}
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        className={cn(
          'inline-flex items-center gap-1.5 py-2 text-foreground/80 hover:text-foreground font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md cursor-pointer',
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

      {/* Dropdown Menu Panel with Hover Bridge */}
      <div
        ref={panelRef}
        role="menu"
        aria-orientation="vertical"
        aria-label={label}
        className={cn(
          'absolute top-full z-50 pt-2 transition-all duration-200 ease-out',
          // Hover bridge pseudo-element: prevents pointer from losing hover while moving across the gap
          "before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']",
          alignRight ? 'right-0 left-auto origin-top-right' : 'left-0 right-auto origin-top-left',
          activeWidthClass,
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto visible'
            : 'opacity-0 scale-95 pointer-events-none invisible',
        )}
      >
        <div
          className={cn(
            'bg-popover text-popover-foreground border border-border rounded-xl shadow-2xl overflow-hidden p-2',
            // Mega menu layout: multi-column grid
            isMega && 'grid grid-cols-2 md:grid-cols-3 gap-2 p-3',
            // Cards layout: separated card items
            styleMode === 'cards' && !isMega && 'space-y-1.5 p-2.5',
            // Standard list layout: divide items cleanly
            styleMode === 'list' && 'divide-y divide-border/40',
          )}
        >
          {children.map((item, idx) => {
            const iconObj = typeof item.icon === 'object' && item.icon !== null ? (item.icon as Media) : null
            const iconUrl = iconObj?.url || (typeof item.icon === 'string' ? item.icon : null)
            const iconAlt = iconObj?.alt || item.label

            const isCard = styleMode === 'cards' || isMega

            return (
              <div
                key={item.id || idx}
                role="none"
                className={cn(!isCard && 'py-1 first:pt-0 last:pb-0')}
              >
                <CMSLink
                  {...item.link}
                  appearance="link"
                  ref={(el: any) => {
                    itemRefs.current[idx] = el
                  }}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => closeMenu()}
                  className={cn(
                    'w-full flex items-start justify-between p-3 rounded-lg transition-all text-left group',
                    'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none',
                    isCard && 'bg-card/50 border border-border/50 hover:border-primary/40 hover:shadow-sm',
                  )}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    {/* Optional Item Icon / Image */}
                    {iconUrl ? (
                      <div className="w-8 h-8 rounded-md bg-primary/10 overflow-hidden relative shrink-0 mt-0.5 flex items-center justify-center">
                        <Image
                          src={iconUrl}
                          alt={iconAlt}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      isCard && (
                        <div className="w-8 h-8 rounded-md bg-muted text-muted-foreground overflow-hidden relative shrink-0 mt-0.5 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                      )
                    )}

                    {/* Text Container: break-words, normal white-space, min-w-0, clamp-3 */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors break-words whitespace-normal leading-snug">
                        {item.label}
                      </span>
                      {item.description && (
                        <span
                          title={item.description}
                          className="text-xs text-muted-foreground mt-1 leading-relaxed break-words whitespace-normal line-clamp-3"
                        >
                          {item.description}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2.5 mt-0.5" />
                </CMSLink>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
