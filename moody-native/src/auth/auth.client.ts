import { apiFetch } from '@/config/api'
import type { AuthResponse, LoginDTO, RegisterDTO, RefreshResponse } from './auth.types'

export async function apiRegister(dto: RegisterDTO) {
  return apiFetch<AuthResponse>('/auth/register', { method: 'POST', body: dto })
}

export async function apiLogin(dto: LoginDTO) {
  return apiFetch<AuthResponse>('/auth/login', { method: 'POST', body: dto })
}

export async function apiRefresh(refreshToken: string) {
  return apiFetch<RefreshResponse>('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
  })
}

export async function apiLogout(refreshToken: string) {
  return apiFetch<{ ok: true }>('/auth/logout', {
    method: 'POST',
    body: { refreshToken },
  })
}
