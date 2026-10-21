import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateSiteSettings: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating site settings`)
    try {
      revalidateTag('site-settings', 'max')
      revalidateTag('global_siteSettings', 'max')
      revalidatePath('/', 'layout')
    } catch (err) {
      payload.logger.warn(`Could not revalidate site settings: ${err}`)
    }
  }

  return doc
}
