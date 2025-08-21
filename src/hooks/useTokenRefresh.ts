import { useEffect, useRef } from 'react'
import { useAuth } from './useAuth'

const TOKEN_REFRESH_INTERVAL_MS = 5 * 60 * 1000 // 5 minutos
const TOKEN_EXPIRY_BUFFER_MS = 10 * 60 * 1000 // 10 minutos antes do token expirar

export function useTokenRefresh() {
  const { token, refreshToken, isAuthenticated } = useAuth()
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !token) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    const checkAndRefreshToken = async () => {
      if (!token) return

      const timeUntilExpiry = token.expiresAt - Date.now()
      
      if (timeUntilExpiry <= TOKEN_EXPIRY_BUFFER_MS) {
        try {
          await refreshToken()
        } catch (error) {
          console.error('Falha ao renovar token automaticamente:', error)
        }
      }
    }

    intervalRef.current = setInterval(checkAndRefreshToken, TOKEN_REFRESH_INTERVAL_MS)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [token, refreshToken, isAuthenticated])
}