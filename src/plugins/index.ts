import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? doc.title : 'Home'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()
  if (!doc) return url

  // For posts
  if ('categories' in doc || 'populatedAuthors' in doc) {
    const slug = typeof doc.slug === 'string' ? doc.slug.replace(/^\//, '') : ''
    return `${url}/posts/${slug}`
  }

  // For pages
  const slug = typeof doc.slug === 'string' ? doc.slug.replace(/^\//, '') : ''
  const isHome = slug === 'home' || slug === ''
  return isHome ? url : `${url}/${slug}`
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
      radio: true,
      phone: ({
        slug: 'phone',
        labels: {
          singular: 'Phone',
          plural: 'Phone Fields',
        },
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'name',
                type: 'text',
                label: 'Field Name',
                required: true,
                admin: { width: '50%' },
              },
              {
                name: 'label',
                type: 'text',
                label: 'Field Label',
                admin: { width: '50%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'placeholder',
                type: 'text',
                label: 'Placeholder',
                admin: { width: '50%' },
              },
              {
                name: 'width',
                type: 'number',
                label: 'Field Width (%)',
                admin: { width: '50%' },
              },
            ],
          },
          {
            name: 'required',
            type: 'checkbox',
            label: 'Required',
          },
        ],
      } as any),
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                ],
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      admin: {
        defaultColumns: ['form', 'sourcePage', 'createdAt'],
      },
      access: {
        create: () => true,
        read: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'sourcePage',
          type: 'text',
          label: 'Source Page',
          admin: {
            readOnly: true,
            position: 'sidebar',
          },
        },
      ],
      hooks: {
        beforeValidate: [
          async ({ data, req, operation }) => {
            if (operation === 'create' && data) {
              // 1. Honeypot check: reject if website_url_hp field is present and filled
              const submissionItems = Array.isArray(data.submissionData) ? data.submissionData : []
              const honeypotItem = submissionItems.find((item: any) => item.field === 'website_url_hp')
              if (honeypotItem && honeypotItem.value) {
                throw new Error('Spam submission detected.')
              }

              // 2. IP Rate Limiting (in-memory sliding window, max 5 submissions / 60 seconds)
              const ip =
                req.headers?.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                req.headers?.get('x-real-ip') ||
                '127.0.0.1'

              const now = Date.now()
              const tracker = (global as any).__submissionTracker || new Map<string, number[]>()
              ;(global as any).__submissionTracker = tracker

              const timestamps = (tracker.get(ip) || []).filter((t: number) => now - t < 60000)
              if (timestamps.length >= 5) {
                throw new Error('Too many requests. Please wait a minute before submitting again.')
              }
              timestamps.push(now)
              tracker.set(ip, timestamps)

              // 3. Form existence check
              const formId = typeof data.form === 'object' ? data.form?.id : data.form
              if (!formId) {
                throw new Error('A valid form ID is required.')
              }

              const existingForm = await req.payload.findByID({
                collection: 'forms',
                id: formId,
              })

              if (!existingForm) {
                throw new Error('The requested form does not exist.')
              }

              // Filter out honeypot item from data to store cleanly
              data.submissionData = submissionItems.filter((item: any) => item.field !== 'website_url_hp')

              // 4. Validate submitted fields against defined fields in form
              const definedFields = (existingForm.fields || []) as any[]
              const definedFieldNames = new Set(definedFields.map((f) => f.name).filter(Boolean))
              const requiredFieldNames = new Set(
                definedFields.filter((f) => f.required).map((f) => f.name).filter(Boolean),
              )

              const submittedFieldMap = new Map<string, any>()
              for (const item of data.submissionData) {
                if (!definedFieldNames.has(item.field)) {
                  throw new Error(`Field "${item.field}" is not defined on this form.`)
                }
                if (typeof item.value === 'string' && item.value.length > 2000) {
                  throw new Error(`Field "${item.field}" exceeds the maximum length of 2000 characters.`)
                }
                submittedFieldMap.set(item.field, item.value)
              }

              // 5. Validate required fields
              for (const reqField of requiredFieldNames) {
                const val = submittedFieldMap.get(reqField)
                if (val === undefined || val === null || val === '') {
                  throw new Error(`Required field "${reqField}" is missing.`)
                }
              }

              // 6. Validate email fields format
              for (const fieldDef of definedFields) {
                if (fieldDef.blockType === 'email') {
                  const emailVal = submittedFieldMap.get(fieldDef.name)
                  if (emailVal && typeof emailVal === 'string') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailRegex.test(emailVal.trim())) {
                      throw new Error(`Please provide a valid email address for "${fieldDef.label || fieldDef.name}".`)
                    }
                  }
                }
              }
            }
            return data
          },
        ],
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
