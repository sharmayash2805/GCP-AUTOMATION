import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminAuthProvider } from './context/AdminAuthContext'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import AdminLayout from './layout/AdminLayout'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashboard'
import ApplicationsPage from './pages/ApplicationsPage'
import VerificationPage from './pages/VerificationPage'
import CreditsPage from './pages/CreditsPage'
import LandPage from './pages/LandPage'
import CompaniesPage from './pages/CompaniesPage'

function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />

        <Route
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="verification" element={<VerificationPage />} />
          <Route path="credits" element={<CreditsPage />} />
          <Route path="land" element={<LandPage />} />
          <Route path="companies" element={<CompaniesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminAuthProvider>
  )
}

export default AdminRoutes
