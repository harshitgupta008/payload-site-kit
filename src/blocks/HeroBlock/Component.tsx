import React from 'react'
import { Banner } from '@/components/Banner'
import type { Media } from '@/payload-types'
import type { SectionStyleType } from '@/fields/sectionStyle'

export interface HeroBlockComponentProps {
  sectionHeader?: {
    title?: string | null
    description?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null
  sectionStyle?: SectionStyleType | null
  variant?: 'centered' | 'split-left' | 'split-right' | null
  textAlign?: 'left' | 'center' | 'right' | null
  image?: string | Media | null
  links?: { link: any; id?: string | null }[] | null
  hasOldHero?: boolean
}

export const HeroBlockComponent: React.FC<HeroBlockComponentProps> = async (props) => {
  const {
    sectionHeader,
    sectionStyle,
    variant = 'centered',
    textAlign = 'center',
    image,
    links,
    hasOldHero = false,
  } = props

  const isSplitLeft = variant === 'split-left'
  const isSplitRight = variant === 'split-right'

  let imageMode: 'side' | 'below' | 'none' = 'none'
  let imagePosition: 'left' | 'right' = 'right'

  if (isSplitLeft) {
    imageMode = 'side'
    imagePosition = 'left'
  } else if (isSplitRight) {
    imageMode = 'side'
    imagePosition = 'right'
  } else if (image) {
    imageMode = 'below'
  }

  // Normalize buttons or links array to button format for unified Banner
  const buttonItems =
    Array.isArray((props as any).buttons) && (props as any).buttons.length > 0
      ? (props as any).buttons
      : links || []

  const buttons = buttonItems.map((item: any) => {
    const actionData = item.actionData || item
    return {
      label: actionData?.label || item.label || item.link?.label || 'Learn More',
      style: actionData?.style || (item.link?.appearance === 'outline' ? 'outline' : 'solid'),
      buttonBg: actionData?.buttonBg || item.buttonBg,
      customButtonBg: actionData?.customButtonBg || item.customButtonBg,
      buttonTextColor: actionData?.buttonTextColor || item.buttonTextColor,
      customButtonTextColor: actionData?.customButtonTextColor || item.customButtonTextColor,
      actionData,
      link: actionData?.link || item.link,
      icon: actionData?.showArrow ? 'arrow-right' : 'none',
    }
  })

  return (
    <Banner
      title={sectionHeader?.title}
      description={sectionHeader?.description}
      textAlign={textAlign || sectionHeader?.alignment || 'center'}
      highlightWords={(sectionHeader as any)?.highlightWords}
      highlightColor={(sectionHeader as any)?.highlightColor}
      customHighlightColor={(sectionHeader as any)?.customHighlightColor}
      image={image}
      imageMode={imageMode}
      imagePosition={imagePosition}
      buttons={buttons}
      headingLevel={hasOldHero ? 'h2' : 'h1'}
      isPageHero={false}
      height={sectionStyle?.height || 'fit'}
      overlay={sectionStyle?.overlay || 'none'}
      textColor={(sectionHeader as any)?.titleColor && (sectionHeader as any)?.titleColor !== 'default' ? (sectionHeader as any)?.titleColor : sectionStyle?.textColor}
      customTextColor={(sectionHeader as any)?.customTitleColor || sectionStyle?.customTextColor}
    />
  )
}
