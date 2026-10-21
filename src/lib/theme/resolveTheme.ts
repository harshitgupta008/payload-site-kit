import {
  themePresets,
  type ThemeTokens,
  type ThemePresetName,
  type ThemeFontName,
  type ThemeRadiusName,
  type ThemeButtonStyleName,
} from './presets'
import { getContrastColor, radiusValueMap } from './colors'
import { getFontVariable } from './fontVariables'

export interface ResolvedTheme {
  preset: ThemePresetName
  colors: {
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    background: string
    text: string
  }
  headingFont: ThemeFontName
  bodyFont: ThemeFontName
  headingFontVariable: string
  bodyFontVariable: string
  radius: ThemeRadiusName
  radiusValue: string
  buttonStyle: ThemeButtonStyleName
}

export function resolveTheme(settings?: any): ResolvedTheme {
  const presetKey: ThemePresetName =
    settings?.themePreset && settings.themePreset in themePresets
      ? settings.themePreset
      : 'modern'

  const preset = themePresets[presetKey]

  const primary = settings?.colors?.primary?.trim() || preset.colors.primary
  const secondary = settings?.colors?.secondary?.trim() || preset.colors.secondary
  const background = settings?.colors?.background?.trim() || preset.colors.background
  const text = settings?.colors?.text?.trim() || preset.colors.text

  const headingFont: ThemeFontName = settings?.headingFont || preset.headingFont
  const bodyFont: ThemeFontName = settings?.bodyFont || preset.bodyFont
  const radius: ThemeRadiusName = settings?.radius || preset.radius
  const buttonStyle: ThemeButtonStyleName = settings?.buttonStyle || preset.buttonStyle

  return {
    preset: presetKey,
    colors: {
      primary,
      primaryForeground: getContrastColor(primary),
      secondary,
      secondaryForeground: getContrastColor(secondary),
      background,
      text,
    },
    headingFont,
    bodyFont,
    headingFontVariable: getFontVariable(headingFont),
    bodyFontVariable: getFontVariable(bodyFont),
    radius,
    radiusValue: radiusValueMap[radius] || '0.5rem',
    buttonStyle,
  }
}
