import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { delay } from '../../../utils/delay'

export default function LoadingScreen() {
  const navigate = useNavigate()
  useEffect(() => { (async () => { await delay(1500); navigate('/diretor/entrada') })() }, [navigate])

  return (
    <Box sx={{
      height: '100vh', width: '100%', bgcolor: '#000', color: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2
    }}>
      <Typography variant="h5">Bem-Vindo Sr.Mohamad</Typography>
      <Typography variant="body2" color="grey.300">Carregando...</Typography>
    </Box>
  )
}
