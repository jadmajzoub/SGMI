import { Paper, Typography, TextField, Button, Link, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { delay } from '@utils/delay'

interface Props { onLogin: () => void }

export default function LoginBox({ onLogin }: Props) {
  const navigate = useNavigate()

  const handleLoginClick = async () => {
    onLogin()
    await delay(800)
    navigate('/loading')
  }

  return (
    <Paper sx={{ width: 320, p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="h6" fontWeight={700}>LOG IN</Typography>
      <Typography variant="body2" color="text.secondary">Welcome to SGMI</Typography>

      <Stack gap={1.5} mt={1}>
        <TextField size="small" placeholder="Usuário" fullWidth />
        <TextField size="small" placeholder="Senha" type="password" fullWidth />
        <Button variant="contained" color="primary" onClick={handleLoginClick}>Log in</Button>
        <Link href="#" underline="hover" variant="body2">Forgot your password?</Link>
      </Stack>
    </Paper>
  )
}
