import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  let href: string | undefined = undefined

  if (type === 'reference' && typeof reference?.value === 'object' && reference.value !== null) {
    const relationTo = reference.relationTo
    const rawSlug = (reference.value as Page | Post).slug
    const cleanSlug = typeof rawSlug === 'string' ? rawSlug.replace(/^\//, '') : ''

    if (relationTo === 'pages') {
      const isHome = cleanSlug === 'home' || cleanSlug === ''
      href = isHome ? '/' : `/${cleanSlug}`
    } else if (relationTo === 'posts') {
      href = `/posts/${cleanSlug}`
    } else if (relationTo) {
      href = `/${relationTo}/${cleanSlug}`
    }
  } else if (url) {
    href = url.trim()
  }

  const content = (
    <React.Fragment>
      {label && label}
      {children && children}
    </React.Fragment>
  )

  const size = appearance === 'link' ? 'clear' : sizeFromProps

  // 1. Missing or empty href: render children directly without a broken link
  if (!href) {
    if (appearance === 'inline') {
      return <span className={className}>{content}</span>
    }
    return (
      <Button className={className} size={size} variant={appearance}>
        {content}
      </Button>
    )
  }

  // 2. Protocols: mailto: and tel: links (normal anchor, never new tab)
  const isMailOrTel = href.startsWith('mailto:') || href.startsWith('tel:')
  if (isMailOrTel) {
    if (appearance === 'inline') {
      return (
        <a className={cn(className)} href={href}>
          {content}
        </a>
      )
    }
    return (
      <Button asChild className={className} size={size} variant={appearance}>
        <a className={cn(className)} href={href}>
          {content}
        </a>
      </Button>
    )
  }

  // 3. External links: http:// or https:// (normal anchor with target and rel when newTab)
  const isExternal = href.startsWith('http://') || href.startsWith('https://')
  if (isExternal) {
    const externalProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
    if (appearance === 'inline') {
      return (
        <a className={cn(className)} href={href} {...externalProps}>
          {content}
        </a>
      )
    }
    return (
      <Button asChild className={className} size={size} variant={appearance}>
        <a className={cn(className)} href={href} {...externalProps}>
          {content}
        </a>
      </Button>
    )
  }

  // 4. Internal links: starts with "/", "#", or relative path (next/link with prefetching)
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} prefetch={true} {...newTabProps}>
        {content}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} prefetch={true} {...newTabProps}>
        {content}
      </Link>
    </Button>
  )
}
