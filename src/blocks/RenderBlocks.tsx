import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ImageTextBlock } from '@/blocks/ImageText/Component'
import { HeroBlockComponent } from '@/blocks/HeroBlock/Component'
import { ServicesGridBlock } from '@/blocks/ServicesGrid/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { PricingBlock } from '@/blocks/Pricing/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  imageText: ImageTextBlock,
  heroBlock: HeroBlockComponent,
  servicesGrid: ServicesGridBlock,
  faq: FAQBlock,
  testimonials: TestimonialsBlock,
  pricing: PricingBlock,
  gallery: GalleryBlock,
}

export const RenderBlocks: React.FC<{
  blocks?: Page['layout']
  hasOldHero?: boolean
}> = (props) => {
  const { blocks, hasOldHero } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...(block as any)} disableInnerContainer hasOldHero={hasOldHero} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
