import type { RadioField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Error } from '../Error'

export const Radio: React.FC<
  RadioField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, options, register, required }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>
        {label}
        {required && (
          <span className="text-destructive ml-1">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <div className="flex flex-col gap-2 pt-1">
        {options?.map((option, idx) => (
          <label key={idx} className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              value={option.value}
              defaultChecked={defaultValue === option.value}
              className="text-primary focus:ring-primary h-4 w-4 border-border rounded-full"
              {...register(name, { required })}
            />
            <span className="text-foreground">{option.label}</span>
          </label>
        ))}
      </div>
      {errors[name] && <Error name={name} />}
    </div>
  )
}
