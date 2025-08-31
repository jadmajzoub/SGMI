import { Alert, Box, TableCell, TableRow } from '@mui/material';
import useDataFetching from '../../hooks/useDataFetching';
import { ProductionReport } from '../../types/production';
import BaseTable from '../common/BaseTable';
import { productionService } from '../../services/production';

const REPORT_COLUMNS = [
  { key: 'date', label: 'Data' },
  { key: 'shift', label: 'Turno' },
  { key: 'product', label: 'Produto' },
  { key: 'batches', label: 'Número de Lotes' },
  { key: 'totalKg', label: 'Total (kg)' },
]

export default function ReportTable() {
  const { data, isLoading, error, refetch } = useDataFetching({
    fetchFn: () => productionService.getReports(),
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
