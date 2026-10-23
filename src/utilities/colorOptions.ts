export const highlightColorOptions = [
  { label: 'Primary Brand Color', value: 'primary' },
  { label: 'Secondary / Accent Color', value: 'secondary' },
  { label: 'Vibrant Gold / Amber', value: 'gold' },
  { label: 'Electric Blue', value: 'blue' },
  { label: 'Emerald Green', value: 'emerald' },
  { label: 'Rose / Pink', value: 'rose' },
  { label: 'Royal Purple', value: 'purple' },
  { label: 'Multicolor Gradient', value: 'gradient' },
  { label: 'Custom Hex Color', value: 'custom' },
]

export const highlightColorClasses: Record<string, string> = {
  primary: 'text-primary font-bold',
  secondary: 'text-secondary-foreground font-bold',
  gold: 'text-amber-500 font-bold dark:text-amber-400',
  amber: 'text-amber-500 font-bold dark:text-amber-400',
  blue: 'text-blue-600 font-bold dark:text-blue-400',
  emerald: 'text-emerald-600 font-bold dark:text-emerald-400',
  rose: 'text-rose-500 font-bold dark:text-rose-400',
  purple: 'text-purple-600 font-bold dark:text-purple-400',
  gradient: 'bg-gradient-to-r from-primary via-purple-500 to-rose-500 bg-clip-text text-transparent font-extrabold',
}

export const textColorOptions = [
  { label: 'Default (Follows Section Theme)', value: 'default' },
  { label: 'Crisp White / Light', value: 'light' },
  { label: 'High-Contrast Dark / Slate', value: 'dark' },
  { label: 'Primary Brand Color', value: 'primary' },
  { label: 'Secondary / Accent Color', value: 'secondary' },
  { label: 'Muted Gray', value: 'muted' },
  { label: 'Vibrant Gold / Amber', value: 'amber' },
  { label: 'Emerald Green', value: 'emerald' },
  { label: 'Rose / Pink', value: 'rose' },
  { label: 'Royal Purple', value: 'purple' },
  { label: 'Electric Blue', value: 'blue' },
  { label: 'Custom Hex Color', value: 'custom' },
]

export const titleColorClasses: Record<string, string> = {
  light: 'text-white drop-shadow-sm',
  white: 'text-white drop-shadow-sm',
  dark: 'text-slate-950 dark:text-slate-100',
  primary: 'text-primary',
  secondary: 'text-secondary-foreground',
  muted: 'text-muted-foreground',
  amber: 'text-amber-500 dark:text-amber-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  rose: 'text-rose-500 dark:text-rose-400',
  purple: 'text-purple-600 dark:text-purple-400',
  blue: 'text-blue-600 dark:text-blue-400',
}

export const descColorClasses: Record<string, string> = {
  light: 'text-white/85',
  white: 'text-white/85',
  dark: 'text-slate-700 dark:text-slate-300',
  primary: 'text-primary/85',
  secondary: 'text-secondary-foreground/85',
  muted: 'text-muted-foreground',
  amber: 'text-amber-500/85 dark:text-amber-400/85',
  emerald: 'text-emerald-600/85 dark:text-emerald-400/85',
  rose: 'text-rose-500/85 dark:text-rose-400/85',
  purple: 'text-purple-600/85 dark:text-purple-400/85',
  blue: 'text-blue-600/85 dark:text-blue-400/85',
}

export const buttonBgOptions = [
  { label: 'Default (Follows Button Style)', value: 'default' },
  { label: 'Primary Brand Color', value: 'primary' },
  { label: 'Secondary Theme Color', value: 'secondary' },
  { label: 'Dark / Slate', value: 'dark' },
  { label: 'Light / White', value: 'light' },
  { label: 'Emerald Green', value: 'emerald' },
  { label: 'Rose / Pink', value: 'rose' },
  { label: 'Vibrant Gold / Amber', value: 'amber' },
  { label: 'Royal Purple', value: 'purple' },
  { label: 'Electric Blue', value: 'blue' },
  { label: 'Outline Border', value: 'outline' },
  { label: 'Transparent / Ghost', value: 'transparent' },
  { label: 'Custom Hex Color', value: 'custom' },
]

export const buttonBgClasses: Record<string, string> = {
  primary: 'bg-primary hover:bg-primary/90 border border-transparent shadow-sm text-primary-foreground',
  secondary: 'bg-secondary hover:bg-secondary/80 border border-transparent shadow-sm text-secondary-foreground',
  dark: 'bg-slate-900 hover:bg-slate-800 text-white border border-transparent shadow-sm dark:bg-slate-800 dark:hover:bg-slate-700',
  light: 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 shadow-sm dark:bg-slate-100 dark:text-slate-950',
  emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white border border-transparent shadow-sm',
  rose: 'bg-rose-500 hover:bg-rose-600 text-white border border-transparent shadow-sm',
  amber: 'bg-amber-500 hover:bg-amber-600 text-slate-950 border border-transparent shadow-sm',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white border border-transparent shadow-sm',
  blue: 'bg-blue-600 hover:bg-blue-700 text-white border border-transparent shadow-sm',
  outline: 'border border-primary bg-transparent text-primary hover:bg-primary/10 shadow-sm',
  transparent: 'bg-transparent border border-transparent hover:bg-muted text-foreground',
}

export const buttonTextColorOptions = [
  { label: 'Auto (Contrasts with background)', value: 'auto' },
  { label: 'Crisp White', value: 'white' },
  { label: 'Dark / Slate', value: 'dark' },
  { label: 'Primary Brand Color', value: 'primary' },
  { label: 'Secondary / Accent Color', value: 'secondary' },
  { label: 'Vibrant Gold / Amber', value: 'amber' },
  { label: 'Emerald Green', value: 'emerald' },
  { label: 'Rose / Pink', value: 'rose' },
  { label: 'Royal Purple', value: 'purple' },
  { label: 'Electric Blue', value: 'blue' },
  { label: 'Custom Hex Color', value: 'custom' },
]

export const buttonTextClasses: Record<string, string> = {
  white: '!text-white [&_*]:!text-white',
  dark: '!text-slate-950 [&_*]:!text-slate-950',
  primary: '!text-primary [&_*]:!text-primary',
  secondary: '!text-secondary-foreground [&_*]:!text-secondary-foreground',
  amber: '!text-amber-500 [&_*]:!text-amber-500',
  emerald: '!text-emerald-500 [&_*]:!text-emerald-500',
  rose: '!text-rose-500 [&_*]:!text-rose-500',
  purple: '!text-purple-500 [&_*]:!text-purple-500',
  blue: '!text-blue-500 [&_*]:!text-blue-500',
}
