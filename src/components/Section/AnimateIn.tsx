'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/ui'

export interface AnimateInProps {
  animation?: 'none' | 'fade-up' | 'fade-in' | 'zoom' | null
  children: React.ReactNode
  className?: string
}

export const AnimateIn: React.FC<AnimateInProps> = ({
  animation = 'none',
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check user preference for reduced motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
    }

    if (!animation || animation === 'none') {
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element) return

    // If IntersectionObserver is not supported, reveal immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [animation])

  if (!animation || animation === 'none' || prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Animation static classes
  let animationStyles = ''
  if (animation === 'fade-up') {
    animationStyles = isVisible
      ? 'opacity-100 translate-y-0 transition-all duration-700 ease-out'
      : 'opacity-0 translate-y-8 pointer-events-none'
  } else if (animation === 'fade-in') {
    animationStyles = isVisible
      ? 'opacity-100 transition-opacity duration-700 ease-out'
      : 'opacity-0 pointer-events-none'
  } else if (animation === 'zoom') {
    animationStyles = isVisible
      ? 'opacity-100 scale-100 transition-all duration-700 ease-out'
      : 'opacity-0 scale-95 pointer-events-none'
  }

  return (
    <div ref={ref} className={cn(animationStyles, className)}>
      {children}
    </div>
  )
}
