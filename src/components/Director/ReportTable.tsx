import { Alert, Box, TableCell, TableRow } from '@mui/material';
import useDataFetching from '../../hooks/useDataFetching';
import { ProductionReport } from '../../types/production';
import BaseTable from '../common/BaseTable';

const PRODUCTION_REPORT_DATA: ProductionReport[] = [
  { date: '10-08-2025', shift: 'Manhã', product: 'Doritos', batches: 12, totalKg: 180 },
  { date: '10-08-2025', shift: 'Tarde', product: 'Fandangos', batches: 10, totalKg: 150 },
  { date: '11-08-2025', shift: 'Manhã', product: 'Baconzitos', batches: 8, totalKg: 120 },
  { date: '11-08-2025', shift: 'Tarde', product: 'Doritos', batches: 15, totalKg: 225 },
]

const REPORT_COLUMNS = [
  { key: 'date', label: 'Data' },
  { key: 'shift', label: 'Turno' },
  { key: 'product', label: 'Produto' },
  { key: 'batches', label: 'Número de Lotes' },
  { key: 'totalKg', label: 'Total (kg)' },
]

// Simulate API call
const fetchProductionReport = async (): Promise<ProductionReport[]> => {
  // Simulate potential error (uncomment to test error state)
  // if (Math.random() > 0.8) {
  //   throw new Error('Erro ao carregar relatório de produção')
  // }
  
  return PRODUCTION_REPORT_DATA
}

export default function ReportTable() {
  const { data, isLoading, error, refetch } = useDataFetching({
    fetchFn: fetchProductionReport,
    delay: 2000 // 2 second delay to better showcase loading state
  })

  const renderRow = (report: ProductionReport, index: number) => (
    <TableRow key={index}>
      <TableCell>{report.date}</TableCell>
      <TableCell>{report.shift}</TableCell>
      <TableCell>{report.product}</TableCell>
      <TableCell align="center">{report.batches}</TableCell>
      <TableCell align="right">{report.totalKg} kg</TableCell>
    </TableRow>
  )

  if (error) {
    return (
      <Box sx={{ mb: 2 }}>
        <Alert 
          severity="error" 
          action={
            <button onClick={refetch} style={{ border: 'none', background: 'none', color: 'inherit', cursor: 'pointer' }}>
              Tentar novamente
            </button>
          }
        >
          {error}
        </Alert>
      </Box>
    )
  }

  return (
    <BaseTable
      title="Relatório de Produção"
      columns={REPORT_COLUMNS}
      data={data || []}
      renderRow={renderRow}
      minWidth={{ xs: 1, md: 720 }}
      isLoading={isLoading}
      loadingRows={4}
      emptyMessage="Nenhum relatório de produção encontrado"
    />
  )
}
