import { Box } from '@mui/material'
import LoginBox from '../../../components/Director/LoginBox'

interface AuthError {
  message: string
  code?: string
}

interface Props { 
  onLogin: (credentials?: { username: string; password: string }) => Promise<void>
  authError: AuthError | null
  onClearAuthError: () => void
}

export default function LoginPage({ onLogin, authError, onClearAuthError }: Props) {
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
        <LoginBox 
          onLogin={onLogin} 
          authError={authError}
          onClearAuthError={onClearAuthError}
        />
      </Box>
    </Box>
  )
}
