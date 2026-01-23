import jwt from 'jsonwebtoken'
import { env } from '@/config/env'

type AccessTokenPayload = {
  sub: string
  email: string | null
  username: string | null
}

type RefreshTokenPayload = {
  sub: string
  sid: string
}

function accessExpiresIn() {
  // jsonwebtoken aceita string também, mas aqui mantemos número em segundos
  return env.ACCESS_TOKEN_TTL_MIN * 60
}

export function refreshExpiresAt() {
  const ms = env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000
  return new Date(Date.now() + ms)
}

export function makeAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: accessExpiresIn(),
  })
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload
}

export function makeRefreshToken(payload: RefreshTokenPayload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: `${env.REFRESH_TOKEN_TTL_DAYS}d`,
  })
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload
}
