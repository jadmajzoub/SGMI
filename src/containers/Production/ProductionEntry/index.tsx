import { Box } from '@mui/material'
import ProductionForm from '../../../components/Director/ProductionForm'
import ErrorBoundary from '../../../components/common/ErrorBoundary'
import ErrorFallback from '../../../components/common/ErrorFallback'
import { THEME_COLORS } from '../../../constants/theme'

export default function ProductionEntryProduction() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: THEME_COLORS.BACKGROUND_LIGHT }}>
      <ErrorBoundary fallback={<ErrorFallback title="Erro do Formulário de Produção" description="Falha ao carregar o formulário de entrada de produção." />}>
        <ProductionForm />
      </ErrorBoundary>
    </Box>
  )
}
