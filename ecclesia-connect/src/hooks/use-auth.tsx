"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "member"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_USER: User = {
  id: "1",
  name: "Fr. Jean Kouassi",
  email: "admin@ecclesia-connect.com",
  role: "admin",
}

const MEMBER_USER: User = {
  id: "2",
  name: "Marie Aka",
  email: "marie@ecclesia-connect.com",
  role: "member",
}

const CREDENTIALS = {
  "admin@ecclesia-connect.com": { password: "admin123", user: ADMIN_USER },
  "marie@ecclesia-connect.com": { password: "membre123", user: MEMBER_USER },
}

const STORAGE_KEY = "ecclesia-auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {}
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const cred = CREDENTIALS[email as keyof typeof CREDENTIALS]
    if (cred && cred.password === password) {
      setUser(cred.user)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cred.user))
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
