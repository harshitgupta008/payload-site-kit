import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { resolveTheme } from '@/lib/theme/resolveTheme'
import { allFontVariables } from '@/lib/theme/fonts'
import { getServerSideURL } from '@/utilities/getURL'

import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getCachedGlobal('siteSettings', 1)()
  const theme = resolveTheme(siteSettings)
  const serverUrl = getServerSideURL()
  const siteName = siteSettings?.siteName || 'Payload Website'

  const faviconUrl =
    typeof siteSettings?.favicon === 'object' && siteSettings?.favicon?.url
      ? siteSettings.favicon.url
      : '/favicon.ico'

  const logoUrl =
    typeof siteSettings?.logo === 'object' && siteSettings?.logo?.url
      ? (siteSettings.logo.url.startsWith('http')
          ? siteSettings.logo.url
          : `${serverUrl}${siteSettings.logo.url}`)
      : undefined

  const sameAs = Array.isArray(siteSettings?.socialLinks)
    ? siteSettings.socialLinks
        .map((item: any) => item?.url)
        .filter((url: any) => typeof url === 'string' && url.trim().length > 0)
    : []

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: serverUrl,
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }

  const safeJsonLd = JSON.stringify(organizationSchema).replace(/</g, '\\u003c')

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, allFontVariables)}
      lang="en"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href={faviconUrl} rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd,
          }}
        />
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
  const siteName = siteSettings?.siteName || 'Payload Website'

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
