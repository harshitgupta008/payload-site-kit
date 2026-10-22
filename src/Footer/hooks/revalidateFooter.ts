import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    try {
      payload.logger.info(`Revalidating footer`)
      revalidateTag('global_footer', 'max')
    } catch (err) {
      payload.logger.warn(`Could not revalidate footer: ${err}`)
    }
  }

  return doc
}
