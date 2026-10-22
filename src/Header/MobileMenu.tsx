'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, ChevronRight, ArrowRight, SearchIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import { ActionButton } from '@/components/ActionButton'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

export interface MobileMenuProps {
  navItems: any[]
  cta?: any
  showSearch?: boolean
  showThemeToggle?: boolean
  isUppercase?: boolean
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  navItems = [],
  cta,
  showSearch = false,
  showThemeToggle = false,
  isUppercase = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([])
  const pathname = usePathname()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const toggleDropdown = (idx: number) => {
    setOpenDropdowns((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    )
  }

  return (
    <div className="lg:hidden flex items-center">
      {/* Hamburger Button (>= 44px touch target) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop & Drawer */}
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-[65px] z-50 flex flex-col bg-background/98 backdrop-blur-lg border-t border-border overflow-y-auto"
        >
          <div ref={drawerRef} className="container mx-auto px-6 py-8 flex flex-col flex-1">
            <nav className="flex flex-col divide-y divide-border/60">
              {navItems.map((item, idx) => {
                const isDropdown = item.type === 'dropdown'
                const isExpanded = openDropdowns.includes(idx)

                if (isDropdown) {
                  return (
                    <div key={idx} className="py-2">
                      <button
                        type="button"
                        onClick={() => toggleDropdown(idx)}
                        aria-expanded={isExpanded}
                        className={cn(
                          'w-full min-h-[44px] flex items-center justify-between text-left font-bold text-lg text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md py-2',
                          isUppercase && 'uppercase tracking-wider text-sm font-bold',
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 text-muted-foreground transition-transform duration-200',
                            isExpanded && 'rotate-180 text-primary',
                          )}
                        />
                      </button>

                      {isExpanded && (
                        <div className="pl-4 pb-2 pt-1 flex flex-col space-y-2 border-l-2 border-primary/30 ml-2 mt-1">
                          {item.children?.map((child: any, cIdx: number) => (
                            <CMSLink
                              key={child.id || cIdx}
                              {...child.link}
                              appearance="link"
                              onClick={() => setIsOpen(false)}
                              className="min-h-[44px] flex items-center justify-between py-2 text-foreground/80 hover:text-foreground font-medium text-base group"
                            >
                              <div className="flex flex-col">
                                <span>{child.label}</span>
                                {child.description && (
                                  <span className="text-xs text-muted-foreground">
                                    {child.description}
                                  </span>
                                )}
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                            </CMSLink>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <div key={idx} className="py-2">
                    <CMSLink
                      {...item.link}
                      appearance="link"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'min-h-[44px] flex items-center font-bold text-lg text-foreground hover:text-primary transition-colors py-2',
                        isUppercase && 'uppercase tracking-wider text-sm font-bold',
                        item.highlight &&
                          'bg-primary text-primary-foreground px-4 rounded-[var(--radius)] my-1 hover:bg-primary/90',
                      )}
                    >
                      {item.label}
                    </CMSLink>
                  </div>
                )
              })}
            </nav>

            {/* Mobile CTA Button */}
            {cta?.enableCTA && (
              <div className="mt-8 pt-4">
                <ActionButton
                  action={cta.action || 'link'}
                  link={cta.link}
                  form={cta.form}
                  phone={cta.phone}
                  label={cta.label || 'Contact Us'}
                  style={cta.style === 'outline' ? 'outline' : 'solid'}
                  size="lg"
                  showArrow={Boolean(cta.showArrow)}
                  className="w-full text-center"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            )}

            {/* Mobile Footer Utilities (Search & Theme Toggle) */}
            <div className="mt-auto pt-8 border-t border-border flex items-center justify-between">
              {showSearch && (
                <Link
                  href="/search"
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <SearchIcon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Search</span>
                </Link>
              )}

              {showThemeToggle && (
                <div className="flex items-center min-h-[44px]">
                  <ThemeSelector />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
