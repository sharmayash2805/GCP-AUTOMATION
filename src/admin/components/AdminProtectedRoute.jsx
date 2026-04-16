import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

function AdminProtectedRoute({ children }) {
  const { adminUser } = useAdminAuth()
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

export default AdminProtectedRoute
