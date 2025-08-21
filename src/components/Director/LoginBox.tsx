import { Typography, Link, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { delay } from '@utils/delay'
import { DIMENSIONS } from '../../constants/theme'
import FormContainer from '../common/FormContainer'
import FormField from '../common/FormField'
import SubmitButton from '../common/SubmitButton'
import useFormState from '../../hooks/useFormState'

interface AuthError {
  message: string
  code?: string
}

interface Props { 
  onLogin: (credentials?: { username: string; password: string }) => Promise<void>
  authError: AuthError | null
  onClearAuthError: () => void
}

const INITIAL_VALUES = {
  username: '',
  password: ''
}

const LOGIN_LOADING_TEXT = 'Entrando...'

export default function LoginBox({ onLogin, authError, onClearAuthError }: Props) {
  const navigate = useNavigate()
  
  const {
    values,
    isLoading,
    setValue,
    handleSubmit,
    isFormValid
  } = useFormState({
    initialValues: INITIAL_VALUES,
    onSubmit: async (formValues) => {
      const { username, password } = formValues
      await onLogin({ username, password })
      await delay(DIMENSIONS.DELAY_LOGIN_MS)
      navigate('/loading')
    }
  })

  useEffect(() => {
    if (values.username || values.password) {
      onClearAuthError()
    }
  }, [values.username, values.password, onClearAuthError])

  const hasAuthError = !!authError
  const isLoginFormValid = values.username && values.password

  return (
    <FormContainer
      title=""
      error={authError}
      onClearError={onClearAuthError}
      sx={{ 
        width: DIMENSIONS.LOGIN_BOX_WIDTH, 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1.5 
      }}
    >
      <Typography variant="h6" fontWeight={700}>ENTRAR</Typography>
      <Typography variant="body2" color="text.secondary">Bem-vindo ao SGMI</Typography>

      <Stack gap={1.5} mt={1}>
        <FormField
          size="small"
          placeholder="Nome de usuário"
          value={values.username || ''}
          onChange={(value) => setValue('username', value)}
          hasError={hasAuthError}
          onClearError={onClearAuthError}
          disabled={isLoading}
        />
        
        <FormField
          size="small"
          placeholder="Senha"
          type="password"
          value={values.password || ''}
          onChange={(value) => setValue('password', value)}
          hasError={hasAuthError}
          onClearError={onClearAuthError}
          disabled={isLoading}
        />
        
        <SubmitButton
          isLoading={isLoading}
          loadingText={LOGIN_LOADING_TEXT}
          isFormValid={isLoginFormValid}
          onClick={handleSubmit}
        >
          Entrar
        </SubmitButton>
        
        <Link href="#" underline="hover" variant="body2">
          Esqueceu sua senha?
        </Link>
      </Stack>
    </FormContainer>
  )
}
