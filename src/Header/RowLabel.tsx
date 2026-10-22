'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ label?: string; link?: { label?: string } }>()
  const rowNum = data.rowNumber !== undefined ? String(data.rowNumber + 1).padStart(2, '0') : ''
  const label = data?.data?.label || data?.data?.link?.label

  return <div>{label ? `Nav: ${label}` : `Nav Item ${rowNum || '01'}`}</div>
}
