import type { FastifyInstance } from 'fastify'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/me', async () => {
    return { ok: true, user: null }
  })
}
