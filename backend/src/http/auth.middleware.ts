import { FastifyReply, FastifyRequest } from 'fastify'
import { verifyAccessToken } from '@/modules/auth/auth.tokens'

export async function authGuard(req: FastifyRequest, reply: FastifyReply) {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    return reply.status(401).send({ ok: false, error: 'UNAUTHORIZED' })
  }

  const token = auth.slice('Bearer '.length)

  try {
    const payload = verifyAccessToken(token)
    // @ts-ignore - adiciona user no request
    req.user = { id: payload.sub, email: payload.email, username: payload.username }
  } catch {
    return reply.status(401).send({ ok: false, error: 'INVALID_TOKEN' })
  }
}
