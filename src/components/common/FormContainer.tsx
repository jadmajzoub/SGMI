import { Paper, Typography, Stack, Alert, Box, PaperProps } from '@mui/material'
import { SPACING } from '../../constants/theme'

interface FormError {
  message: string
  field?: string
}

interface FormContainerProps extends Omit<PaperProps, 'children'> {
  title: string
  children: React.ReactNode
  error?: FormError | null
  successMessage?: string
  onClearError?: () => void
  onClearSuccess?: () => void
  minWidth?: number | string | Record<string, number>
}

export default function FormContainer({
  title,
  children,
  error,
  successMessage,
  onClearError,
  onClearSuccess,
  minWidth = { xs: 1, sm: 480 },
  sx,
  ...paperProps
}: FormContainerProps) {
  return (
    <Paper 
      sx={{ 
        p: SPACING.PAPER_PADDING, 
        minWidth,
        ...sx 
      }} 
      {...paperProps}
    >
      <Typography variant="h6" fontWeight={700} mb={2}>
        {title}
      </Typography>
      
      <Stack gap={2}>
        {error && (
          <Alert 
            severity="error" 
            onClose={onClearError}
          >
            {error.message}
          </Alert>
        )}
        
        {successMessage && (
          <Alert 
            severity="success" 
            onClose={onClearSuccess}
          >
            {successMessage}
          </Alert>
        )}
        
        {children}
      </Stack>
    </Paper>
  )
}