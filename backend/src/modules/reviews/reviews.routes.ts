import type { FastifyInstance } from 'fastify'

export async function reviewsRoutes(app: FastifyInstance) {
  app.post('/', async () => ({ ok: true }))
}
