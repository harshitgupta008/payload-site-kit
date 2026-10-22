import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Error } from '../Error'

export interface PhoneFieldProps {
  name: string
  label?: string
  placeholder?: string
  defaultValue?: string
  required?: boolean
  width?: number
  errors: Partial<FieldErrorsImpl>
  register: UseFormRegister<FieldValues>
}

export const Phone: React.FC<PhoneFieldProps> = ({
  name,
  defaultValue,
  errors,
  label,
  placeholder = '+1 (555) 000-0000',
  register,
  required,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>
        {label || 'Phone Number'}
        {required && (
          <span className="text-destructive ml-1">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="tel"
        placeholder={placeholder}
        {...register(name, {
          required,
          pattern: {
            value: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
            message: 'Please enter a valid telephone number',
          },
        })}
      />
      {errors[name] && <Error name={name} />}
    </div>
  )
}
