import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import { ActionButton } from '@/components/ActionButton'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'
import type { Post, Media as MediaType } from '@/payload-types'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export interface CardItemProps {
  id?: string | null
  image?: string | MediaType | null
  imagePosition?: 'top' | 'left' | 'none' | null
  imageRatio?: '16:9' | '4:3' | '1:1' | null
  icon?: string | MediaType | null
  badge?: string | null
  title: string
  description?: string | null
  enableLink?: boolean | null
  link?: any
  linkLabel?: string | null
  width?: '1/3' | '1/2' | '2/3' | 'full' | null
  actionData?: any
  action?: any
  form?: any
  popupContent?: any
  phone?: string | null
  whatsappMessage?: string | null
  file?: any
}

export interface CardProps {
  card?: CardItemProps
  cardStyle?: 'shadow' | 'border' | 'flat' | null
  hover?: 'none' | 'lift' | null
  textAlign?: 'left' | 'center' | null
  numberPrefix?: string | null
  accentColor?: 'primary' | 'secondary' | 'foreground' | null
  className?: string
  // Legacy Post card props
  doc?: CardPostData
  alignItems?: 'center'
  relationTo?: string
  showCategories?: boolean
  title?: string
}

const cardStyleClasses: Record<string, string> = {
  shadow: 'bg-card border border-border/60 shadow-sm hover:shadow-md',
  border: 'bg-card border-2 border-border shadow-none',
  flat: 'bg-muted/50 border border-transparent shadow-none',
}

const hoverClasses: Record<string, string> = {
  none: '',
  lift: 'hover:-translate-y-1.5 transition-transform duration-300',
}

const textAlignClasses: Record<string, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
}

const imageRatioClasses: Record<string, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
}

const accentTextClasses: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary-foreground',
  foreground: 'text-foreground',
}

