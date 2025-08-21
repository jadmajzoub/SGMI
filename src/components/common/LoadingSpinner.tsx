import { Box, CircularProgress, Typography, BoxProps } from '@mui/material'

interface LoadingSpinnerProps extends BoxProps {
  size?: number | string
  text?: string
  color?: 'primary' | 'secondary' | 'inherit'
}

const DEFAULT_LOADING_TEXT = 'Carregando...'

export default function LoadingSpinner({ 
  size = 40, 
  text = DEFAULT_LOADING_TEXT, 
  color = 'primary',
  sx,
  ...boxProps 
}: LoadingSpinnerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 4,
        ...sx
      }}
      {...boxProps}
    >
      <CircularProgress size={size} color={color} />
      {text && (
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      )}
    </Box>
  )
}