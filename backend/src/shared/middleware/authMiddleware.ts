import type { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '../errors/AppError.js'

import { verifyAccessToken } from '@/modules/auth/auth.tokens'

export async function authMiddleware(req: FastifyRequest, _reply: FastifyReply) {
  const auth = req.headers.authorization

  if (!auth?.startsWith('Bearer ')) {
    throw new AppError('Unauthorized', 401)
  }

  const token = auth.slice('Bearer '.length).trim()
  if (!token) {
    throw new AppError('Unauthorized', 401)
  }

  try {
    const payload = verifyAccessToken(token)
    req.user = {
      id: payload.sub,
      email: payload.email ?? null,
      username: payload.username ?? null,
    }
  } catch {
    throw new AppError('Unauthorized', 401)
  }
}
