import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../containers/Diretor/Login'
import LoadingScreen from '../containers/Diretor/LoadingScreen'
import EntradaProducaoDiretor from '../containers/Diretor/EntradaProducao'
import EntradaProducaoProducao from '../containers/Producao/EntradaProducao' // <-- sem "/index.tsx"

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
        path="/diretor/entrada"
        element={isAuthenticated ? <EntradaProducaoDiretor /> : <Navigate to="/" replace />}
      />
      <Route path="/producao/entrada" element={<EntradaProducaoProducao />} />
    </Routes>
  )
}
