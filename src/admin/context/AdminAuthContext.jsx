import { createContext, useContext, useMemo, useState } from 'react'
import { ADMIN_CREDENTIALS, adminOfficer } from '../data/adminData'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null)

  const adminLogin = (username, password) => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setAdminUser(adminOfficer)
      return true
    }
    return false
  }

  const adminLogout = () => {
    setAdminUser(null)
  }

  const value = useMemo(
    () => ({ adminUser, adminLogin, adminLogout }),
    [adminUser],
  )

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
