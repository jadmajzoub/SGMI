import { useState } from 'react'
import Sidebar from '../../../components/Director/Sidebar'
import ProductionForm from '../../../components/Director/ProductionForm'
import ReportTable from '../../../components/Director/ReportTable'
import TotalTable from '../../../components/Director/TotalTable'
import { Box } from '@mui/material'
import { MenuItem } from '../../../types/production'
import { THEME_COLORS } from '../../../constants/theme'

export default function ProductionEntryPage() {
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem>('production-entry')

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: THEME_COLORS.BACKGROUND_LIGHT }}>
      <Sidebar activeMenuItem={activeMenuItem} onMenuItemClick={setActiveMenuItem} />
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: THEME_COLORS.BACKGROUND_LIGHT, p: 2 }}>
        {activeMenuItem === 'production-entry' && <ProductionForm />}
        {activeMenuItem === 'report' && <ReportTable />}
        {activeMenuItem === 'total' && <TotalTable />}
      </Box>
    </Box>
  )
}
