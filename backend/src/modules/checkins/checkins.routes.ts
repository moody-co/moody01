import type { FastifyInstance } from 'fastify'

export async function checkinsRoutes(app: FastifyInstance) {
  app.post('/', async () => ({ ok: true }))
}
