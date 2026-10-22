'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import { NavDropdown } from '../NavDropdown'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

export interface HeaderNavProps {
  navItems?: any[]
  navStyle?: {
    activeStyle?: 'underline' | 'color' | 'pill' | null
    uppercase?: boolean | null
    navAlign?: 'right' | 'center' | null
  } | null
  showSearch?: boolean | null
  showThemeToggle?: boolean | null
  className?: string
}

const getLinkHref = (link: any): string => {
  if (link?.type === 'reference' && typeof link.reference?.value === 'object' && link.reference.value) {
    const rawSlug = link.reference.value.slug
    const cleanSlug = typeof rawSlug === 'string' ? rawSlug.replace(/^\//, '') : ''
    if (link.reference.relationTo === 'pages') {
      return cleanSlug === 'home' || cleanSlug === '' ? '/' : `/${cleanSlug}`
    }
    return `/${link.reference.relationTo}/${cleanSlug}`
  }
  return (link?.url || '').trim()
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  navItems = [],
  navStyle,
  showSearch = false,
  showThemeToggle = false,
  className,
}) => {
  const pathname = usePathname()

  const activeStyle = navStyle?.activeStyle || 'underline'
  const isUppercase = Boolean(navStyle?.uppercase)

  const activeClasses = {
    underline: 'text-primary font-semibold underline underline-offset-8 decoration-2',
    color: 'text-primary font-bold',
    pill: 'bg-primary/10 text-primary px-3.5 py-1.5 rounded-full font-semibold',
  }

  const inactiveClasses = {
    underline: 'text-foreground/80 hover:text-foreground font-medium',
    color: 'text-foreground/80 hover:text-foreground font-medium',
    pill: 'text-foreground/80 hover:text-foreground hover:bg-muted/60 px-3.5 py-1.5 rounded-full font-medium',
  }

  return (
    <nav className={cn('hidden lg:flex items-center gap-6', className)}>
      {navItems.map((item, idx) => {
        if (item.type === 'dropdown') {
          return (
            <NavDropdown
              key={idx}
              label={item.label}
              children={item.children || []}
              isUppercase={isUppercase}
            />
          )
        }

        const href = getLinkHref(item.link)
        const isActive =
          href === '/'
            ? pathname === '/'
            : href !== '' && (pathname === href || pathname.startsWith(`${href}/`))

        if (item.highlight) {
          return (
            <CMSLink
              key={idx}
              {...item.link}
              appearance="default"
              size="sm"
              className={cn(
                'rounded-[var(--radius)] font-semibold shadow-sm transition-all',
                isUppercase && 'uppercase tracking-wider text-xs',
              )}
            >
              {item.label}
            </CMSLink>
          )
        }

        return (
          <CMSLink
            key={idx}
            {...item.link}
            appearance="link"
            className={cn(
              'transition-all duration-150 py-1',
              isUppercase && 'uppercase tracking-wider text-xs font-semibold',
              isActive
                ? activeClasses[activeStyle || 'underline']
                : inactiveClasses[activeStyle || 'underline'],
            )}
          >
            {item.label}
          </CMSLink>
        )
      })}

      {/* Conditionally rendered search icon */}
      {showSearch && (
        <Link
          href="/search"
          aria-label="Search"
          className={cn(
            'p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors',
            pathname === '/search' && 'text-primary bg-primary/10',
          )}
        >
          <SearchIcon className="w-4 h-4" />
        </Link>
      )}

      {/* Conditionally rendered theme switcher */}
      {showThemeToggle && (
        <div className="flex items-center pl-2 border-l border-border/60">
          <ThemeSelector />
        </div>
      )}
    </nav>
  )
}
