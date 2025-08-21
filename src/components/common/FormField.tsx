import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'

interface FormFieldProps extends Omit<TextFieldProps, 'onChange'> {
  value: string
  onChange: (value: string) => void
  hasError?: boolean
  errorMessage?: string
  onClearError?: () => void
  onClearSuccess?: () => void
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ value, onChange, hasError, errorMessage, onClearError, onClearSuccess, type = 'text', ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      onChange(inputValue)
      
      if (hasError && onClearError) {
        onClearError()
      }
      if (onClearSuccess) {
        onClearSuccess()
      }
    }

    return (
      <TextField
        ref={ref}
        value={value}
        onChange={handleChange}
        error={hasError}
        helperText={errorMessage}
        fullWidth
        type={type}
        {...props}
      />
    )
  }
)

FormField.displayName = 'FormField'

export default FormField