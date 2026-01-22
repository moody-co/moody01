import type { FastifyInstance } from 'fastify'

export async function eventsRoutes(app: FastifyInstance) {
  app.get('/', async () => [])
  app.get('/:eventId', async () => ({ ok: true }))
}
