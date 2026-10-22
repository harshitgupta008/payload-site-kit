'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'

export interface AnnouncementBarProps {
  announcement?: {
    enable?: boolean | null
    text?: string | null
    link?: any
    background?: 'primary' | 'dark' | 'light' | null
    dismissible?: boolean | null
  } | null
}

const backgroundClasses: Record<string, string> = {
  primary: 'bg-primary text-primary-foreground',
  dark: 'bg-foreground text-background',
  light: 'bg-muted text-foreground',
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ announcement }) => {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('payload_announcement_dismissed') === 'true'
      setDismissed(isDismissed)
    } catch {
      setDismissed(false)
    }
  }, [])

  if (!announcement?.enable || !announcement.text || dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem('payload_announcement_dismissed', 'true')
    } catch {
      // storage unavailable / private mode
    }
  }

  const bgClass =
    backgroundClasses[announcement.background || 'primary'] || backgroundClasses.primary

  return (
    <aside
      aria-label="Announcement"
      className={cn(
        'w-full py-2.5 px-4 text-xs sm:text-sm font-medium flex items-center justify-center relative transition-colors z-40',
        bgClass,
      )}
    >
      <div className="container mx-auto flex items-center justify-center gap-3 pr-8 sm:pr-0">
        <span>{announcement.text}</span>
        {announcement.link?.url && (
          <CMSLink
            {...announcement.link}
            appearance="link"
            className="underline underline-offset-4 hover:opacity-80 transition-opacity font-semibold"
          />
        )}
      </div>

      {announcement.dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </aside>
  )
}
