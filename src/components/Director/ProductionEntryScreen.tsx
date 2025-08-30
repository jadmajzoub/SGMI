import {
  Box, Divider, Grid, IconButton, Paper, Stack, Typography,
  useMediaQuery, useTheme, Button,
} from '@mui/material'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { THEME_COLORS } from '../../constants/theme'
import { ProductionEntry, ProductionTotal } from '../../types/production'
import AddProductModal from './AddProductModal'

const PRODUCTION_TOTAL_DATA: ProductionTotal[] = [
  { product: 'Doritos', totalKg: 1230 },
  { product: 'Fandangos', totalKg: 860 },
  { product: 'Baconzitos', totalKg: 945 },
]

export default function ProductionEntryScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productionTotals, setProductionTotals] = useState<ProductionTotal[]>(PRODUCTION_TOTAL_DATA)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleProductAdded = (newProduct: ProductionEntry) => {
    setProductionTotals(prev => {
      const existingIndex = prev.findIndex(item => item.product === newProduct.product)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          totalKg: updated[existingIndex].totalKg + newProduct.quantityKg,
        }
        return updated
      }
      return [...prev, { product: newProduct.product, totalKg: newProduct.quantityKg }]
    })
  }

  const formatDate = (date: Date) =>
    date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const getTotalKg = () => productionTotals.reduce((sum, item) => sum + item.totalKg, 0)

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 }, pt: { xs: 3, md: 4 } }}>
      <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, bgcolor: THEME_COLORS.BACKGROUND_PAPER, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Stack spacing={3}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: THEME_COLORS.PRIMARY_BLUE, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                Entrada de Produção
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Atualizado em {formatDate(new Date())}
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              startIcon={<Plus size={20} />}
              sx={{
                bgcolor: THEME_COLORS.PRIMARY_BLUE,
                '&:hover': { bgcolor: THEME_COLORS.PRIMARY_BLUE_HOVER },
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                alignSelf: { xs: 'stretch', sm: 'auto' },
              }}
            >
              Adicionar produção
            </Button>
          </Box>

          <Divider />

          {/* Total a ser Produzido */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: THEME_COLORS.TEXT_PRIMARY, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
              Total a ser Produzido
            </Typography>

            <Grid container spacing={3}>
              {/* Card resumo */}
              <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Total Geral</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>{getTotalKg().toLocaleString('pt-BR')}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>kg a produzir</Typography>
                </Paper>
              </Grid>

              {/* Lista de produtos */}
              <Grid item xs={12} md={8}>
                <Stack spacing={2}>
                  {productionTotals.length === 0 ? (
                    <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 2, border: '2px dashed', borderColor: 'grey.300' }}>
                      <Typography color="text.secondary">Nenhum produto cadastrado. Clique em “Adicionar produção”.</Typography>
                    </Paper>
                  ) : (
                    productionTotals.map((item, index) => (
                      <Paper
                        key={index}
                        elevation={1}
                        sx={{
                          p: 3, borderRadius: 2, border: '1px solid', borderColor: 'grey.200',
                          '&:hover': { borderColor: THEME_COLORS.PRIMARY_BLUE, boxShadow: '0 2px 8px rgba(37, 99, 235, 0.1)' },
                          transition: 'all 0.2s ease-in-out',
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 0 } }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', md: '1.125rem' } }}>{item.product}</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: THEME_COLORS.PRIMARY_BLUE, fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
                            {item.totalKg.toLocaleString('pt-BR')} kg
                          </Typography>
                        </Box>
                      </Paper>
                    ))
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>

      {/* FAB no mobile (atalho) */}
      <Box sx={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1300, display: { xs: 'inline-flex', sm: 'none' } }}>
        <IconButton
          onClick={() => setIsModalOpen(true)}
          sx={{
            bgcolor: THEME_COLORS.PRIMARY_BLUE, color: 'white', width: 64, height: 64, borderRadius: '50%',
            '&:hover': { bgcolor: THEME_COLORS.PRIMARY_BLUE_HOVER, transform: 'scale(1.05)' },
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
          }}
          aria-label="Adicionar produção"
        >
          <Plus size={28} />
        </IconButton>
      </Box>

      <AddProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </Box>
  )
}
