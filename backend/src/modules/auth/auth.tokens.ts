import jwt from 'jsonwebtoken'

export type AccessPayload = {
  sub: string
  email?: string | null
  username?: string | null
}

export type RefreshPayload = {
  sub: string
  sid: string
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!

const ACCESS_MIN = Number(process.env.ACCESS_TOKEN_TTL_MIN ?? 15)
const REFRESH_DAYS = Number(process.env.REFRESH_TOKEN_TTL_DAYS ?? 30)

export function makeAccessToken(payload: AccessPayload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: `${ACCESS_MIN}m` })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as AccessPayload & { iat: number; exp: number }
}

export function makeRefreshToken(payload: RefreshPayload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: `${REFRESH_DAYS}d` })
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as RefreshPayload & { iat: number; exp: number }
}

export function refreshExpiresAt() {
  const d = new Date()
  d.setDate(d.getDate() + REFRESH_DAYS)
  return d
}
