import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../containers/Director/Login'
import LoadingScreen from '../containers/Director/LoadingScreen'
import ProductionEntryDirector from '../containers/Director/ProductionEntry'
import ProductionEntryProduction from '../containers/Production/ProductionEntry'

interface Props {
  isAuthenticated: boolean
  onLogin: () => void
}

export default function AppRoutes({ isAuthenticated, onLogin }: Props) {
  return (
    <Routes>
      <Route path="/" element={<LoginPage onLogin={onLogin} />} />
      <Route path="/loading" element={<LoadingScreen />} />
      <Route
        path="/director/production-entry"
        element={isAuthenticated ? <ProductionEntryDirector /> : <Navigate to="/" replace />}
      />
      <Route path="/production/production-entry" element={<ProductionEntryProduction />} />
    </Routes>
  )
}
