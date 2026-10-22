import React from 'react'
import { cn } from '@/utilities/ui'

export interface ContainerProps {
  children: React.ReactNode
  className?: string
  width?: 'contained' | 'wide' | 'full' | null
}

const widthClasses: Record<string, string> = {
  contained: 'container mx-auto px-4 sm:px-6 lg:px-8',
  wide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  full: 'w-full px-4 sm:px-6 lg:px-8',
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  width = 'contained',
}) => {
  const widthClass = widthClasses[width || 'contained'] || widthClasses.contained

  return <div className={cn(widthClass, className)}>{children}</div>
}
