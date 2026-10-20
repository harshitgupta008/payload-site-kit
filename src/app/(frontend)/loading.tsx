import React from 'react'

export default function Loading() {
  return (
    <div className="container py-24 space-y-8 animate-pulse" aria-busy="true" aria-label="Loading page">
      {/* Hero skeleton */}
      <div className="space-y-4 max-w-2xl">
        <div className="h-10 sm:h-12 w-3/4 bg-muted rounded-md" />
        <div className="h-5 w-full bg-muted/70 rounded-md" />
        <div className="h-5 w-5/6 bg-muted/70 rounded-md" />
      </div>

      {/* Action button skeleton */}
      <div className="flex gap-4 pt-2">
        <div className="h-10 w-32 bg-muted rounded-md" />
        <div className="h-10 w-28 bg-muted/60 rounded-md" />
      </div>

      {/* Content blocks skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <div className="h-52 bg-muted/50 rounded-lg p-6 space-y-3">
          <div className="h-6 w-1/2 bg-muted rounded" />
          <div className="h-4 w-full bg-muted/70 rounded" />
          <div className="h-4 w-4/5 bg-muted/70 rounded" />
        </div>
        <div className="h-52 bg-muted/50 rounded-lg p-6 space-y-3">
          <div className="h-6 w-1/2 bg-muted rounded" />
          <div className="h-4 w-full bg-muted/70 rounded" />
          <div className="h-4 w-4/5 bg-muted/70 rounded" />
        </div>
        <div className="h-52 bg-muted/50 rounded-lg p-6 space-y-3">
          <div className="h-6 w-1/2 bg-muted rounded" />
          <div className="h-4 w-full bg-muted/70 rounded" />
          <div className="h-4 w-4/5 bg-muted/70 rounded" />
        </div>
      </div>
    </div>
  )
}
