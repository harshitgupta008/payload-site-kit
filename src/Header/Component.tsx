import { HeaderWrapper } from './HeaderWrapper'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header() {
  const headerData = await getCachedGlobal('header', 2)()
  const siteSettings = await getCachedGlobal('siteSettings', 1)()

  return <HeaderWrapper headerData={headerData} siteSettings={siteSettings} />
}
