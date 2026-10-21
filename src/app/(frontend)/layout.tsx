import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { resolveTheme } from '@/lib/theme/resolveTheme'
import { allFontVariables } from '@/lib/theme/fonts'
import { getServerSideURL } from '@/utilities/getURL'

import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const siteSettings = await getCachedGlobal('siteSettings', 1)()
  const theme = resolveTheme(siteSettings)

  const faviconUrl =
    typeof siteSettings?.favicon === 'object' && siteSettings?.favicon?.url
      ? siteSettings.favicon.url
      : '/favicon.ico'

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, allFontVariables)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href={faviconUrl} rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <style
          id="theme-tokens"
          dangerouslySetInnerHTML={{
            __html: `
              :root, html[data-theme='light'] {
                --primary: ${theme.colors.primary};
                --primary-foreground: ${theme.colors.primaryForeground};
                --secondary: ${theme.colors.secondary};
                --secondary-foreground: ${theme.colors.secondaryForeground};
                --background: ${theme.colors.background};
                --foreground: ${theme.colors.text};
                --radius: ${theme.radiusValue};
              }
              :root {
                --font-heading: ${theme.headingFontVariable};
                --font-body: ${theme.bodyFontVariable};
              }
            `,
          }}
        />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedGlobal('siteSettings', 1)()
  const siteName = siteSettings?.siteName || 'Payload Website Template'

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    openGraph: mergeOpenGraph({
      title: siteName,
    }),
    twitter: {
      card: 'summary_large_image',
      creator: '@payloadcms',
    },
  }
}
