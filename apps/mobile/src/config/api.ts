import { router } from 'expo-router'
import { getAccessToken, getRefreshToken, saveTokens, deleteTokens } from '../auth/auth.storage'

export const API = {
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:3333',
}

export type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  accessToken?: string | null
  signal?: AbortSignal
}

export type ApiErrorPayload = {
  message?: string
  error?: string
  statusCode?: number
  issues?: any
}

export class ApiError extends Error {
  status: number
  payload?: ApiErrorPayload

  constructor(message: string, status: number, payload?: ApiErrorPayload) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}
let isRefreshing = false
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token!)
    }
  })
  failedQueue = []
}
// ---------------------------------------------------

export async function apiFetch<T>(path: string, opts: ApiRequestOptions = {}): Promise<T> {
  const url = `${API.baseURL}${path}`

  // 1. Busca o token automaticamente se não for passado explicitamente
  let currentToken = opts.accessToken
  if (currentToken === undefined) {
    currentToken = await getAccessToken()
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers ?? {}),
  }

  if (currentToken) {
    headers.Authorization = `Bearer ${currentToken}`
  }

  // 2. Faz a requisição original
  let res = await fetch(url, {
    method: opts.method ?? 'GET',
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
  })

  // 3. Intercepta falha de autenticação (Token Expirado)
  if (res.status === 401 && currentToken) {
    console.log('🚨 [Interceptor] Erro 401 detectado! Requisição pausada.');
    
    if (isRefreshing) {
      console.log('⏳ [Interceptor] Já existe um refresh em andamento. Entrando na fila de espera...');
      try {
        const newToken = await new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
        headers.Authorization = `Bearer ${newToken}`
        res = await fetch(url, { ...opts, method: opts.method ?? 'GET', headers, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined })
      } catch (err) {
        throw err
      }
    } else {
      console.log('🔄 [Interceptor] Iniciando processo de Refresh Token...');
      isRefreshing = true
      try {
        const refreshToken = await getRefreshToken()
        if (!refreshToken) throw new Error('No refresh token available')

        const refreshRes = await fetch(`${API.baseURL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        })

        if (!refreshRes.ok) throw new Error('Failed to refresh token')

        const refreshData = await refreshRes.json()
        const newAccessToken = refreshData.accessToken
        const newRefreshToken = refreshData.refreshToken

        await saveTokens(newAccessToken, newRefreshToken)
        
        console.log('✅ [Interceptor] Token renovado com sucesso! Liberando fila...');
        processQueue(null, newAccessToken)

        headers.Authorization = `Bearer ${newAccessToken}`
        res = await fetch(url, { ...opts, method: opts.method ?? 'GET', headers, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined })
      } catch (err) {
        console.log('❌ [Interceptor] Falha ao renovar token. Deslogando usuário...');
        processQueue(err, null)
        await deleteTokens()
        router.replace('/(auth)/login') 
        throw err
      } finally {
        isRefreshing = false
      }
    }
  }

  // 4. Lida com a resposta de sucesso ou erro (diferente de 401)
  const text = await res.text()
  const data = text ? safeJson(text) : null

  if (!res.ok) {
    throw new ApiError(
      (data?.message as string) || `Request failed: ${res.status}`,
      res.status,
      data ?? undefined
    )
  }

  return data as T
}

function safeJson(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}