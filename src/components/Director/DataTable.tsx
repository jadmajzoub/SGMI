import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, TablePagination, Toolbar, Typography,
  Box, FormControl, InputLabel, Select, MenuItem, TextField
} from '@mui/material'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(isBetween)
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

  const [productFilter, setProductFilter] = useState<string>('__ALL__')
  const [startDate, setStartDate] = useState<string>('') // YYYY-MM-DD
  const [endDate, setEndDate] = useState<string>('')     // YYYY-MM-DD

  const handleSort = (property: keyof DataRow) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const productOptions = useMemo(() => {
    const set = new Set<string>()
    rows.forEach(r => set.add(r.product))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [rows])

  const filtered = useMemo(() => {
    let base = productFilter === '__ALL__'
      ? rows.slice()
      : rows.filter(r => r.product === productFilter)

    if (startDate || endDate) {
      const start = startDate ? dayjs(startDate, 'YYYY-MM-DD', true).startOf('day') : null
      const end   = endDate   ? dayjs(endDate,   'YYYY-MM-DD', true).endOf('day')   : null

      base = base.filter(r => {
        const d = parseRowDate(r.date)
        if (!d.isValid()) return false
        if (start && end) return d.isBetween(start, end, 'day', '[]')
        if (start) return d.isAfter(start) || d.isSame(start, 'day')
        if (end)   return d.isBefore(end) || d.isSame(end, 'day')
        return true
      })
    }

    return base.sort((a, b) => {
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
  }, [rows, productFilter, startDate, endDate, orderBy, order])

  const pageRows = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Toolbar sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Registros de Produção</Typography>

        {/* Filtro por produto */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="product-filter-label">Produto</InputLabel>
          <Select
            labelId="product-filter-label"
            label="Produto"
            value={productFilter}
            onChange={(e) => {
              setProductFilter(e.target.value)
              setPage(0)
            }}
          >
            <MenuItem value="__ALL__">Todos</MenuItem>
            {productOptions.map((p) => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Data inicial */}
        <TextField
          size="small"
          label="Data inicial"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value)
            setPage(0)
          }}
        />

        {/* Data final */}
        <TextField
          size="small"
          label="Data final"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value)
            setPage(0)
          }}
        />
      </Toolbar>

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
        count={filtered.length}
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
