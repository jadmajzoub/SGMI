import { useState } from 'react'
import Sidebar from '../../../components/Director/Sidebar'
import ProductionEntryScreen from '../../../components/Director/ProductionEntryScreen'
import ProductionReportScreen from '../../../components/Director/ProductionReportScreen'
import ErrorBoundary from '../../../components/common/ErrorBoundary'
import ErrorFallback from '../../../components/common/ErrorFallback'
import { Box } from '@mui/material'
import { MenuItem } from '../../../types/production'
import { THEME_COLORS } from '../../../constants/theme'

export default function ProductionEntryPage() {
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem>('production-entry')

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'production-entry':
        return <ProductionEntryScreen />
      case 'production-report':
        return <ProductionReportScreen />
      default:
        return <ProductionEntryScreen />
    }
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: THEME_COLORS.BACKGROUND_LIGHT }}>
      <ErrorBoundary fallback={<ErrorFallback title="Erro da Barra Lateral" description="Falha ao carregar a barra lateral de navegação." />}>
        <Sidebar activeMenuItem={activeMenuItem} onMenuItemClick={setActiveMenuItem} />
      </ErrorBoundary>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: THEME_COLORS.BACKGROUND_LIGHT, p: 2 }}>
        <ErrorBoundary fallback={<ErrorFallback title="Erro de Conteúdo" description="Falha ao carregar o conteúdo selecionado." />}>
          {renderContent()}
        </ErrorBoundary>
      </Box>
    </Box>
  )
}
