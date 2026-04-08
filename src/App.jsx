import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AIAnalytics from './pages/AIAnalytics'
import CompanyDashboard from './pages/CompanyDashboard'
import CreditsDashboard from './pages/CreditsDashboard'
import LandAllocation from './pages/LandAllocation'
import LoginPage from './pages/LoginPage'

function RootRedirect() {
  const { currentUser } = useAuth()

  return <Navigate to={currentUser ? '/dashboard' : '/login'} replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<CompanyDashboard />} />
        <Route path="/land" element={<LandAllocation />} />
        <Route path="/analytics" element={<AIAnalytics />} />
        <Route path="/credits" element={<CreditsDashboard />} />
      </Route>

      <Route path="*" element={<RootRedirect />} />
    </Routes>
  )
}

export default App
