import type { FastifyInstance } from 'fastify'
import { authGuard } from '@/plugins/authGuard'
import { prisma } from '@/lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/me', { preHandler: [authGuard] }, async (req) => {
    const userId = (req.user as any).sub as string

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

    return { user }
  })
}
