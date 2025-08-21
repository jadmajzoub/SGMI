import { Box, Backdrop, CircularProgress, Typography, Fade } from '@mui/material'

interface LoadingOverlayProps {
  open: boolean
  text?: string
  transparent?: boolean
}

const DEFAULT_OVERLAY_TEXT = 'Processando...'

export default function LoadingOverlay({ 
  open, 
  text = DEFAULT_OVERLAY_TEXT, 
  transparent = false 
}: LoadingOverlayProps) {
  return (
    <Backdrop
      open={open}
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: transparent ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: 4,
            borderRadius: 2,
            backgroundColor: transparent ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: transparent ? 'none' : 'blur(10px)',
          }}
        >
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" color="inherit" textAlign="center">
            {text}
          </Typography>
        </Box>
      </Fade>
    </Backdrop>
  )
}