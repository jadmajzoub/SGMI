import { TableCell, TableRow } from '@mui/material'
import BaseTable from '../common/BaseTable'
import { ProductionTotal } from '../../types/production'

const PRODUCTION_TOTAL_DATA: ProductionTotal[] = [
  { product: 'Mash Cup Vegetables', totalKg: 1230 },
  { product: 'Mash Cup Cheese', totalKg: 860 },
]

const TOTAL_COLUMNS = [
  { key: 'product', label: 'Product' },
  { key: 'totalKg', label: 'Total (kg)' },
]

export default function TotalTable() {
  const renderRow = (total: ProductionTotal, index: number) => (
    <TableRow key={index}>
      <TableCell>{total.product}</TableCell>
      <TableCell>{total.totalKg}</TableCell>
    </TableRow>
  )

  return (
    <BaseTable
      title="Total to Produce"
      columns={TOTAL_COLUMNS}
      data={PRODUCTION_TOTAL_DATA}
      renderRow={renderRow}
      minWidth={{ xs: 1, md: 600 }}
    />
  )
}
