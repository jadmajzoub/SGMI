import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { useAuth } from './hooks/useAuth'
import { useTokenRefresh } from './hooks/useTokenRefresh'
import ErrorBoundary from './components/common/ErrorBoundary'
import ErrorFallback from './components/common/ErrorFallback'
import LoadingOverlay from './components/common/LoadingOverlay'
import ChatWidget from './components/ChatbotWidget/ChatWidget'

export default function App() {
  const { isAuthenticated, user, authError, login, clearError, isLoading } = useAuth()

  useTokenRefresh()

  const handleError = (error: Error, errorInfo: string) => {
    console.error('Application error:', error, errorInfo)
  }

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          title="Erro da Aplicação"
          description="A aplicação encontrou um erro inesperado."
        />
      }
      onError={handleError}
    >
      <BrowserRouter>
        <AppRoutes
          isAuthenticated={isAuthenticated}
          user={user}
          authError={authError}
          onLogin={login}
          onClearAuthError={clearError}
        />
      </BrowserRouter>

      {/* Widget do chatbot visível em todas as telas */}
      <ChatWidget />

      <LoadingOverlay
        open={isLoading}
        text="Inicializando aplicação..."
      />
    </ErrorBoundary>
  )
}
