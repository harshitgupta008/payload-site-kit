import type { ThemeRadiusName, ThemeButtonStyleName } from './presets'

/**
 * Static map of radius names to full Tailwind class names.
 */
export const radiusClassMap: Record<ThemeRadiusName, string> = {
  none: 'rounded-none',
  small: 'rounded-sm',
  medium: 'rounded-md',
  large: 'rounded-lg',
  full: 'rounded-full',
}

/**
 * Static map of buttonStyle names to full Tailwind class names.
 */
export const buttonStyleClassMap: Record<ThemeButtonStyleName, string> = {
  solid: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border border-transparent',
  outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 shadow-none',
  gradient: 'bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground hover:opacity-95 shadow-md border border-transparent',
}
