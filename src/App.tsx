import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { useAuth } from './hooks/useAuth'
import ErrorBoundary from './components/common/ErrorBoundary'
import ErrorFallback from './components/common/ErrorFallback'

export default function App() {
  const { isAuthenticated, authError, login, clearError } = useAuth()
  
  const handleError = (error: Error, errorInfo: string) => {
    console.error('Application error:', error, errorInfo)
  }

  return (
    <ErrorBoundary 
      fallback={<ErrorFallback title="Erro da Aplicação" description="A aplicação encontrou um erro inesperado." />}
      onError={handleError}
    >
      <BrowserRouter>
        <AppRoutes 
          isAuthenticated={isAuthenticated} 
          authError={authError}
          onLogin={login} 
          onClearAuthError={clearError}
        />
      </BrowserRouter>
    </ErrorBoundary>
  )
}
