import jwt, { type SignOptions, type VerifyOptions, type Algorithm } from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '@/config/env'

const accessPayloadSchema = z.object({
  sub: z.string(),
  email: z.string().nullable(),
  username: z.string().nullable(),
})

const refreshPayloadSchema = z.object({
  sub: z.string(),
  sid: z.string(),
})

export type AccessTokenPayload = z.infer<typeof accessPayloadSchema>
export type RefreshTokenPayload = z.infer<typeof refreshPayloadSchema>

function accessExpiresInSeconds() {
  return env.ACCESS_TOKEN_TTL_MIN * 60
}

export function refreshExpiresAt() {
  const ms = env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000
  return new Date(Date.now() + ms)
}

const commonSignOptions: SignOptions = {
  algorithm: 'HS256',
  issuer: env.JWT_ISSUER,
  audience: env.JWT_AUDIENCE,
}

const verifyOptions: VerifyOptions = {
  algorithms: ['HS256' as Algorithm],
  issuer: env.JWT_ISSUER,
  audience: env.JWT_AUDIENCE,
}

export function makeAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    ...commonSignOptions,
    expiresIn: accessExpiresInSeconds(),
  })
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET, verifyOptions)
  return accessPayloadSchema.parse(decoded)
}

export function makeRefreshToken(payload: RefreshTokenPayload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    ...commonSignOptions,
    expiresIn: `${env.REFRESH_TOKEN_TTL_DAYS}d`,
  })
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, verifyOptions)
  return refreshPayloadSchema.parse(decoded)
}
