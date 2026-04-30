/**
 * AuthContext — user authentication state.
 *
 */
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    // Shopify customerAccessTokenCreate mutation integration point
    // POST to https://{store}.myshopify.com/api/2024-01/graphql.json
    await new Promise((r) => setTimeout(r, 800))
    setUser({ id: crypto.randomUUID(), email, name: email.split('@')[0] })
    setIsLoading(false)
  }

  const signup = async (name: string, email: string, _password: string) => {
    setIsLoading(true)
    // Shopify customerCreate mutation integration point
    await new Promise((r) => setTimeout(r, 800))
    setUser({ id: crypto.randomUUID(), email, name })
    setIsLoading(false)
  }

  const logout = () => setUser(null)

  const resetPassword = async (_email: string) => {
    setIsLoading(true)
    // Shopify customerRecover mutation integration point
    await new Promise((r) => setTimeout(r, 600))
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth — consume authentication state from anywhere in the tree.
 * Throws if used outside AuthProvider to catch wiring mistakes at runtime.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
