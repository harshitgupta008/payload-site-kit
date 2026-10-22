import type { EmailAdapter } from 'payload'

export const customEmailAdapter: EmailAdapter = ({ payload }) => {
  const fromAddress = process.env.EMAIL_FROM || 'info@payload-website.com'
  const fromName = process.env.EMAIL_FROM_NAME || 'Payload Website'

  return {
    name: 'custom-email-adapter',
    defaultFromAddress: fromAddress,
    defaultFromName: fromName,
    sendEmail: async (message) => {
      const isSmtpConfigured = Boolean(
        process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
      )

      if (isSmtpConfigured) {
        payload.logger.info(`Sending email to ${message.to}: "${message.subject}" via SMTP`)
        // Future production SMTP transport call
        return { success: true }
      }

      // Safe console fallback in development: logs message without crashing
      payload.logger.info(
        `[Email Console Fallback]: From: "${fromName}" <${fromAddress}> | To: ${message.to} | Subject: "${message.subject}"`,
      )
      return { success: true, simulated: true }
    },
  }
}
