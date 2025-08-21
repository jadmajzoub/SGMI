import { Paper, Typography, TextField, Button, Link, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { delay } from '@utils/delay'
import { DIMENSIONS, SPACING } from '../../constants/theme'

interface Props { onLogin: () => void }

export default function LoginBox({ onLogin }: Props) {
  const navigate = useNavigate()

  const handleLoginClick = async () => {
    onLogin()
    await delay(DIMENSIONS.DELAY_LOGIN_MS)
    navigate('/loading')
  }

  return (
    <Paper sx={{ width: DIMENSIONS.LOGIN_BOX_WIDTH, p: SPACING.PAPER_PADDING, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="h6" fontWeight={700}>LOG IN</Typography>
      <Typography variant="body2" color="text.secondary">Welcome to SGMI</Typography>

      <Stack gap={1.5} mt={1}>
        <TextField size="small" placeholder="Username" fullWidth />
        <TextField size="small" placeholder="Password" type="password" fullWidth />
        <Button variant="contained" color="primary" onClick={handleLoginClick}>Log in</Button>
        <Link href="#" underline="hover" variant="body2">Forgot your password?</Link>
      </Stack>
    </Paper>
  )
}
