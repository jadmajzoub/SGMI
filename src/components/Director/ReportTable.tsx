import { TableCell, TableRow } from '@mui/material'
import BaseTable from '../common/BaseTable'
import { ProductionReport } from '../../types/production'

const PRODUCTION_REPORT_DATA: ProductionReport[] = [
  { date: '2025-08-10', shift: 'Morning', product: 'Mash Cup Vegetables', batches: 12, totalKg: 180 },
  { date: '2025-08-10', shift: 'Afternoon', product: 'Mash Cup Cheese', batches: 10, totalKg: 150 },
]

const REPORT_COLUMNS = [
  { key: 'date', label: 'Date' },
  { key: 'shift', label: 'Shift' },
  { key: 'product', label: 'Product' },
  { key: 'batches', label: 'Number of Batches' },
  { key: 'totalKg', label: 'Total (kg)' },
]

export default function ReportTable() {
  const renderRow = (report: ProductionReport, index: number) => (
    <TableRow key={index}>
      <TableCell>{report.date}</TableCell>
      <TableCell>{report.shift}</TableCell>
      <TableCell>{report.product}</TableCell>
      <TableCell>{report.batches}</TableCell>
      <TableCell>{report.totalKg}</TableCell>
    </TableRow>
  )

  return (
    <BaseTable
      title="Production Report"
      columns={REPORT_COLUMNS}
      data={PRODUCTION_REPORT_DATA}
      renderRow={renderRow}
      minWidth={{ xs: 1, md: 720 }}
    />
  )
}
