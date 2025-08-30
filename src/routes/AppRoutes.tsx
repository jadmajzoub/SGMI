import { Navigate, Route, Routes } from 'react-router-dom';
import DirectorDashboard from '../containers/Director/Dashboard';
import LoadingScreen from '../containers/Director/LoadingScreen';
import LoginPage from '../containers/Director/Login';
import NotFoundPage from '../containers/NotFound';
import Entry from '../containers/Production/Entry';
import { AuthError, LoginCredentials, AuthUser } from '../types/auth';

interface Props {
  isAuthenticated: boolean
  user: AuthUser | null
  authError: AuthError | null
  onLogin: (credentials: LoginCredentials) => Promise<void>
  onClearAuthError: () => void
}

// Helper function to check if user has required role
const hasRole = (user: AuthUser | null, requiredRoles: string[]): boolean => {
  if (!user) return false;
  return requiredRoles.includes(user.role);
};

export default function AppRoutes({ isAuthenticated, user, authError, onLogin, onClearAuthError }: Props) {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? <Navigate to="/director/production-entry" replace /> : (
            <LoginPage 
              onLogin={onLogin} 
              authError={authError}
              onClearAuthError={onClearAuthError}
            />
          )
        } 
      />
      <Route path="/loading" element={<LoadingScreen />} />
      <Route
        path="/director/production-entry"
        element={
          isAuthenticated && hasRole(user, ['DIRECTOR', 'MANAGER']) ? 
            <DirectorDashboard /> : 
            <Navigate to="/" replace />
        }
      />
      <Route 
        path="/production/entry" 
        element={
          isAuthenticated && hasRole(user, ['OPERATOR', 'MANAGER', 'DIRECTOR']) ? 
            <Entry /> : 
            <Navigate to="/" replace />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
