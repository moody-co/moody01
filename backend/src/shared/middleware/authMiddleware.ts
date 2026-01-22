import type { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '../errors/AppError'

export async function authMiddleware(req: FastifyRequest, _reply: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch {
    throw new AppError('Unauthorized', 401, 'UNAUTHORIZED')
  }
}
