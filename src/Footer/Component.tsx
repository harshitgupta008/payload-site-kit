import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/utilities/ui'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Container } from '@/components/Container'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'
import type { Footer as FooterType } from '@/payload-types'

// SVG Social Icons
const platformIcons: Record<string, React.FC<{ className?: string }>> = {
  github: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  ),
  twitter: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  x: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  youtube: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  facebook: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
}

const backgroundClasses: Record<string, string> = {
  muted: 'bg-muted text-foreground border-t border-border',
  dark: 'bg-foreground text-background border-t border-border/20',
  primary: 'bg-primary text-primary-foreground border-t border-primary/20',
}

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const siteSettings = await getCachedGlobal('siteSettings', 1)()

  const brand = footerData?.brand
  const columns = footerData?.columns || []
  const contact = footerData?.contact
  const social = footerData?.social
  const bottomBar = footerData?.bottomBar
  const layout = footerData?.layout

  const siteName = siteSettings?.siteName || 'Payload Website'
  const footerLogo = brand?.logo || siteSettings?.logo
  const variant = layout?.variant || 'columns'
  const bgSetting = layout?.background || 'muted'
  const containerWidth = layout?.containerWidth || 'contained'
  const showThemeToggle = Boolean(layout?.showThemeToggle)

  const bgClass = backgroundClasses[bgSetting] || backgroundClasses.muted
  const contrastMode = bgSetting === 'dark' || bgSetting === 'primary' ? 'dark' : 'light'

  // Dynamic Year Token Replacement
  const currentYear = new Date().getFullYear().toString()
  const rawCopyright = bottomBar?.copyright || '© {year} {siteName}. All rights reserved.'
  const copyrightText = rawCopyright
    .replace(/{year}/g, currentYear)
    .replace(/{siteName}/g, siteName)

  // Social Links
  const showSocial = social?.showSocialLinks !== false
  const socialLinks = Array.isArray(siteSettings?.socialLinks) ? siteSettings.socialLinks : []

  // Legacy navItems fallback if columns array is empty
  const hasColumns = columns.length > 0
  const legacyNavItems = (footerData as any)?.navItems || []

  return (
    <footer className={cn('mt-auto w-full transition-colors', bgClass)}>
      <Container width={containerWidth} className="py-12 sm:py-16">
        {/* Variant 1: Multi-Column Grid Layout (Default) */}
        {variant === 'columns' && (
          <div className="flex flex-col gap-12 sm:gap-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
              {/* Brand & Contact Column */}
              <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-6">
                <Link
                  href="/"
                  className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded w-fit"
                >
                  <Logo
                    logo={footerLogo}
                    siteName={siteName}
                    contrast={contrastMode}
                    priority="low"
                    loading="lazy"
                  />
                </Link>

                {brand?.description && (
                  <p className="text-sm opacity-80 leading-relaxed max-w-sm">
                    {brand.description}
                  </p>
                )}

                {/* Contact Information */}
                {(contact?.address || contact?.phone || contact?.email) && (
                  <div className="flex flex-col gap-2.5 text-sm opacity-80 pt-2">
                    {contact.address && (
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5 opacity-70" />
                        <span>{contact.address}</span>
                      </div>
                    )}
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-2.5 hover:opacity-100 transition-opacity w-fit"
                      >
                        <Phone className="w-4 h-4 shrink-0 opacity-70" />
                        <span>{contact.phone}</span>
                      </a>
                    )}
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-2.5 hover:opacity-100 transition-opacity w-fit"
                      >
                        <Mail className="w-4 h-4 shrink-0 opacity-70" />
                        <span>{contact.email}</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Social Links */}
                {showSocial && socialLinks.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {socialLinks.map((item: any, sIdx: number) => {
                      const platformKey = (item.platform || '').toLowerCase().trim()
                      const IconComponent = platformIcons[platformKey] || Globe

                      return (
                        <a
                          key={item.id || sIdx}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit our ${item.platform || 'social'} page`}
                          className="w-9 h-9 rounded-full flex items-center justify-center border border-current/20 hover:border-current/60 hover:scale-105 transition-all opacity-80 hover:opacity-100"
                        >
                          <IconComponent className="w-4 h-4" />
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Navigation Columns */}
              <div className="md:col-span-8 lg:col-span-8">
                {hasColumns ? (
                  <div
                    className={cn(
                      'grid gap-8 sm:gap-10',
                      columns.length === 1 && 'grid-cols-1',
                      columns.length === 2 && 'grid-cols-2',
                      columns.length === 3 && 'grid-cols-2 sm:grid-cols-3',
                      columns.length >= 4 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
                    )}
                  >
                    {columns.map((col, cIdx) => (
                      <div key={col.id || cIdx} className="flex flex-col gap-3.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider opacity-90">
                          {col.title}
                        </h4>
                        <ul className="flex flex-col gap-2.5 text-sm">
                          {col.links?.map((linkItem: any, lIdx: number) => (
                            <li key={linkItem.id || lIdx}>
                              <CMSLink
                                {...linkItem.link}
                                appearance="link"
                                className="opacity-75 hover:opacity-100 transition-opacity"
                              >
                                {linkItem.label || linkItem.link?.label}
                              </CMSLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : legacyNavItems.length > 0 ? (
                  <div className="flex flex-wrap gap-6">
                    {legacyNavItems.map(({ link }: any, i: number) => (
                      <CMSLink
                        key={i}
                        {...link}
                        appearance="link"
                        className="opacity-75 hover:opacity-100 transition-opacity text-sm"
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Bottom Bar: Copyright & Legal Links */}
            <div className="pt-8 border-t border-current/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-75">
              <p>{copyrightText}</p>

              <div className="flex flex-wrap items-center gap-6">
                {bottomBar?.links?.map((item: any, bIdx: number) => (
                  <CMSLink
                    key={item.id || bIdx}
                    {...item.link}
                    appearance="link"
                    className="hover:opacity-100 transition-opacity"
                  >
                    {item.label || item.link?.label}
                  </CMSLink>
                ))}

                {showThemeToggle && (
                  <div className="pl-2 border-l border-current/20">
                    <ThemeSelector />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Variant 2: Centered Layout */}
        {variant === 'centered' && (
          <div className="flex flex-col items-center text-center gap-8">
            <Link
              href="/"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              <Logo
                logo={footerLogo}
                siteName={siteName}
                contrast={contrastMode}
                priority="low"
                loading="lazy"
              />
            </Link>

            {brand?.description && (
              <p className="text-sm opacity-80 leading-relaxed max-w-lg">
                {brand.description}
              </p>
            )}

            {/* Links Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {hasColumns
                ? columns.flatMap((col) => col.links || []).map((linkItem: any, lIdx: number) => (
                    <CMSLink
                      key={linkItem.id || lIdx}
                      {...linkItem.link}
                      appearance="link"
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {linkItem.label || linkItem.link?.label}
                    </CMSLink>
                  ))
                : legacyNavItems.map(({ link }: any, i: number) => (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance="link"
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                  ))}
            </div>

            {/* Social Links */}
            {showSocial && socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                {socialLinks.map((item: any, sIdx: number) => {
                  const platformKey = (item.platform || '').toLowerCase().trim()
                  const IconComponent = platformIcons[platformKey] || Globe

                  return (
                    <a
                      key={item.id || sIdx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${item.platform || 'social'} page`}
                      className="w-9 h-9 rounded-full flex items-center justify-center border border-current/20 hover:border-current/60 hover:scale-105 transition-all opacity-80 hover:opacity-100"
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            )}

            {/* Bottom Bar */}
            <div className="w-full pt-6 border-t border-current/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-75">
              <p>{copyrightText}</p>
              <div className="flex flex-wrap items-center gap-4">
                {bottomBar?.links?.map((item: any, bIdx: number) => (
                  <CMSLink
                    key={item.id || bIdx}
                    {...item.link}
                    appearance="link"
                    className="hover:opacity-100 transition-opacity"
                  >
                    {item.label || item.link?.label}
                  </CMSLink>
                ))}
                {showThemeToggle && <ThemeSelector />}
              </div>
            </div>
          </div>
        )}

        {/* Variant 3: Minimal Layout */}
        {variant === 'minimal' && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
            <Link href="/" className="flex items-center">
              <Logo
                logo={footerLogo}
                siteName={siteName}
                contrast={contrastMode}
                priority="low"
                loading="lazy"
              />
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs opacity-80">
              {bottomBar?.links?.map((item: any, bIdx: number) => (
                <CMSLink
                  key={item.id || bIdx}
                  {...item.link}
                  appearance="link"
                  className="hover:opacity-100 transition-opacity"
                >
                  {item.label || item.link?.label}
                </CMSLink>
              ))}
              <p>{copyrightText}</p>
              {showThemeToggle && <ThemeSelector />}
            </div>
          </div>
        )}
      </Container>
    </footer>
  )
}
