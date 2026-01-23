import { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '@/shared/errors/AppError'
import { verifyAccessToken } from '@/modules/auth/auth.tokens'

export async function requireAuth(request: FastifyRequest, _reply: FastifyReply) {
  const auth = request.headers.authorization

  if (!auth) {
    throw new AppError('UNAUTHORIZED', 401)
  }

  const [type, token] = auth.split(' ')

  if (type !== 'Bearer' || !token) {
    throw new AppError('UNAUTHORIZED', 401)
  }

  try {
    const payload = verifyAccessToken(token)

    // ✅ padroniza o user no request
    request.user = {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
    }
  } catch {
    throw new AppError('UNAUTHORIZED', 401)
  }
}
