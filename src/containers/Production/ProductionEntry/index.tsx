import { Box } from '@mui/material'
import ProductionForm from '../../../components/Director/ProductionForm'
import { THEME_COLORS } from '../../../constants/theme'

export default function ProductionEntryProduction() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: THEME_COLORS.BACKGROUND_LIGHT }}>
      <ProductionForm />
    </Box>
  )
}
