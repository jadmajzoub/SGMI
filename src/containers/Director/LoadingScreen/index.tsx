import { Box, Typography, LinearProgress, Fade, keyframes } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { delay } from '../../../utils/delay'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const LOADING_STEPS = [
  'Inicializando sistema...',
  'Carregando dados de produção...',
  'Configurando interface...',
  'Quase pronto...'
]

const LOADING_DURATION_MS = 3000
const STEP_DURATION_MS = LOADING_DURATION_MS / LOADING_STEPS.length

export default function LoadingScreen() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const totalSteps = LOADING_STEPS.length
    let currentStepIndex = 0

    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (100 / (LOADING_DURATION_MS / 100))
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)

    const stepTimer = setInterval(() => {
      currentStepIndex++
      if (currentStepIndex < totalSteps) {
        setCurrentStep(currentStepIndex)
      }
    }, STEP_DURATION_MS)

    const navigationTimer = setTimeout(async () => {
      await delay(500) // Small delay after loading completes
      navigate('/director/production-entry')
    }, LOADING_DURATION_MS)

    return () => {
      clearInterval(progressTimer)
      clearInterval(stepTimer)
      clearTimeout(navigationTimer)
    }
  }, [navigate])

  return (
    <Box sx={{
      height: '100vh', 
      width: '100%', 
      bgcolor: 'linear-gradient(135deg, #0f172a 0%, #1f2937 100%)',
      background: 'linear-gradient(135deg, #0f172a 0%, #1f2937 100%)',
      color: '#fff',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: 4,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
        `,
      }} />

      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 400, px: 4 }}>
        <Fade in timeout={1000}>
          <Box>
            <Typography 
              variant="h4" 
              fontWeight={700}
              sx={{ 
                mb: 1,
                animation: `${fadeInUp} 0.8s ease-out`,
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Bem-vindo, Sr. Mohamad
            </Typography>
            <Typography 
              variant="body1" 
              color="grey.300"
              sx={{ 
                mb: 4,
                animation: `${fadeInUp} 0.8s ease-out 0.2s both`
              }}
            >
              Sistema de Gestão de Manufatura Industrial
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ 
          width: '100%', 
          mb: 3,
          animation: `${fadeInUp} 0.8s ease-out 0.4s both`
        }}>
          <LinearProgress 
            variant="determinate" 
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              }
            }}
          />
          <Typography 
            variant="body2" 
            color="grey.400" 
            sx={{ mt: 1, textAlign: 'right' }}
          >
            {Math.round(progress)}%
          </Typography>
        </Box>

        <Typography 
          variant="body2" 
          color="grey.300"
          sx={{ 
            minHeight: 24,
            animation: `${pulse} 2s ease-in-out infinite`,
            transition: 'all 0.3s ease-in-out'
          }}
        >
          {LOADING_STEPS[currentStep]}
        </Typography>
      </Box>
    </Box>
  )
}
