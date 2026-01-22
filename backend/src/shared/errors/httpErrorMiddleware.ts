import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from './AppError'
import { logger } from '../../config/logger'

export function registerHttpErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err: FastifyError | AppError, _req: FastifyRequest, reply: FastifyReply) => {
    if (err instanceof AppError) {
      return reply.status(err.statusCode).send({
        error: err.code ?? 'APP_ERROR',
        message: err.message,
      })
    }

    logger.error(err)
    return reply.status(500).send({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Unexpected error',
    })
  })
}
