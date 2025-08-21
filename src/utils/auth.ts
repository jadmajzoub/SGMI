import { AuthToken, AuthUser } from '../types/auth'

const AUTH_TOKEN_KEY = 'sgmi_auth_token'
const AUTH_USER_KEY = 'sgmi_auth_user'

export const tokenStorage = {
  saveToken: (token: AuthToken): void => {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token))
    } catch (error) {
      console.error('Erro ao salvar token:', error)
    }
  },

  getToken: (): AuthToken | null => {
    try {
      const tokenString = localStorage.getItem(AUTH_TOKEN_KEY)
      if (!tokenString) return null
      
      const token: AuthToken = JSON.parse(tokenString)
      
      if (token.expiresAt < Date.now()) {
        tokenStorage.removeToken()
        return null
      }
      
      return token
    } catch (error) {
      console.error('Erro ao recuperar token:', error)
      tokenStorage.removeToken()
      return null
    }
  },

  removeToken: (): void => {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY)
    } catch (error) {
      console.error('Erro ao remover token:', error)
    }
  },

  isTokenValid: (token: AuthToken | null): boolean => {
    if (!token) return false
    return token.expiresAt > Date.now()
  }
}

export const userStorage = {
  saveUser: (user: AuthUser): void => {
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
    }
  },

  getUser: (): AuthUser | null => {
    try {
      const userString = localStorage.getItem(AUTH_USER_KEY)
      if (!userString) return null
      
      return JSON.parse(userString)
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error)
      userStorage.removeUser()
      return null
    }
  },

  removeUser: (): void => {
    try {
      localStorage.removeItem(AUTH_USER_KEY)
    } catch (error) {
      console.error('Erro ao remover usuário:', error)
    }
  }
}

export const authStorage = {
  clear: (): void => {
    tokenStorage.removeToken()
    userStorage.removeUser()
  },

  isAuthenticated: (): boolean => {
    const token = tokenStorage.getToken()
    const user = userStorage.getUser()
    return !!token && !!user && tokenStorage.isTokenValid(token)
  }
}

const ONE_HOUR_IN_MS = 60 * 60 * 1000

export const createMockToken = (username: string): AuthToken => {
  const currentTimeMs = Date.now()
  const expirationTimeMs = currentTimeMs + ONE_HOUR_IN_MS
  
  return {
    accessToken: `mock_access_token_${username}_${currentTimeMs}`,
    refreshToken: `mock_refresh_token_${username}_${currentTimeMs}`,
    expiresAt: expirationTimeMs
  }
}

export const createMockUser = (username: string): AuthUser => {
  const isDirector = username.toLowerCase().includes('director') || 
                   username.toLowerCase().includes('diretor')
  
  return {
    id: `user_${username}_${Date.now()}`,
    username,
    role: isDirector ? 'director' : 'production'
  }
}