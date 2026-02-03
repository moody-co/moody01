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

export async function apiFetch<T>(path: string, opts: ApiRequestOptions = {}): Promise<T> {
  const url = `${API.baseURL}${path}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers ?? {}),
  }

  if (opts.accessToken) {
    headers.Authorization = `Bearer ${opts.accessToken}`
  }

  const res = await fetch(url, {
    method: opts.method ?? 'GET',
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
  })

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
