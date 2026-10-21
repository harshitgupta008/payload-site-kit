import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

import Link from 'next/link'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc || {}
  if (!value || typeof value !== 'object') {
    return '#'
  }
  const rawSlug = (value as any).slug
  const cleanSlug = typeof rawSlug === 'string' ? rawSlug.replace(/^\//, '') : ''

  if (relationTo === 'pages') {
    const isHome = cleanSlug === 'home' || cleanSlug === ''
    return isHome ? '/' : `/${cleanSlug}`
  }

  if (relationTo === 'posts') {
    return `/posts/${cleanSlug}`
  }

  return `/${relationTo ? `${relationTo}/` : ''}${cleanSlug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  link: ({ node, nodesToJSX }) => {
    let href = '#'
    if (node.fields.linkType === 'internal') {
      href = internalDocToHref({ linkNode: node })
    } else if (node.fields.url) {
      href = node.fields.url
    }

    const newTab = Boolean(node.fields.newTab)
    const isInternal =
      node.fields.linkType === 'internal' ||
      href.startsWith('/') ||
      href.startsWith('#') ||
      href.startsWith('./')

    const rel = newTab ? 'noopener noreferrer' : undefined
    const target = newTab ? '_blank' : undefined

    const children = nodesToJSX({
      nodes: node.children,
    })

    if (isInternal) {
      return (
        <Link href={href} prefetch={true} rel={rel} target={target}>
          {children}
        </Link>
      )
    }

    return (
      <a href={href} rel={rel} target={target}>
        {children}
      </a>
    )
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
