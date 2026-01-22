import type { FastifyInstance } from 'fastify'

export async function ticketsRoutes(app: FastifyInstance) {
  app.get('/', async () => [])
}
