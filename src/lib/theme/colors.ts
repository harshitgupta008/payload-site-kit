/**
 * Calculates high-contrast foreground color (#ffffff or #0f172a) based on hex background luminance.
 */
export function getContrastColor(hexColor?: string | null): string {
  if (!hexColor) return '#ffffff'

  const cleanHex = hexColor.replace('#', '').trim()
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((c) => c + c)
          .join('')
      : cleanHex

  if (fullHex.length !== 6) return '#ffffff'

  const r = parseInt(fullHex.substring(0, 2), 16) / 255
  const g = parseInt(fullHex.substring(2, 4), 16) / 255
  const b = parseInt(fullHex.substring(4, 6), 16) / 255

  // Standard sRGB relative luminance formula
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.55 ? '#0f172a' : '#ffffff'
}

/**
 * Maps radius preset names to actual CSS rem strings for --radius
 */
export const radiusValueMap: Record<string, string> = {
  none: '0rem',
  small: '0.25rem',
  medium: '0.5rem',
  large: '0.875rem',
  full: '9999px',
}
