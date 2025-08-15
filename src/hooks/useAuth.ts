import { useCallback, useMemo, useState } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const login = useCallback(() => setIsAuthenticated(true), [])
  const logout = useCallback(() => setIsAuthenticated(false), [])
  return useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout])
}
