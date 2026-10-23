import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { Banner } from '@/components/Banner'

const legacyHeroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<Page['hero'] & { pageTitle?: string }> = async (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  // New Full-Control Page Banner
  if (type === 'banner') {
    return <Banner {...(props as any)} headingLevel="h1" isPageHero={true} />
  }

  // Legacy Hero Fallback
  const LegacyHero = legacyHeroes[type as keyof typeof legacyHeroes]
  if (LegacyHero) {
    return <LegacyHero {...props} />
  }

  return null
}
