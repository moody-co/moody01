// src/auth/auth.types.ts
export type AuthUser = {
  id: string
  name: string
  email: string | null
  username: string | null
  avatarUrl?: string | null
}

export type RegisterDTO = {
  name: string
  username: string
  email: string
  password: string
}

export type LoginDTO = {
  email: string
  password: string
}

export type AuthResponse = {
  ok: true
  user: AuthUser
  accessToken: string
  refreshToken: string
  refreshExpiresAt: string | Date
}

export type RefreshResponse = {
  ok: true
  accessToken: string
  refreshToken: string
  refreshExpiresAt: string | Date
}
