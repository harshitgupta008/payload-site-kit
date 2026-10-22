'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ title?: string }>()
  const rowNum = data.rowNumber !== undefined ? String(data.rowNumber + 1).padStart(2, '0') : ''
  const title = data?.data?.title

  return <div>{title ? `Section: ${title}` : `Section ${rowNum || '01'}`}</div>
}
