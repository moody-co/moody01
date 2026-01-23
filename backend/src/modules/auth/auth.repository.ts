import { prisma } from '../../lib/prisma.js'

export class AuthRepository {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  }

  findUserByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } })
  }

  createUser(data: { name: string; email: string; passwordHash: string; username?: string }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        username: data.username ?? null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        avatarUrl: true,
        createdAt: true,
      },
    })
  }
}
