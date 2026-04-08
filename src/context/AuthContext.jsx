import { createContext, useContext, useMemo, useState } from 'react'
import { companies } from '../data/companies'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  const login = (username, password) => {
    const matchedCompany = companies.find(
      (company) =>
        company.credentials.username === username &&
        company.credentials.password === password,
    )

    if (!matchedCompany) {
      return false
    }

    setCurrentUser(matchedCompany)
    return true
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const value = useMemo(
    () => ({
      currentUser,
      login,
      logout,
    }),
    [currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}