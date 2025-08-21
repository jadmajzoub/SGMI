import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material'
import { ReactNode } from 'react'
import TableSkeleton from './TableSkeleton'

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
  isLoading?: boolean
  loadingRows?: number
  emptyMessage?: string
}

const DEFAULT_EMPTY_MESSAGE = 'Nenhum dado encontrado'
const DEFAULT_LOADING_ROWS = 5

export default function BaseTable<T>({ 
  title, 
  columns, 
  data, 
  renderRow, 
  minWidth = { xs: 1, md: 600 },
  isLoading = false,
  loadingRows = DEFAULT_LOADING_ROWS,
  emptyMessage = DEFAULT_EMPTY_MESSAGE
}: BaseTableProps<T>) {
  if (isLoading) {
    return (
      <TableSkeleton 
        title={title}
        columns={columns}
        rows={loadingRows}
        minWidth={minWidth}
      />
    )
  }

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
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            data.map(renderRow)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}