import { Button, CircularProgress, ButtonProps } from '@mui/material'

interface SubmitButtonProps extends Omit<ButtonProps, 'children'> {
  isLoading?: boolean
  loadingText?: string
  children: React.ReactNode
  isFormValid?: boolean
}

const DEFAULT_LOADING_TEXT = 'SALVANDO...'

export default function SubmitButton({
  isLoading = false,
  loadingText = DEFAULT_LOADING_TEXT,
  children,
  isFormValid = true,
  disabled,
  startIcon,
  ...buttonProps
}: SubmitButtonProps) {
  const isDisabled = disabled || isLoading || !isFormValid

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isDisabled}
      startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      {...buttonProps}
    >
      {isLoading ? loadingText : children}
    </Button>
  )
}