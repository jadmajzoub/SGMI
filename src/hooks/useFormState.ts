import { useState, useCallback } from 'react'

interface FormError {
  message: string
  field?: string
}

interface UseFormStateProps {
  initialValues?: Record<string, any>
  onSubmit?: (values: Record<string, any>) => Promise<void>
  successMessage?: string
}

interface UseFormStateReturn {
  values: Record<string, any>
  errors: FormError | null
  successMessage: string
  isLoading: boolean
  setValue: (field: string, value: any) => void
  setError: (error: FormError | null) => void
  setSuccessMessage: (message: string) => void
  clearError: () => void
  clearSuccess: () => void
  handleSubmit: () => Promise<void>
  resetForm: () => void
  isFormValid: boolean
}

export default function useFormState({
  initialValues = {},
  onSubmit,
  successMessage: defaultSuccessMessage = 'Operação realizada com sucesso!'
}: UseFormStateProps = {}): UseFormStateReturn {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FormError | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const setValue = useCallback((field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }, [])

  const setError = useCallback((error: FormError | null) => {
    setErrors(error)
  }, [])

  const clearError = useCallback(() => {
    setErrors(null)
  }, [])

  const clearSuccess = useCallback(() => {
    setSuccessMessage('')
  }, [])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors(null)
    setSuccessMessage('')
    setIsLoading(false)
  }, [initialValues])

  const handleSubmit = useCallback(async () => {
    if (!onSubmit) return

    try {
      setIsLoading(true)
      setErrors(null)
      setSuccessMessage('')

      await onSubmit(values)
      setSuccessMessage(defaultSuccessMessage)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado'
      setErrors({ message: errorMessage })
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [values, onSubmit, defaultSuccessMessage])

  const isFormValid = Object.values(values).every(value => 
    value !== null && value !== undefined && value !== ''
  )

  return {
    values,
    errors,
    successMessage,
    isLoading,
    setValue,
    setError,
    setSuccessMessage,
    clearError,
    clearSuccess,
    handleSubmit,
    resetForm,
    isFormValid
  }
}