'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Frontend error caught by error boundary:', error)
  }, [error])

  return (
    <div className="container py-28 flex flex-col items-center justify-center text-center">
      <div className="max-w-md space-y-4">
        <p className="text-sm font-semibold tracking-wide uppercase text-destructive">Application Error</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Something Went Wrong</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          An unexpected error occurred while loading this page. You can try refreshing the component.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}
