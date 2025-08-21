import { Paper, Typography, TextField, Button, Link, Stack, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { delay } from '@utils/delay'
import { DIMENSIONS, SPACING } from '../../constants/theme'

interface AuthError {
  message: string
  code?: string
}

interface Props { 
  onLogin: (credentials?: { username: string; password: string }) => Promise<void>
  authError: AuthError | null
  onClearAuthError: () => void
}

export default function LoginBox({ onLogin, authError, onClearAuthError }: Props) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (username || password) {
      onClearAuthError()
    }
  }, [username, password, onClearAuthError])

  const handleLoginClick = async () => {
    try {
      setIsLoading(true)
      await onLogin({ username, password })
      await delay(DIMENSIONS.DELAY_LOGIN_MS)
      navigate('/loading')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Paper sx={{ width: DIMENSIONS.LOGIN_BOX_WIDTH, p: SPACING.PAPER_PADDING, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="h6" fontWeight={700}>ENTRAR</Typography>
      <Typography variant="body2" color="text.secondary">Bem-vindo ao SGMI</Typography>

      <Stack gap={1.5} mt={1}>
        {authError && (
          <Alert severity="error" sx={{ textAlign: 'left' }}>
            {authError.message}
          </Alert>
        )}
        <TextField 
          size="small" 
          placeholder="Nome de usuário" 
          fullWidth 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!authError}
        />
        <TextField 
          size="small" 
          placeholder="Senha" 
          type="password" 
          fullWidth 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!authError}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleLoginClick}
          disabled={isLoading || !username || !password}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
        <Link href="#" underline="hover" variant="body2">Esqueceu sua senha?</Link>
      </Stack>
    </Paper>
  )
}
