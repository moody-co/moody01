import type { FastifyRequest, FastifyReply } from 'fastify'
import type { ZodSchema } from 'zod'

export const validateBody =
  (schema: ZodSchema) => async (req: FastifyRequest, reply: FastifyReply) => {
    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
      return reply.status(400).send({
        error: 'VALIDATION_ERROR',
        issues: parsed.error.issues,
      })
    }
    req.body = parsed.data
  }
