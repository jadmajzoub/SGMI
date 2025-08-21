import { Navigate, Route, Routes } from 'react-router-dom';
import DirectorDashboard from '../containers/Director/Dashboard';
import LoadingScreen from '../containers/Director/LoadingScreen';
import LoginPage from '../containers/Director/Login';
import NotFoundPage from '../containers/NotFound';
import Entry from '../containers/Production/Entry';

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
        element={isAuthenticated ? <DirectorDashboard /> : <Navigate to="/" replace />}
      />
      <Route path="/production/entry" element={<Entry />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
