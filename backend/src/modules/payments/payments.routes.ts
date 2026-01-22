import type { FastifyInstance } from 'fastify'

export async function paymentsRoutes(app: FastifyInstance) {
  app.post('/webhook', async () => ({ ok: true }))
}
