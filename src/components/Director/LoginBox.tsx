import { Typography, Link, Stack, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { delay } from '@utils/delay'
import { DIMENSIONS } from '../../constants/theme'
import FormContainer from '../common/FormContainer'
import FormField from '../common/FormField'
import SubmitButton from '../common/SubmitButton'
import { loginFormSchema, LoginFormData } from '../../schemas/productionValidation'
import { AuthError, LoginCredentials } from '../../types/auth'

interface Props { 
  onLogin: (credentials: LoginCredentials) => Promise<void>
  authError: AuthError | null
  onClearAuthError: () => void
}

const LOGIN_LOADING_TEXT = 'Entrando...'

export default function LoginBox({ onLogin, authError, onClearAuthError }: Props) {
  const navigate = useNavigate()
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onChange'
  })

  const watchedValues = watch()

  useEffect(() => {
    if (watchedValues.username || watchedValues.password) {
      onClearAuthError()
    }
  }, [watchedValues.username, watchedValues.password, onClearAuthError])

  const onSubmit = async (data: LoginFormData) => {
    await onLogin({ username: data.username, password: data.password })
    await delay(DIMENSIONS.DELAY_LOGIN_MS)
    navigate('/director/production')
  }

  const hasAuthError = !!authError

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

      <Box 
        component="form" 
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1 }}
      >
        <Stack gap={1.5}>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <FormField
                size="small"
                placeholder="Nome de usuário"
                value={field.value}
                onChange={field.onChange}
                hasError={hasAuthError || !!fieldState.error}
                errorMessage={fieldState.error?.message}
                onClearError={onClearAuthError}
                disabled={isSubmitting}
              />
            )}
          />
          
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <FormField
                size="small"
                placeholder="Senha"
                type="password"
                value={field.value}
                onChange={field.onChange}
                hasError={hasAuthError || !!fieldState.error}
                errorMessage={fieldState.error?.message}
                onClearError={onClearAuthError}
                disabled={isSubmitting}
              />
            )}
          />
          
          <SubmitButton
            type="submit"
            isLoading={isSubmitting}
            loadingText={LOGIN_LOADING_TEXT}
            isFormValid={isValid}
          >
            Entrar
          </SubmitButton>
          
          <Link href="#" underline="hover" variant="body2">
            Esqueceu sua senha?
          </Link>
        </Stack>
      </Box>
    </FormContainer>
  )
}
