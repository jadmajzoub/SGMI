import {
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useMemo, useState } from 'react';

dayjs.extend(customParseFormat)

export type DataRow = {
  date: string
  shift: string
  product: string
  batches: number
  approxKg: number
}

type Order = 'asc' | 'desc'

interface Props {
  rows: DataRow[]
  pageSize?: number
}

function parseRowDate(value: string) {
  let d = dayjs(value, 'DD/MM/YYYY', true)
  if (!d.isValid()) d = dayjs(value)
  return d
}

export default function DataTable({ rows, pageSize = 10 }: Props) {
  const [orderBy, setOrderBy] = useState<keyof DataRow>('date')
  const [order, setOrder] = useState<Order>('asc')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pageSize)

  const handleSort = (property: keyof DataRow) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedRows = useMemo(() => {
    return rows.slice().sort((a, b) => {
      const va = a[orderBy]
      const vb = b[orderBy]
      if (orderBy === 'date') {
        const da = parseRowDate(String(va))
        const db = parseRowDate(String(vb))
        const cmp = da.valueOf() - db.valueOf()
        return order === 'asc' ? cmp : -cmp
      }
      if (typeof va === 'number' && typeof vb === 'number') {
        return order === 'asc' ? va - vb : vb - va
      }
      return order === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
  }, [rows, orderBy, order])

  const pageRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Tabela */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === 'date' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  Data
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'shift' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'shift'}
                  direction={orderBy === 'shift' ? order : 'asc'}
                  onClick={() => handleSort('shift')}
                >
                  Turno
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'product' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'product'}
                  direction={orderBy === 'product' ? order : 'asc'}
                  onClick={() => handleSort('product')}
                >
                  Produto
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'batches' ? order : false} align="right">
                <TableSortLabel
                  active={orderBy === 'batches'}
                  direction={orderBy === 'batches' ? order : 'asc'}
                  onClick={() => handleSort('batches')}
                >
                  Bateladas
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'approxKg' ? order : false} align="right">
                <TableSortLabel
                  active={orderBy === 'approxKg'}
                  direction={orderBy === 'approxKg' ? order : 'asc'}
                  onClick={() => handleSort('approxKg')}
                >
                  Qtde Aprox. (kg)
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Nenhum registro encontrado
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((row, i) => (
                <TableRow key={i} hover>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.shift}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell align="right">{row.batches}</TableCell>
                  <TableCell align="right">{row.approxKg.toLocaleString('pt-BR')}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={sortedRows.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Linhas por página"
      />
    </Paper>
  )
}
