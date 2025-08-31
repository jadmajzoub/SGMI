import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Fade, Slide } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ProductionEntryFormData, productionEntryFormSchema } from '../../schemas/productionValidation';
import { ProductionEntry } from '../../types/production';
import FormContainer from '../common/FormContainer';
import FormField from '../common/FormField';
import SubmitButton from '../common/SubmitButton';

const SUCCESS_MESSAGE = 'Entrada de produção salva com sucesso!'
const LOADING_TEXT = 'Salvando entrada...'
const SAVE_SIMULATION_DELAY_MS = 2000

export default function ProductionForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<ProductionEntryFormData>({
    resolver: zodResolver(productionEntryFormSchema),
    defaultValues: {
      productId: '',
      quantityKg: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (data: ProductionEntryFormData) => {
    try {
      setIsLoading(true)
      setSubmitError('')
      setSuccessMessage('')

      const entry: ProductionEntry = { 
        product: 'Produto Selecionado', // Placeholder - need product name from ID 
        quantityKg: Number(data.quantityKg)
      }
      
      // Simulate API call with longer delay to showcase loading state
      await new Promise(resolve => setTimeout(resolve, SAVE_SIMULATION_DELAY_MS))
      
      console.log('Production entry saved:', entry)
      setSuccessMessage(SUCCESS_MESSAGE)
      reset()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado'
      setSubmitError(errorMessage)
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setSubmitError('')
  const clearSuccess = () => setSuccessMessage('')

  return (
    <Fade in timeout={500}>
      <Box>
        <FormContainer
          title="Entrada de Produção"
          error={submitError ? { message: submitError } : null}
          successMessage={successMessage}
          onClearError={clearError}
          onClearSuccess={clearSuccess}
          sx={{
            transition: 'all 0.3s ease-in-out',
            opacity: isLoading ? 0.8 : 1,
            filter: isLoading ? 'blur(1px)' : 'none'
          }}
        >
          <Slide direction="right" in={!isLoading} timeout={300}>
            <Box 
              component="form" 
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Controller
                name="productId"
                control={control}
                render={({ field, fieldState }) => (
                  <FormField
                    label="ID do Produto"
                    placeholder="Ex: UUID do produto"
                    value={field.value}
                    onChange={field.onChange}
                    hasError={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    onClearError={clearError}
                    onClearSuccess={clearSuccess}
                    disabled={isLoading}
                  />
                )}
              />
              
              <Controller
                name="quantityKg"
                control={control}
                render={({ field, fieldState }) => (
                  <FormField
                    label="Quantidade (kg)"
                    type="number"
                    placeholder="Ex: 150"
                    inputProps={{ min: 0, step: 0.1 }}
                    value={field.value}
                    onChange={field.onChange}
                    hasError={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    onClearError={clearError}
                    onClearSuccess={clearSuccess}
                    disabled={isLoading}
                  />
                )}
              />
              
              <Box sx={{ mt: 1 }}>
                <SubmitButton
                  type="submit"
                  isLoading={isLoading}
                  loadingText={LOADING_TEXT}
                  isFormValid={isValid}
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: isLoading ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.3)',
                    '&:hover': {
                      boxShadow: isLoading ? 'none' : '0 6px 16px rgba(37, 99, 235, 0.4)',
                      transform: isLoading ? 'none' : 'translateY(-1px)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  SALVAR ENTRADA
                </SubmitButton>
              </Box>
            </Box>
          </Slide>
        </FormContainer>
      </Box>
    </Fade>
  )
}
