'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'

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

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  return (
    <nav className="flex gap-4 items-center">
      {navItems.map(({ link }, i) => {
        const href = getLinkHref(link)
        const isActive =
          href === '/'
            ? pathname === '/'
            : href !== '' && (pathname === href || pathname.startsWith(`${href}/`))

        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={cn(
              'transition-colors duration-150',
              isActive
                ? 'text-primary font-semibold underline underline-offset-8'
                : 'text-foreground/75 hover:text-foreground font-normal',
            )}
          />
        )
      })}
      <Link
        href="/search"
        className={cn(
          'transition-opacity duration-150',
          pathname === '/search' ? 'opacity-100' : 'opacity-70 hover:opacity-100',
        )}
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
