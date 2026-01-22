import type { FastifyInstance } from 'fastify'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', async () => {
    return { ok: true, message: 'mock login' }
  })
}
