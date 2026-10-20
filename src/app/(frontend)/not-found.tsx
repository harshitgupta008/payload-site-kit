import React from 'react'
import { CMSLink } from '@/components/Link'

export default function NotFound() {
  return (
    <div className="container py-28 flex flex-col items-center justify-center text-center">
      <div className="max-w-md space-y-4">
        <p className="text-sm font-semibold tracking-wide uppercase text-primary">404 Error</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Page Not Found</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>
        <div className="pt-4">
          <CMSLink
            appearance="default"
            label="Back to Homepage"
            url="/"
          />
        </div>
      </div>
    </div>
  )
}
