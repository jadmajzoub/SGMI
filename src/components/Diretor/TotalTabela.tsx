import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

const rows = [
  { produto: 'Mash Cup Legumes', totalKg: 1230 },
  { produto: 'Mash Cup Queijo', totalKg: 860 },
]

export default function TotalTabela() {
  return (
    <TableContainer component={Paper} sx={{ minWidth: { xs: 1, md: 600 } }}>
      <Typography variant="h6" fontWeight={700} p={2}>Total a Ser Produzido</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Produto</TableCell>
            <TableCell>Total (kg)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              <TableCell>{r.produto}</TableCell>
              <TableCell>{r.totalKg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
