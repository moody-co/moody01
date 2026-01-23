// src/auth/auth.context.tsx
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ApiError, apiFetch } from '@/config/api'
import type { AuthUser, LoginDTO, RegisterDTO } from './auth.types'
import { apiLogin, apiLogout, apiRefresh, apiRegister } from './auth.client'
import { deleteRefreshToken, getRefreshToken, saveRefreshToken } from './auth.storage'

type AuthState = {
  user: AuthUser | null
  accessToken: string | null
  isBooting: boolean
  isAuthed: boolean
}

type AuthContextValue = AuthState & {
  register: (dto: RegisterDTO) => Promise<void>
  login: (dto: LoginDTO) => Promise<void>
  logout: () => Promise<void>

  // wrapper que já faz refresh automático se der 401
  authedFetch: <T>(path: string, opts?: { method?: any; body?: any }) => Promise<T>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isBooting, setIsBooting] = useState(true)

  // evita várias chamadas de refresh ao mesmo tempo
  const refreshLock = useRef<Promise<string> | null>(null)

  const isAuthed = !!accessToken && !!user

  const boot = useCallback(async () => {
    try {
      const refreshToken = await getRefreshToken()
      if (!refreshToken) return

      // tenta refresh silencioso
      const refreshed = await apiRefresh(refreshToken)
      await saveRefreshToken(refreshed.refreshToken)
      setAccessToken(refreshed.accessToken)

      // busca o usuário atual com o token novo
      const me = await apiFetch<{ ok: true; user: AuthUser }>('/users/me', {
        method: 'GET',
        accessToken: refreshed.accessToken,
      })
      setUser(me.user)
    } catch {
      // se falhar, limpa tudo
      await deleteRefreshToken()
      setAccessToken(null)
      setUser(null)
    } finally {
      setIsBooting(false)
    }
  }, [])

  useEffect(() => {
    boot()
  }, [boot])

  const register = useCallback(async (dto: RegisterDTO) => {
    const res = await apiRegister(dto)
    await saveRefreshToken(res.refreshToken)
    setAccessToken(res.accessToken)
    setUser(res.user)
  }, [])

  const login = useCallback(async (dto: LoginDTO) => {
    const res = await apiLogin(dto)
    await saveRefreshToken(res.refreshToken)
    setAccessToken(res.accessToken)
    setUser(res.user)
  }, [])

  const logout = useCallback(async () => {
    const refreshToken = await getRefreshToken()
    if (refreshToken) {
      try {
        await apiLogout(refreshToken)
      } catch {
        // tudo bem se falhar
      }
    }

    await deleteRefreshToken()
    setAccessToken(null)
    setUser(null)
  }, [])

  const doRefresh = useCallback(async () => {
    if (refreshLock.current) return refreshLock.current

    refreshLock.current = (async () => {
      const refreshToken = await getRefreshToken()
      if (!refreshToken) throw new ApiError('No refresh token', 401)

      const refreshed = await apiRefresh(refreshToken)
      await saveRefreshToken(refreshed.refreshToken)
      setAccessToken(refreshed.accessToken)

      // garante que tenha user carregado (caso o app reabra)
      if (!user) {
        const me = await apiFetch<{ ok: true; user: AuthUser }>('/users/me', {
          method: 'GET',
          accessToken: refreshed.accessToken,
        })
        setUser(me.user)
      }

      return refreshed.accessToken
    })()

    try {
      return await refreshLock.current
    } finally {
      refreshLock.current = null
    }
  }, [user])

  const authedFetch = useCallback(
    async <T,>(path: string, opts?: { method?: any; body?: any }) => {
      if (!accessToken) {
        // tenta refresh silencioso antes de desistir
        const newToken = await doRefresh()
        return apiFetch<T>(path, { method: opts?.method, body: opts?.body, accessToken: newToken })
      }

      try {
        return await apiFetch<T>(path, { method: opts?.method, body: opts?.body, accessToken })
      } catch (e: any) {
        if (e instanceof ApiError && e.status === 401) {
          const newToken = await doRefresh()
          return apiFetch<T>(path, { method: opts?.method, body: opts?.body, accessToken: newToken })
        }
        throw e
      }
    },
    [accessToken, doRefresh]
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isBooting,
      isAuthed,
      register,
      login,
      logout,
      authedFetch,
    }),
    [user, accessToken, isBooting, isAuthed, register, login, logout, authedFetch]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