export const Card: React.FC<CardProps> = (props) => {
  // If rendering a blog post card from archive / search / related posts
  if (props.doc) {
    const { doc, relationTo = 'posts', showCategories = false, className, title: titleFromProps } = props
    const { slug, categories, meta, title } = doc
    const { description, image: metaImage } = meta || {}

    const hasCategories = categories && Array.isArray(categories) && categories.length > 0
    const titleToUse = titleFromProps || title
    const sanitizedDescription = description?.replace(/\s/g, ' ')
    const href = `/${relationTo}/${slug}`

    return (
      <article
        className={cn(
          'relative group border border-border rounded-[var(--radius)] overflow-hidden bg-card hover:shadow-md transition-shadow flex flex-col',
          className,
        )}
      >
        <Link href={href} className="absolute inset-0 z-10" aria-label={titleToUse}>
          <span className="sr-only">{titleToUse}</span>
        </Link>

        <div className="relative w-full aspect-video bg-muted overflow-hidden">
          {metaImage && typeof metaImage !== 'string' ? (
            <Media resource={metaImage} size="33vw" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1">
          {showCategories && hasCategories && (
            <div className="uppercase text-xs font-semibold tracking-wider text-primary mb-2">
              {categories.map((category, index) => {
                if (typeof category === 'object') {
                  const categoryTitle = category?.title || 'Untitled category'
                  const isLast = index === categories.length - 1
                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }
                return null
              })}
            </div>
          )}

          {titleToUse && (
            <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
              {titleToUse}
            </h3>
          )}

          {sanitizedDescription && (
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {sanitizedDescription}
            </p>
          )}
        </div>
      </article>
    )
  }

  // Otherwise rendering a Content Card from ServicesGrid / Cards block
  const {
    card,
    cardStyle = 'shadow',
    hover = 'lift',
    textAlign = 'left',
    numberPrefix,
    accentColor = 'primary',
    className,
  } = props

  if (!card) return null

  const {
    image,
    imagePosition = 'top',
    imageRatio = '16:9',
    icon,
    badge,
    title,
    description,
    enableLink,
    link,
    linkLabel,
  } = card

  const styleClass = cardStyleClasses[cardStyle || 'shadow'] || cardStyleClasses.shadow
  const hoverClass = hoverClasses[hover || 'lift'] || hoverClasses.lift
  const alignClass = textAlignClasses[textAlign || 'left'] || textAlignClasses.left
  const ratioClass = imageRatioClasses[imageRatio || '16:9'] || imageRatioClasses['16:9']
  const accentText = accentTextClasses[accentColor || 'primary'] || accentTextClasses.primary

  const actionData = card.actionData || {}
  const actionType = card.action || actionData.action || 'link'
  const isInteractiveAction =
    actionType === 'popupForm' ||
    actionType === 'popupContent' ||
    actionType === 'tel' ||
    actionType === 'whatsapp' ||
    actionType === 'download'

  const hasActionOrLink = Boolean(
    enableLink && (link || actionData.link || isInteractiveAction),
  )
  const isStretchedLink = hasActionOrLink && !isInteractiveAction && Boolean(actionData.link || link)

  const imageMedia = typeof image === 'object' && image !== null ? (image as MediaType) : null
  const imageUrl = imageMedia?.url || (typeof image === 'string' ? image : null)
  const imageAlt = imageMedia?.alt || title

  const iconMedia = typeof icon === 'object' && icon !== null ? (icon as MediaType) : null
  const iconUrl = iconMedia?.url || (typeof icon === 'string' ? icon : null)
  const iconAlt = iconMedia?.alt || title

  const showImage = Boolean(imageUrl && imagePosition !== 'none')
  const isImageLeft = showImage && imagePosition === 'left'

  return (
    <div
      className={cn(
        'group relative flex flex-col p-6 sm:p-8 rounded-[var(--radius)] transition-all duration-300 overflow-hidden',
        styleClass,
        hoverClass,
        alignClass,
        isImageLeft && 'sm:flex-row sm:gap-6 sm:items-start',
        className,
      )}
    >
      {/* Stretched Link covering the entire card without nested anchors */}
      {isStretchedLink && (
        <CMSLink
          {...(actionData.link || link)}
          className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[var(--radius)]"
          aria-label={linkLabel || title}
        >
          <span className="sr-only">{linkLabel || title}</span>
        </CMSLink>
      )}

      {/* Featured Card Image */}
      {showImage && (
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-[calc(var(--radius)-4px)] bg-muted mb-6',
            ratioClass,
            isImageLeft && 'sm:w-1/3 sm:mb-0 sm:shrink-0',
          )}
        >
          <Image
            src={imageUrl!}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Legacy Icon Fallback (rendered if no featured card image) */}
      {!showImage && iconUrl && (
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 overflow-hidden relative shrink-0">
          <Image
            src={iconUrl}
            alt={iconAlt}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
      )}

      <div className={cn('flex flex-col flex-1 w-full', alignClass)}>
        {badge && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
            {badge}
          </span>
        )}

        <h3 className="text-xl sm:text-2xl font-bold font-heading mb-3 tracking-tight text-foreground">
          {numberPrefix && (
            <span className={cn('mr-2 font-black', accentText)} aria-hidden="true">
              {numberPrefix}
            </span>
          )}
          {title}
        </h3>

        {description && (
          <p className="text-muted-foreground leading-relaxed flex-1 mb-6 text-base">
            {description}
          </p>
        )}

        {hasActionOrLink && (
          <div className="mt-auto pt-4 relative z-20">
            <ActionButton
              actionData={actionData}
              action={actionType}
              link={actionData.link || link}
              form={card.form || actionData.form}
              popupContent={card.popupContent || actionData.popupContent}
              phone={card.phone || actionData.phone}
              whatsappMessage={card.whatsappMessage || actionData.whatsappMessage}
              file={card.file || actionData.file}
              label={linkLabel || 'Read more'}
              style="ghost"
              icon="arrow-right"
              className="p-0 h-auto font-semibold text-primary hover:text-primary/80 hover:bg-transparent justify-start"
            />
          </div>
        )}
      </div>
    </div>
  )
}
