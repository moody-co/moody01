import type { FastifyInstance } from 'fastify'

export async function venuesRoutes(app: FastifyInstance) {
  app.get('/', async () => [])
  app.get('/:venueId', async () => ({ ok: true }))
}
