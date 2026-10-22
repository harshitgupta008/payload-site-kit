import React from 'react'
import RichText from '@/components/RichText'
import { ActionButton } from '@/components/ActionButton'

export interface CallToActionBlockProps {
  richText?: any
  links?: { link: any; id?: string | null }[] | null
  actions?: any[] | null
}

export const CallToActionBlock: React.FC<CallToActionBlockProps> = ({ links, actions, richText }) => {
  const buttonItems = actions && actions.length > 0 ? actions : links || []

  return (
    <div className="container">
      <div className="bg-card rounded-2xl border-border border p-8 md:p-12 flex flex-col gap-8 md:flex-row md:justify-between md:items-center shadow-sm">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-wrap gap-4 items-center shrink-0">
          {buttonItems.map((item: any, i: number) => {
            const actionData = item.actionData || item
            return (
              <ActionButton
                key={item.id || i}
                size="lg"
                actionData={actionData}
                action={actionData?.action || item.action}
                form={actionData?.form || item.form}
                popupContent={actionData?.popupContent || item.popupContent}
                phone={actionData?.phone || item.phone}
                whatsappMessage={actionData?.whatsappMessage || item.whatsappMessage}
                file={actionData?.file || item.file}
                link={actionData?.link || item.link}
                label={actionData?.label || item.label || item.link?.label || 'Learn More'}
                appearance={item.link?.appearance}
                style={actionData?.style || (item.link?.appearance === 'outline' ? 'outline' : 'solid')}
                showArrow={Boolean(actionData?.showArrow)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
