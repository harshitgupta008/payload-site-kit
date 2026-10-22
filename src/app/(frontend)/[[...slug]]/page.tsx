import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export const dynamicParams = true

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params =
    pages.docs
      ?.filter((doc) => {
        return doc.slug && doc.slug !== 'home' && doc.slug !== '/' && doc.slug.trim() !== ''
      })
      .map(({ slug }) => {
        return { slug: slug.replace(/^\//, '').split('/') }
      }) || []

  return [{ slug: [] }, ...params]
}

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug: rawSlug } = await paramsPromise

  // Reject the slug "home" typed directly in the URL by redirecting to "/"
  if (rawSlug && rawSlug.length === 1 && rawSlug[0].toLowerCase() === 'home') {
    redirect('/')
  }

  const slug = rawSlug && rawSlug.length > 0 ? rawSlug.join('/') : 'home'
  const decodedSlug = decodeURIComponent(slug)
  const isHome = decodedSlug === 'home' || decodedSlug === '/' || decodedSlug === ''
  const url = isHome ? '/' : '/' + decodedSlug

  let page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Template's fallback for a missing "home" page
  if (!page && isHome) {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const hasOldHero = Boolean(hero?.type && hero.type !== 'none')

  return (
    <article className="pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} hasOldHero={hasOldHero} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const { slug: rawSlug } = await paramsPromise
  const slug = rawSlug && rawSlug.length > 0 ? rawSlug.join('/') : 'home'
  const decodedSlug = decodeURIComponent(slug)
  const isHome = decodedSlug === 'home' || decodedSlug === '/' || decodedSlug === ''

  let page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: decodedSlug,
  })

  if (!page && isHome) {
    page = homeStatic
  }

  return generateMeta({ doc: page, isDraft: draft })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const isHome = slug === 'home' || slug === '/' || slug === ''

  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: isHome
      ? {
          or: [
            {
              slug: {
                equals: 'home',
              },
            },
            {
              slug: {
                equals: '/',
              },
            },
            {
              slug: {
                equals: '',
              },
            },
          ],
        }
      : {
          slug: {
            equals: slug,
          },
        },
  })

  return result.docs?.[0] || null
})
