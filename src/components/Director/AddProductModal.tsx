import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { X } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ProductionEntryFormData, productionEntryFormSchema } from '../../schemas/productionValidation'
import { ProductionEntry } from '../../types/production'
import FormField from '../common/FormField'
import SubmitButton from '../common/SubmitButton'

const SAVE_SIMULATION_DELAY_MS = 1500
const SUCCESS_MESSAGE = 'Produto adicionado com sucesso!'

interface Props {
  open: boolean
  onClose: () => void
  onProductAdded: (product: ProductionEntry) => void
}

export default function AddProductModal({ open, onClose, onProductAdded }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<ProductionEntryFormData>({
    resolver: zodResolver(productionEntryFormSchema),
    defaultValues: {
      product: '',
      quantityKg: ''
    },
    mode: 'onChange'
  })

  const handleClose = () => {
    reset()
    setSubmitError('')
    onClose()
  }

  const onSubmit = async (data: ProductionEntryFormData) => {
    try {
      setIsLoading(true)
      setSubmitError('')

      const entry: ProductionEntry = { 
        product: data.product.trim(), 
        quantityKg: Number(data.quantityKg)
      }
      
      await new Promise(resolve => setTimeout(resolve, SAVE_SIMULATION_DELAY_MS))
      
      onProductAdded(entry)
      reset()
      onClose()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado'
      setSubmitError(errorMessage)
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
          Adicionar Novo Produto
        </Typography>
        <IconButton 
          onClick={handleClose} 
          sx={{ 
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
            transition: 'background-color 0.2s'
          }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box 
          component="form" 
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Controller
            name="product"
            control={control}
            render={({ field, fieldState }) => (
              <FormField
                label="Nome do Produto"
                placeholder="Ex: Doritos"
                value={field.value}
                onChange={field.onChange}
                hasError={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                onClearError={() => setSubmitError('')}
                disabled={isLoading}
                fullWidth
              />
            )}
          />
          
          <Controller
            name="quantityKg"
            control={control}
            render={({ field, fieldState }) => (
              <FormField
                label="Quantidade a Produzir (kg)"
                type="number"
                placeholder="Ex: 150"
                inputProps={{ min: 0, step: 0.1 }}
                value={field.value}
                onChange={field.onChange}
                hasError={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                onClearError={() => setSubmitError('')}
                disabled={isLoading}
                fullWidth
              />
            )}
          />

          {submitError && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {submitError}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button 
          onClick={handleClose} 
          disabled={isLoading}
          sx={{ mr: 1 }}
        >
          Cancelar
        </Button>
        <SubmitButton
          onClick={handleSubmit(onSubmit)}
          isLoading={isLoading}
          loadingText="Salvando..."
          isFormValid={isValid}
          sx={{
            px: 3,
            py: 1,
            fontWeight: 600,
          }}
        >
          Adicionar Produto
        </SubmitButton>
      </DialogActions>
    </Dialog>
  )
}