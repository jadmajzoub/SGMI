import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { useAuth } from './hooks/useAuth'

export default function App() {
  const { isAuthenticated, login } = useAuth()
  return (
    <BrowserRouter>
      <AppRoutes isAuthenticated={isAuthenticated} onLogin={login} />
    </BrowserRouter>
  )
}
