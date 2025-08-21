import { TableCell, TableRow, Alert, Box } from '@mui/material'
import BaseTable from '../common/BaseTable'
import { ProductionTotal } from '../../types/production'
import useDataFetching from '../../hooks/useDataFetching'

const PRODUCTION_TOTAL_DATA: ProductionTotal[] = [
  { product: 'Mash Cup Vegetables', totalKg: 1230 },
  { product: 'Mash Cup Cheese', totalKg: 860 },
  { product: 'Mash Cup Meat', totalKg: 945 },
]

const TOTAL_COLUMNS = [
  { key: 'product', label: 'Produto' },
  { key: 'totalKg', label: 'Total (kg)' },
]

// Simulate API call
const fetchProductionTotals = async (): Promise<ProductionTotal[]> => {
  // Simulate potential error (uncomment to test error state)
  // if (Math.random() > 0.8) {
  //   throw new Error('Erro ao carregar totais de produção')
  // }
  
  return PRODUCTION_TOTAL_DATA
}

export default function TotalTable() {
  const { data, isLoading, error, refetch } = useDataFetching({
    fetchFn: fetchProductionTotals,
    delay: 1800 // Different delay to show async loading
  })

  const renderRow = (total: ProductionTotal, index: number) => (
    <TableRow key={index}>
      <TableCell>{total.product}</TableCell>
      <TableCell align="right">{total.totalKg} kg</TableCell>
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
      title="Total a Produzir"
      columns={TOTAL_COLUMNS}
      data={data || []}
      renderRow={renderRow}
      minWidth={{ xs: 1, md: 600 }}
      isLoading={isLoading}
      loadingRows={3}
      emptyMessage="Nenhum total de produção encontrado"
    />
  )
}
