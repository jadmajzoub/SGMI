import { Box, Button, Paper, Stack, TextField, Typography, Alert, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { ProductionEntry } from '../../types/production'
import { SPACING } from '../../constants/theme'

interface FormError {
  message: string
  field?: string
}

export default function ProductionForm() {
  const [product, setProduct] = useState('')
  const [quantityKg, setQuantityKg] = useState<number | ''>('')
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<FormError | null>(null)
  const [successMessage, setSuccessMessage] = useState('')

  const handleSave = async () => {
    try {
      setIsLoading(true)
      setFormError(null)
      setSuccessMessage('')

      if (!product.trim()) {
        throw new Error('O nome do produto é obrigatório')
      }

      if (!quantityKg || quantityKg <= 0) {
        throw new Error('A quantidade deve ser maior que 0')
      }

      const entry: ProductionEntry = { product: product.trim(), quantityKg: Number(quantityKg) }
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Production entry saved:', entry)
      setSuccessMessage('Entrada de produção salva com sucesso!')
      setProduct('')
      setQuantityKg('')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao salvar entrada de produção'
      setFormError({ message: errorMessage })
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Paper sx={{ p: SPACING.PAPER_PADDING, minWidth: { xs: 1, sm: 480 } }}>
      <Typography variant="h6" fontWeight={700} mb={2}>Entrada de Produção</Typography>
      <Stack gap={2}>
        {formError && (
          <Alert severity="error" onClose={() => setFormError(null)}>
            {formError.message}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" onClose={() => setSuccessMessage('')}>
            {successMessage}
          </Alert>
        )}
        <TextField
          label="Nome do Produto"
          value={product}
          onChange={(e) => {
            setProduct(e.target.value)
            if (formError) setFormError(null)
            if (successMessage) setSuccessMessage('')
          }}
          fullWidth
          error={formError?.field === 'product'}
          disabled={isLoading}
        />
        <TextField
          label="Quantidade (kg)"
          type="number"
          value={quantityKg}
          onChange={(e) => {
            setQuantityKg(e.target.value === '' ? '' : Number(e.target.value))
            if (formError) setFormError(null)
            if (successMessage) setSuccessMessage('')
          }}
          fullWidth
          error={formError?.field === 'quantity'}
          disabled={isLoading}
        />
        <Box>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSave}
            disabled={isLoading || !product.trim() || !quantityKg}
            startIcon={isLoading && <CircularProgress size={16} color="inherit" />}
          >
            {isLoading ? 'SALVANDO...' : 'SALVAR'}
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}
