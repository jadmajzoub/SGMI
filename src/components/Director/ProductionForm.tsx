import { Box } from '@mui/material'
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
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Production entry saved:', entry)
      resetForm()
    },
    successMessage: SUCCESS_MESSAGE
  })

  const isProductValid = values.product?.trim()
  const isQuantityValid = values.quantityKg && Number(values.quantityKg) > 0
  const isValidForm = isProductValid && isQuantityValid

  return (
    <FormContainer
      title="Entrada de Produção"
      error={errors}
      successMessage={successMessage}
      onClearError={clearError}
      onClearSuccess={clearSuccess}
    >
      <FormField
        label="Nome do Produto"
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
        value={values.quantityKg || ''}
        onChange={(value) => setValue('quantityKg', value)}
        hasError={errors?.field === 'quantity'}
        onClearError={clearError}
        onClearSuccess={clearSuccess}
        disabled={isLoading}
      />
      
      <Box>
        <SubmitButton
          isLoading={isLoading}
          isFormValid={isValidForm}
          onClick={handleSubmit}
        >
          SALVAR
        </SubmitButton>
      </Box>
    </FormContainer>
  )
}
