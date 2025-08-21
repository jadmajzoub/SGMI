import { useCallback, useMemo, useState } from 'react'

interface AuthError {
  message: string
  code?: string
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState<AuthError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (credentials?: { username: string; password: string }) => {
    try {
      setIsLoading(true)
      setAuthError(null)
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setIsAuthenticated(true)
    } catch (error) {
      const authError: AuthError = {
        message: error instanceof Error ? error.message : 'Falha na autenticação',
        code: 'AUTH_ERROR'
      }
      setAuthError(authError)
      console.error('Authentication error:', authError)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    try {
      setIsAuthenticated(false)
      setAuthError(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }, [])

  const clearError = useCallback(() => {
    setAuthError(null)
  }, [])

  return useMemo(() => ({ 
    isAuthenticated, 
    authError, 
    isLoading, 
    login, 
    logout, 
    clearError 
  }), [isAuthenticated, authError, isLoading, login, logout, clearError])
}
