import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const isHome = doc.slug === 'home' || doc.slug === '/' || !doc.slug
      const path = isHome ? '/' : `/${doc.slug.replace(/^\//, '')}`

      payload.logger.info(`Revalidating page at path: ${path}`)

      try {
        revalidatePath(path)
        revalidateTag('pages-sitemap', 'max')
      } catch (err) {
        payload.logger.warn(`Could not revalidate path ${path}: ${err}`)
      }
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const isOldHome =
        previousDoc.slug === 'home' || previousDoc.slug === '/' || !previousDoc.slug
      const oldPath = isOldHome ? '/' : `/${previousDoc.slug.replace(/^\//, '')}`

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      try {
        revalidatePath(oldPath)
        revalidateTag('pages-sitemap', 'max')
      } catch (err) {
        payload.logger.warn(`Could not revalidate old path ${oldPath}: ${err}`)
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const isHome = doc?.slug === 'home' || doc?.slug === '/' || !doc?.slug
    const path = isHome ? '/' : `/${doc?.slug ? doc.slug.replace(/^\//, '') : ''}`
    try {
      revalidatePath(path)
      revalidateTag('pages-sitemap', 'max')
    } catch {
      // outside Next.js request context
    }
  }

  return doc
}
