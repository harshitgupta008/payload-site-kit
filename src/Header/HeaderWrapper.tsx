'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MobileMenu } from './MobileMenu'
import { AnnouncementBar } from './AnnouncementBar'
import { Container } from '@/components/Container'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

export interface HeaderWrapperProps {
  headerData: HeaderType
  siteSettings: any
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({
  headerData,
  siteSettings,
}) => {
  const [isScrolled, setIsScrolled] = useState(false)

  const layout = headerData?.layout
  const variant = layout?.variant || 'default'
  const isSticky = layout?.sticky !== false
  const isTransparentOnTop = Boolean(layout?.transparentOnTop)
  const containerWidth = layout?.containerWidth || 'contained'
  const bgSetting = layout?.background || 'solid'
  const showSearch = Boolean(layout?.showSearch)
  const showThemeToggle = Boolean(layout?.showThemeToggle)

  const cta = headerData?.cta
  const navItems = headerData?.navItems || []
  const navStyle = headerData?.navStyle
  const announcementBar = headerData?.announcementBar

  const siteName = siteSettings?.siteName || 'Payload Website'
  const headerLogo = headerData?.logo || siteSettings?.logo
  const logoOnTransparent = headerData?.logoOnTransparent || headerLogo
  const logoSize = headerData?.logoSize || 'medium'

  // Scroll listener for sticky header and transparent-on-top transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine dynamic background and border styles
  const isCurrentlyTransparent = isTransparentOnTop && !isScrolled
  const navAlign = navStyle?.navAlign || 'right'

  let headerBgClass = 'bg-background text-foreground'
  if (isCurrentlyTransparent) {
    headerBgClass = 'bg-transparent text-foreground'
  } else if (bgSetting === 'primary') {
    headerBgClass = cn(
      'bg-primary text-primary-foreground',
      isScrolled && 'border-b border-primary/20 shadow-sm',
    )
  } else {
    headerBgClass = cn(
      'bg-background text-foreground',
      isScrolled ? 'border-b border-border shadow-sm' : 'border-b border-transparent',
    )
  }

  const isCentered = variant === 'centered'
  const isSplit = variant === 'split'

  // Render CTA helper
  const renderCTA = (size: 'sm' | 'lg' = 'sm') => {
    if (!cta?.enableCTA) return null

    if (cta.action === 'popupForm') {
      return (
        <button
          type="button"
          data-popup-action="true"
          aria-haspopup="dialog"
          className={cn(
            'font-semibold shadow-sm inline-flex items-center gap-2 rounded-[var(--radius)] text-sm transition-colors',
            size === 'sm' ? 'px-4 py-2' : 'px-5 py-2.5',
            cta.style === 'outline'
              ? 'border border-primary text-primary hover:bg-primary/10'
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
          )}
        >
          <span>{cta.label || 'Contact Us'}</span>
          {cta.showArrow && <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      )
    }

    return (
      <CMSLink
        {...cta.link}
        size={size}
        appearance={cta.style === 'outline' ? 'outline' : 'default'}
        className="font-semibold shadow-sm inline-flex items-center gap-2"
      >
        <span>{cta.label || 'Get Started'}</span>
        {cta.showArrow && <ArrowRight className="w-3.5 h-3.5" />}
      </CMSLink>
    )
  }

  return (
    <>
      <AnnouncementBar announcement={announcementBar} />

      <header
        className={cn(
          'w-full z-30 transition-all duration-200',
          isSticky && 'sticky top-0',
          isCurrentlyTransparent && 'absolute left-0 right-0',
          headerBgClass,
        )}
      >
        <Container width={containerWidth} className="py-4 sm:py-5">
          {/* Default Layout: Logo Left, Nav & CTA Right (or Nav Center if navAlign === 'center') */}
          {variant === 'default' && (
            <div className="flex items-center justify-between gap-6">
              <Link
                href="/"
                className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                <Logo
                  logo={headerLogo}
                  logoOnTransparent={logoOnTransparent}
                  logoSize={logoSize}
                  siteName={siteName}
                  isTransparent={isCurrentlyTransparent}
                  priority="high"
                  loading="eager"
                />
              </Link>

              {navAlign === 'center' ? (
                <>
                  <div className="hidden lg:flex flex-1 items-center justify-center">
                    <HeaderNav
                      navItems={navItems}
                      navStyle={navStyle}
                      showSearch={showSearch}
                      showThemeToggle={showThemeToggle}
                    />
                  </div>

                  <div className="hidden lg:flex items-center justify-end shrink-0 gap-4">
                    {renderCTA('sm')}
                  </div>
                </>
              ) : (
                <div className="hidden lg:flex items-center gap-6 justify-end">
                  <HeaderNav
                    navItems={navItems}
                    navStyle={navStyle}
                    showSearch={showSearch}
                    showThemeToggle={showThemeToggle}
                  />

                  {cta?.enableCTA && <div className="pl-2">{renderCTA('sm')}</div>}
                </div>
              )}

              {/* Mobile Hamburger Drawer (< lg) */}
              <MobileMenu
                navItems={navItems}
                cta={cta}
                showSearch={showSearch}
                showThemeToggle={showThemeToggle}
                isUppercase={Boolean(navStyle?.uppercase)}
              />
            </div>
          )}

          {/* Centered Layout: Logo Centered, Nav Below */}
          {isCentered && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-full flex items-center justify-between lg:justify-center relative">
                <Link
                  href="/"
                  className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                >
                  <Logo
                    logo={headerLogo}
                    logoOnTransparent={logoOnTransparent}
                    logoSize={logoSize}
                    siteName={siteName}
                    isTransparent={isCurrentlyTransparent}
                    priority="high"
                    loading="eager"
                  />
                </Link>

                <div className="lg:hidden">
                  <MobileMenu
                    navItems={navItems}
                    cta={cta}
                    showSearch={showSearch}
                    showThemeToggle={showThemeToggle}
                    isUppercase={Boolean(navStyle?.uppercase)}
                  />
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center gap-6 w-full pt-2 border-t border-border/40">
                <HeaderNav
                  navItems={navItems}
                  navStyle={navStyle}
                  showSearch={showSearch}
                  showThemeToggle={showThemeToggle}
                />

                {cta?.enableCTA && <div className="pl-4">{renderCTA('sm')}</div>}
              </div>
            </div>
          )}

          {/* Split Layout: Nav Left, Logo Center, CTA Right */}
          {isSplit && (
            <div className="flex items-center justify-between gap-4">
              <div className="hidden lg:flex items-center flex-1 justify-start">
                <HeaderNav
                  navItems={navItems}
                  navStyle={navStyle}
                  showSearch={showSearch}
                  showThemeToggle={false}
                />
              </div>

              <Link
                href="/"
                className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                <Logo
                  logo={headerLogo}
                  logoOnTransparent={logoOnTransparent}
                  logoSize={logoSize}
                  siteName={siteName}
                  isTransparent={isCurrentlyTransparent}
                  priority="high"
                  loading="eager"
                />
              </Link>

              <div className="flex items-center justify-end flex-1 gap-4">
                {showThemeToggle && (
                  <div className="hidden lg:flex items-center">
                    <HeaderNav
                      navItems={[]}
                      showSearch={false}
                      showThemeToggle={true}
                    />
                  </div>
                )}

                {cta?.enableCTA && <div className="hidden lg:flex">{renderCTA('sm')}</div>}

                <MobileMenu
                  navItems={navItems}
                  cta={cta}
                  showSearch={showSearch}
                  showThemeToggle={showThemeToggle}
                  isUppercase={Boolean(navStyle?.uppercase)}
                />
              </div>
            </div>
          )}
        </Container>
      </header>
    </>
  )
}
