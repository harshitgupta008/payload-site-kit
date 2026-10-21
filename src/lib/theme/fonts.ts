import { Inter, Poppins, Playfair_Display, Montserrat, Roboto } from 'next/font/google'
import type { ThemeFontName } from './presets'

export const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const fontPoppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const fontPlayfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

export const fontMontserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const fontRoboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const allFontVariables = [
  fontInter.variable,
  fontPoppins.variable,
  fontPlayfair.variable,
  fontMontserrat.variable,
  fontRoboto.variable,
].join(' ')

export { fontVariableMap, getFontVariable } from './fontVariables'
