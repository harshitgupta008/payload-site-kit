'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ name?: string }>()
  const rowNum = data.rowNumber !== undefined ? String(data.rowNumber + 1).padStart(2, '0') : ''
  const name = data?.data?.name

  return <div>{name ? `Testimonial: ${name}` : `Review ${rowNum || '01'}`}</div>
}
