import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from './AppError.js'

export function httpErrorMiddleware(error: FastifyError, _req: FastifyRequest, reply: FastifyReply) {
  // Se for erro nosso (AppError), usa statusCode dele
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ ok: false, message: error.message })
  }

  // Se for erro do Fastify com statusCode
  const statusCode = (error as any).statusCode ?? 500

  return reply.status(statusCode).send({
    ok: false,
    message: error.message ?? 'Internal Server Error',
  })
}
