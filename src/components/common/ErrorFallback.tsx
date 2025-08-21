import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material'
import { RefreshCw } from 'lucide-react'
import { SPACING } from '../../constants/theme'

interface Props {
  error?: Error
  resetError?: () => void
  title?: string
  description?: string
}

export default function ErrorFallback({ 
  error, 
  resetError, 
  title = 'Algo deu errado',
  description = 'Ocorreu um erro inesperado. Tente novamente.'
}: Props) {
  const handleRefresh = () => {
    if (resetError) {
      resetError()
    } else {
      window.location.reload()
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" p={2}>
      <Paper sx={{ p: SPACING.PAPER_PADDING, maxWidth: 500, textAlign: 'center' }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600} color="error">
            {title}
          </Typography>
          
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ textAlign: 'left' }}>
              <Typography variant="body2" fontFamily="monospace">
                {error.message}
              </Typography>
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshCw size={16} />}
            onClick={handleRefresh}
            sx={{ alignSelf: 'center' }}
          >
            Tentar Novamente
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}