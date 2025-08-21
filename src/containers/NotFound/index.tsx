import { Box, Typography, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box sx={{
      height: '100vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #0f172a 0%, #1f2937 100%)'
    }}>
      <Box sx={{
        position: 'relative', zIndex: 1, height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Stack spacing={3} alignItems="center" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: '8rem', 
              fontWeight: 'bold', 
              color: '#2563eb',
              textShadow: '0 0 20px rgba(37, 99, 235, 0.5)'
            }}
          >
            404
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white', 
              fontWeight: 'medium',
              mb: 2
            }}
          >
            Página não encontrada
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              maxWidth: '400px',
              mb: 3
            }}
          >
            A página que você está procurando não existe ou foi movida.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#2563eb',
              '&:hover': {
                backgroundColor: '#1d4ed8',
              },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            Voltar ao início
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}