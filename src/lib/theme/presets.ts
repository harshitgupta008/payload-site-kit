export type ThemePresetName = 'modern' | 'classic' | 'bold'
export type ThemeFontName = 'Inter' | 'Poppins' | 'Playfair Display' | 'Montserrat' | 'Roboto'
export type ThemeRadiusName = 'none' | 'small' | 'medium' | 'large' | 'full'
export type ThemeButtonStyleName = 'solid' | 'outline' | 'gradient'

export interface ThemeTokens {
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
  }
  headingFont: ThemeFontName
  bodyFont: ThemeFontName
  radius: ThemeRadiusName
  buttonStyle: ThemeButtonStyleName
}

export const themePresets: Record<ThemePresetName, ThemeTokens> = {
  modern: {
    colors: {
      primary: '#2563eb', // Electric modern blue
      secondary: '#f1f5f9', // Clean light slate
      background: '#ffffff', // Crisp white
      text: '#0f172a', // Deep slate navy
    },
    headingFont: 'Inter',
    bodyFont: 'Inter',
    radius: 'medium',
    buttonStyle: 'solid',
  },
  classic: {
    colors: {
      primary: '#064e3b', // Sophisticated emerald green
      secondary: '#fef3c7', // Warm cream amber
      background: '#fafaf9', // Warm stone paper
      text: '#1c1917', // Warm dark stone
    },
    headingFont: 'Playfair Display',
    bodyFont: 'Roboto',
    radius: 'small',
    buttonStyle: 'outline',
  },
  bold: {
    colors: {
      primary: '#7c3aed', // High-energy violet
      secondary: '#fef08a', // Vibrant lime/yellow accent
      background: '#f8fafc', // Ultra-light slate
      text: '#020617', // Pitch dark
    },
    headingFont: 'Montserrat',
    bodyFont: 'Poppins',
    radius: 'large',
    buttonStyle: 'gradient',
  },
}
