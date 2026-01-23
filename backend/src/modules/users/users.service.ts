import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export class UsersService {
  async createUser(input: { name: string; email: string; username: string; password: string }) {
    const email = input.email.trim().toLowerCase()
    const username = input.username.trim().toLowerCase()

    const existingEmail = await prisma.user.findUnique({ where: { email } })
    if (existingEmail) throw new Error('EMAIL_ALREADY_USED')

    const existingUsername = await prisma.user.findUnique({ where: { username } })
    if (existingUsername) throw new Error('USERNAME_ALREADY_USED')

    const passwordHash = await bcrypt.hash(input.password, 10)

    const user = await prisma.user.create({
      data: {
        name: input.name.trim(),
        email,
        username,
        passwordHash,
      },
      select: { id: true, name: true, email: true, username: true, avatarUrl: true },
    })

    return user
  }
}
