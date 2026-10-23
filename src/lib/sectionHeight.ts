// Shared static Tailwind class maps for Section, Hero Block, and Page Banner heights

export const heightOptions = [
  { label: 'Fit Content (No minimum height)', value: 'fit' },
  { label: 'Full Screen (100svh)', value: 'screen' },
  { label: 'Full Screen Below Header (100svh minus header)', value: 'screen-below-header' },
  { label: 'Three Quarters (~75svh)', value: 'tall' },
  { label: 'Half Screen (~50svh)', value: 'medium' },
  { label: 'Slim Banner (~30svh)', value: 'compact' },
]

export const mobileHeightOptions = [
  { label: 'Same as desktop (Default)', value: 'same-as-desktop' },
  { label: 'Fit Content on mobile', value: 'fit' },
  { label: 'Half Screen on mobile (~50svh)', value: 'medium' },
  { label: 'Full Screen on mobile (100svh)', value: 'screen' },
  { label: 'Full Screen Below Header on mobile', value: 'screen-below-header' },
]

export const verticalAlignOptions = [
  { label: 'Top', value: 'top' },
  { label: 'Center', value: 'center' },
  { label: 'Bottom', value: 'bottom' },
]

export const desktopHeightClasses: Record<string, string> = {
  fit: 'min-h-0',
  compact: 'min-h-[30svh]',
  medium: 'min-h-[50svh]',
  tall: 'min-h-[75svh]',
  screen: 'min-h-svh',
  'screen-below-header': 'min-h-[calc(100svh-var(--header-height,4.5rem))]',
}

export const mobileHeightClasses: Record<string, string> = {
  'same-as-desktop': '',
  fit: 'max-md:min-h-0',
  compact: 'max-md:min-h-[30svh]',
  medium: 'max-md:min-h-[50svh]',
  tall: 'max-md:min-h-[75svh]',
  screen: 'max-md:min-h-svh',
  'screen-below-header': 'max-md:min-h-[calc(100svh-var(--header-height,4.5rem))]',
}

export const verticalAlignClasses: Record<string, string> = {
  top: 'justify-start',
  center: 'justify-center',
  bottom: 'justify-end',
}

export function getSectionHeightClasses(
  height?: string | null,
  mobileHeight?: string | null,
): string {
  const dClass = desktopHeightClasses[height || 'fit'] || desktopHeightClasses.fit
  const mClass = mobileHeightClasses[mobileHeight || 'same-as-desktop'] || ''
  return `${dClass} ${mClass}`.trim()
}
