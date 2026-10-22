'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { fields } from '@/blocks/Form/fields'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export interface DynamicFormProps {
  form: any
  fieldLayout?: 'stacked' | 'two-column'
  isPopup?: boolean
  onClose?: () => void
  className?: string
  submitButtonText?: string
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  form: formProp,
  fieldLayout = 'two-column',
  isPopup = false,
  onClose,
  className,
  submitButtonText,
}) => {
  const [fetchedForm, setFetchedForm] = useState<FormType | null>(
    typeof formProp === 'object' && formProp !== null ? formProp : null,
  )
  const [isFetchingForm, setIsFetchingForm] = useState<boolean>(
    !fetchedForm && Boolean(formProp),
  )

  React.useEffect(() => {
    if (typeof formProp === 'object' && formProp !== null) {
      setFetchedForm(formProp)
      setIsFetchingForm(false)
    } else if (typeof formProp === 'string' || typeof formProp === 'number') {
      setIsFetchingForm(true)
      fetch(`${getClientSideURL()}/api/forms/${formProp}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          setFetchedForm(data)
          setIsFetchingForm(false)
        })
        .catch(() => {
          setIsFetchingForm(false)
        })
    }
  }, [formProp])

  const formObj = fetchedForm
  const formID = formObj?.id || (typeof formProp === 'string' ? formProp : '')
  const confirmationType = formObj?.confirmationType || 'message'
  const confirmationMessage = formObj?.confirmationMessage
  const redirect = formObj?.redirect
  const submitButtonLabel = submitButtonText || formObj?.submitButtonLabel || 'Submit'

  const formMethods = useForm()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      setErrorMessage(null)
      setIsLoading(true)

      // Honeypot check
      if (data.website_url_hp) {
        // Silently simulate success to spammers
        setIsLoading(false)
        setHasSubmitted(true)
        return
      }

      // Prepare submissionData array
      const submissionData = Object.entries(data)
        .filter(([key]) => key !== 'website_url_hp')
        .map(([field, value]) => ({
          field,
          value: typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value ?? ''),
        }))

      const sourcePage = typeof window !== 'undefined' ? window.location.pathname : '/'

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form: formID,
            submissionData,
            sourcePage,
          }),
        })

        const res = await req.json()

        if (!req.ok) {
          setIsLoading(false)
          setErrorMessage(
            res.errors?.[0]?.message || res.message || 'Unable to submit form. Please check your entries.',
          )
          return
        }

        setIsLoading(false)
        setHasSubmitted(true)

        if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
      } catch (err: any) {
        setIsLoading(false)
        setErrorMessage(err.message || 'Something went wrong. Please try again.')
      }
    },
    [formID, confirmationType, redirect, router],
  )

  if (isFetchingForm) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span>Loading form...</span>
      </div>
    )
  }

  if (!formObj) {
    return (
      <div className="p-6 text-center text-muted-foreground bg-muted/30 rounded-lg border border-border">
        Form not found or has been removed.
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      <FormProvider {...formMethods}>
        {/* Success Confirmation State */}
        {hasSubmitted && confirmationType === 'message' && (
          <div
            role="status"
            aria-live="polite"
            className="p-6 md:p-8 bg-card border border-border rounded-[var(--radius)] shadow-sm text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            {confirmationMessage ? (
              <RichText data={confirmationMessage} className="max-w-md mx-auto" />
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-2">Thank you!</h3>
                <p className="text-muted-foreground text-sm">
                  Your submission has been received. We will get back to you shortly.
                </p>
              </div>
            )}
            {isPopup && onClose && (
              <Button type="button" variant="outline" className="mt-6" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        )}

        {/* Form Fields */}
        {!hasSubmitted && (
          <form
            id={`form-${formID}`}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Honeypot field for spam prevention */}
            <input
              type="text"
              id="website_url_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none -left-[9999px]"
              {...register('website_url_hp')}
            />

            {/* Error Banner */}
            {errorMessage && (
              <div
                role="alert"
                aria-live="assertive"
                className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div
              className={cn(
                'grid gap-4 sm:gap-5',
                fieldLayout === 'two-column' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1',
              )}
            >
              {formObj.fields?.map((field: any, index: number) => {
                const FieldComponent = fields?.[field.blockType as keyof typeof fields]
                if (!FieldComponent) return null

                const isFullWidth =
                  fieldLayout === 'stacked' ||
                  !field.width ||
                  Number(field.width) >= 100 ||
                  field.blockType === 'textarea' ||
                  field.blockType === 'message'

                return (
                  <div
                    key={field.id || index}
                    className={cn(isFullWidth ? 'md:col-span-2' : 'md:col-span-1')}
                  >
                    <FieldComponent
                      {...field}
                      form={formObj}
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  </div>
                )
              })}
            </div>

            <div className="pt-2 flex items-center justify-start">
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full sm:w-auto font-semibold px-8 min-h-[44px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>{submitButtonLabel}</span>
                )}
              </Button>
            </div>
          </form>
        )}
      </FormProvider>
    </div>
  )
}
