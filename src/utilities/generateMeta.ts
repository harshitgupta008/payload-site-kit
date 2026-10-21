import type { Metadata } from 'next'
import type { Media, Page, Post, Config } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getCachedGlobal } from './getGlobals'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null): string | null => {
  const serverUrl = getServerSideURL()
  if (!image) return null

  if (typeof image === 'object' && 'url' in image && image.url) {
    const ogUrl = image.sizes?.og?.url
    return ogUrl ? (ogUrl.startsWith('http') ? ogUrl : serverUrl + ogUrl) : (image.url.startsWith('http') ? image.url : serverUrl + image.url)
  }

  return null
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  isDraft?: boolean
}): Promise<Metadata> => {
  const { doc, isDraft = false } = args

  // Reuse the same cached SiteSettings read used by layout.tsx (no extra uncached DB query)
  const siteSettings = await getCachedGlobal('siteSettings', 1)()
  const siteName = siteSettings?.siteName || 'Payload Website'
  const serverUrl = getServerSideURL()

  // Determine path and canonical URL
  const rawSlug = doc?.slug
  const cleanSlug = typeof rawSlug === 'string' ? rawSlug.replace(/^\//, '') : ''
  const isPost = Boolean(doc && ('categories' in doc || 'populatedAuthors' in doc))
  const isHome = !isPost && (cleanSlug === 'home' || cleanSlug === '')

  const canonicalPath = isPost ? `/posts/${cleanSlug}` : (isHome ? '/' : `/${cleanSlug}`)
  const canonicalUrl = `${serverUrl}${canonicalPath === '/' ? '' : canonicalPath}`

  // Title:
  // - If home and no custom SEO title: return { absolute: siteName } so it renders site name without doubled suffix.
  // - If custom SEO title provided: return that title (layout template will format as "%s | {siteName}").
  // - Otherwise: doc title or fallback.
  let title: Metadata['title']
  const displayTitle = doc?.meta?.title || doc?.title

  if (isHome) {
    if (doc?.meta?.title) {
      title = doc.meta.title
    } else {
      title = { absolute: siteName }
    }
  } else {
    title = displayTitle || 'Page'
  }

  // Description fallback to SiteSettings defaultDescription
  const description =
    doc?.meta?.description ||
    siteSettings?.defaultDescription ||
    'An open-source website built with Next.js and Payload CMS.'

  // Image fallback: page meta image -> SiteSettings defaultOgImage -> template default
  const ogImage =
    getImageURL(doc?.meta?.image) ||
    getImageURL(siteSettings?.defaultOgImage) ||
    `${serverUrl}/website-template-OG.webp`

  // Robots: draft mode or page noIndex checkbox
  const hasNoIndex = isDraft || Boolean((doc as any)?.meta?.noIndex)
  const robots: Metadata['robots'] = hasNoIndex
    ? {
        index: false,
        follow: false,
      }
    : {
        index: true,
        follow: true,
      }

  const ogTitle = typeof title === 'object' && 'absolute' in title ? title.absolute : (displayTitle || siteName)

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      siteName,
      title: ogTitle,
      type: 'website',
      url: canonicalPath,
    }),
    robots,
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: ogImage ? [ogImage] : undefined,
      title: ogTitle,
    },
  }
}
