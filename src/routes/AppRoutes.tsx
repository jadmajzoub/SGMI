import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../containers/Director/Login'
import LoadingScreen from '../containers/Director/LoadingScreen'
import ProductionEntryDirector from '../containers/Director/ProductionEntry'
import ProductionEntryProduction from '../containers/Production/ProductionEntry'
import NotFoundPage from '../containers/NotFound'

interface AuthError {
  message: string
  code?: string
}

interface Props {
  isAuthenticated: boolean
  authError: AuthError | null
  onLogin: (credentials?: { username: string; password: string }) => Promise<void>
  onClearAuthError: () => void
}

export default function AppRoutes({ isAuthenticated, authError, onLogin, onClearAuthError }: Props) {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <LoginPage 
            onLogin={onLogin} 
            authError={authError}
            onClearAuthError={onClearAuthError}
          />
        } 
      />
      <Route path="/loading" element={<LoadingScreen />} />
      <Route
        path="/director/production-entry"
        element={isAuthenticated ? <ProductionEntryDirector /> : <Navigate to="/" replace />}
      />
      <Route path="/production/production-entry" element={<ProductionEntryProduction />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
