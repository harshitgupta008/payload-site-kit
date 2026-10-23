import React from 'react'
import {
  highlightColorClasses,
  highlightColorOptions,
} from './colorOptions'

export { highlightColorClasses, highlightColorOptions }

export function renderHighlightedText(
  text: string,
  highlightKeywords?: string | null,
  highlightColor?: string | null,
  customHighlightColor?: string | null,
): React.ReactNode {
  if (!text) return ''
  if (!highlightKeywords || !highlightKeywords.trim()) return text

  const words = highlightKeywords
    .split(/[,\s]+/)
    .map((w) => w.trim())
    .filter(Boolean)

  if (words.length === 0) return text

  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(regex)

  const isCustom = highlightColor === 'custom' && customHighlightColor
  const colorClass = highlightColor ? highlightColorClasses[highlightColor] || highlightColorClasses.primary : highlightColorClasses.primary

  return parts.map((part, index) => {
    const isMatch = words.some((w) => w.toLowerCase() === part.toLowerCase())
    if (isMatch) {
      return (
        <span
          key={index}
          className={colorClass}
          style={isCustom ? { color: customHighlightColor! } : undefined}
        >
          {part}
        </span>
      )
    }
    return part
  })
}
