import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { AppError } from '@/shared/errors/AppError'

export class UsersService {
  async createUser(input: { name: string; email: string; username: string; password: string }) {
    const email = input.email.trim().toLowerCase()
    const username = input.username.trim().toLowerCase()

    const existsEmail = await prisma.user.findUnique({ where: { email } })
    if (existsEmail) throw new AppError('EMAIL_ALREADY_IN_USE', 409)

    const existsUsername = await prisma.user.findUnique({ where: { username } })
    if (existsUsername) throw new AppError('USERNAME_ALREADY_IN_USE', 409)

    const passwordHash = await bcrypt.hash(input.password, 10)

    const user = await prisma.user.create({
      data: {
        name: input.name.trim(),
        email,
        username,
        passwordHash,
      },
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
        updatedAt: true,
      },
    })

    return user
  }
}
