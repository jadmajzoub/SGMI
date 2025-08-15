import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

const rows = [
  { data: '2025-08-10', turno: 'Manhã', produto: 'Mash Cup Legumes', massas: 12, totalKg: 180 },
  { data: '2025-08-10', turno: 'Tarde', produto: 'Mash Cup Queijo', massas: 10, totalKg: 150 },
]

export default function RelatorioTabela() {
  return (
    <TableContainer component={Paper} sx={{ minWidth: { xs: 1, md: 720 } }}>
      <Typography variant="h6" fontWeight={700} p={2}>Relatório de Produção</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Turno</TableCell>
            <TableCell>Produto</TableCell>
            <TableCell>Nº de Massas</TableCell>
            <TableCell>Total (kg)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              <TableCell>{r.data}</TableCell>
              <TableCell>{r.turno}</TableCell>
              <TableCell>{r.produto}</TableCell>
              <TableCell>{r.massas}</TableCell>
              <TableCell>{r.totalKg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
