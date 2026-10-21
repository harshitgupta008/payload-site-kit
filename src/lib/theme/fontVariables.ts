import type { ThemeFontName } from './presets'

export const fontVariableMap: Record<ThemeFontName, string> = {
  Inter: 'var(--font-inter)',
  Poppins: 'var(--font-poppins)',
  'Playfair Display': 'var(--font-playfair-display)',
  Montserrat: 'var(--font-montserrat)',
  Roboto: 'var(--font-roboto)',
}

export function getFontVariable(fontName?: ThemeFontName | null): string {
  if (!fontName || !(fontName in fontVariableMap)) {
    return 'var(--font-inter)'
  }
  return fontVariableMap[fontName]
}
