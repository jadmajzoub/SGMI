import { Box, Fade, Slide } from '@mui/material'
import { ProductionEntry } from '../../types/production'
import FormContainer from '../common/FormContainer'
import FormField from '../common/FormField'
import SubmitButton from '../common/SubmitButton'
import useFormState from '../../hooks/useFormState'

const INITIAL_VALUES = {
  product: '',
  quantityKg: ''
}

const SUCCESS_MESSAGE = 'Entrada de produção salva com sucesso!'
const LOADING_TEXT = 'Salvando entrada...'
const SAVE_SIMULATION_DELAY_MS = 2000

export default function ProductionForm() {
  const {
    values,
    errors,
    successMessage,
    isLoading,
    setValue,
    clearError,
    clearSuccess,
    handleSubmit,
    resetForm,
    isFormValid
  } = useFormState({
    initialValues: INITIAL_VALUES,
    onSubmit: async (formValues) => {
      const { product, quantityKg } = formValues

      if (!product.trim()) {
        throw new Error('O nome do produto é obrigatório')
      }

      if (!quantityKg || quantityKg <= 0) {
        throw new Error('A quantidade deve ser maior que 0')
      }

      const entry: ProductionEntry = { 
        product: product.trim(), 
        quantityKg: Number(quantityKg) 
      }
      
      // Simulate API call with longer delay to showcase loading state
      await new Promise(resolve => setTimeout(resolve, SAVE_SIMULATION_DELAY_MS))
      
      console.log('Production entry saved:', entry)
      resetForm()
    },
    successMessage: SUCCESS_MESSAGE
  })

  const isProductValid = values.product?.trim()
  const isQuantityValid = values.quantityKg && Number(values.quantityKg) > 0
  const isValidForm = isProductValid && isQuantityValid

  return (
    <Fade in timeout={500}>
      <Box>
        <FormContainer
          title="Entrada de Produção"
          error={errors}
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormField
                label="Nome do Produto"
                placeholder="Ex: Mash Cup Vegetables"
                value={values.product || ''}
                onChange={(value) => setValue('product', value)}
                hasError={errors?.field === 'product'}
                onClearError={clearError}
                onClearSuccess={clearSuccess}
                disabled={isLoading}
              />
              
              <FormField
                label="Quantidade (kg)"
                type="number"
                placeholder="Ex: 150"
                inputProps={{ min: 0, step: 0.1 }}
                value={values.quantityKg || ''}
                onChange={(value) => setValue('quantityKg', value)}
                hasError={errors?.field === 'quantity'}
                onClearError={clearError}
                onClearSuccess={clearSuccess}
                disabled={isLoading}
              />
              
              <Box sx={{ mt: 1 }}>
                <SubmitButton
                  isLoading={isLoading}
                  loadingText={LOADING_TEXT}
                  isFormValid={isValidForm}
                  onClick={handleSubmit}
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
