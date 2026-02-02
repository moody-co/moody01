import type { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '../errors/AppError.js'
import { verifyAccessToken } from '../../modules/auth/auth.tokens.js'

type AuthUser = {
  id: string
  email: string | null
  username: string | null
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthUser
  }
}

export async function authMiddleware(req: FastifyRequest, _reply: FastifyReply) {
  const header = req.headers.authorization
  if (!header) throw new AppError('Unauthorized', 401)

  const [type, token] = header.split(' ')
  if (type !== 'Bearer' || !token) throw new AppError('Unauthorized', 401)

  try {
    const payload = verifyAccessToken(token)

    req.user = {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
    }
  } catch {
    throw new AppError('Unauthorized', 401)
  }
}
