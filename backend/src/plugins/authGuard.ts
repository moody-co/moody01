import type { FastifyRequest, FastifyReply } from 'fastify'

export async function authGuard(request: FastifyRequest, reply: FastifyReply) {
  try {
  } catch {
    return reply.status(401).send({ message: 'UNAUTHORIZED' })
  }
}
