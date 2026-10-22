import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { Media } from '@/payload-types'

export interface LogoProps {
  logo?: string | Media | null
  logoOnTransparent?: string | Media | null
  logoSize?: 'small' | 'medium' | 'large' | null
  siteName?: string | null
  isTransparent?: boolean
  contrast?: 'dark' | 'light' | 'primary' | 'muted' | null
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

const logoSizeClasses: Record<string, string> = {
  small: 'h-7 w-auto max-w-[120px]',
  medium: 'h-9 w-auto max-w-[160px]',
  large: 'h-12 w-auto max-w-[220px]',
}

export const Logo: React.FC<LogoProps> = (props) => {
  const {
    logo,
    logoOnTransparent,
    logoSize = 'medium',
    siteName,
    isTransparent = false,
    contrast = 'light',
    className,
    loading = 'lazy',
    priority = 'low',
  } = props

  // If header is transparent on dark/hero image and transparent logo exists, use it
  const activeLogo = isTransparent && logoOnTransparent ? logoOnTransparent : logo

  const mediaObj = typeof activeLogo === 'object' && activeLogo !== null ? (activeLogo as Media) : null
  const logoUrl = mediaObj?.url || (typeof activeLogo === 'string' ? activeLogo : null)
  const logoAlt = mediaObj?.alt || siteName || 'Site Logo'

  const sizeClass = logoSizeClasses[logoSize || 'medium'] || logoSizeClasses.medium

  if (logoUrl) {
    const isSvg = logoUrl.endsWith('.svg') || mediaObj?.mimeType?.includes('svg')

    return (
      <div className={cn('relative flex items-center shrink-0', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={logoAlt}
          loading={loading}
          decoding="async"
          className={cn('object-contain w-auto', sizeClass)}
        />
      </div>
    )
  }

  // Fallback to site name text with clean token styling
  const textContrastClass =
    contrast === 'dark' || contrast === 'primary' ? 'text-primary-foreground' : 'text-foreground'

  return (
    <span
      className={cn(
        'font-heading font-extrabold text-xl sm:text-2xl tracking-tight leading-none shrink-0 transition-colors',
        textContrastClass,
        className,
      )}
    >
      {siteName || 'Site'}
    </span>
  )
}
