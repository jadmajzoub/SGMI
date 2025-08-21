import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Column {
  key: string
  label: string
}

interface BaseTableProps<T> {
  title: string
  columns: Column[]
  data: T[]
  renderRow: (item: T, index: number) => ReactNode
  minWidth?: { xs: number; md?: number }
}

export default function BaseTable<T>({ title, columns, data, renderRow, minWidth = { xs: 1, md: 600 } }: BaseTableProps<T>) {
  return (
    <TableContainer component={Paper} sx={{ minWidth }}>
      <Typography variant="h6" fontWeight={700} p={2}>{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(renderRow)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}