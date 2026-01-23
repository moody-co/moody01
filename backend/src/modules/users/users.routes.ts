import { FastifyInstance } from 'fastify'
import { requireAuth } from '@/http/auth.middleware'
import { prisma } from '@/lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/me', { preHandler: [requireAuth] }, async (req) => {
    const userId = req.user!.id

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        avatarUrl: true,
        bio: true,
        city: true,
        state: true,
        createdAt: true,
      },
    })

    return { ok: true, user }
  })
}
