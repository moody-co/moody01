import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { UsersService } from '@/modules/users/users.service'
import { hashToken, safeCompare } from './auth.hash'
import { makeAccessToken, makeRefreshToken, refreshExpiresAt, verifyRefreshToken } from './auth.tokens'
import { AppError } from '@/shared/errors/AppError'

export class AuthService {
  private users = new UsersService()

  async register(
    input: { name: string; email: string; username: string; password: string },
    meta?: { ip?: string; userAgent?: string }
  ) {
    const user = await this.users.createUser(input)

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        refreshTokenHash: 'temp',
        expiresAt: refreshExpiresAt(),
        ip: meta?.ip,
        userAgent: meta?.userAgent,
      },
    })

    const refreshToken = makeRefreshToken({ sub: user.id, sid: session.id })
    const refreshHash = hashToken(refreshToken)

    await prisma.session.update({
      where: { id: session.id },
      data: { refreshTokenHash: refreshHash },
    })

    const accessToken = makeAccessToken({
      sub: user.id,
      email: user.email ?? null,
      username: user.username ?? null,
    })

    return {
      user: { id: user.id, name: user.name, email: user.email, username: user.username, avatarUrl: user.avatarUrl },
      accessToken,
      refreshToken,
      refreshExpiresAt: session.expiresAt,
    }
  }

  async loginWithEmailPassword(emailRaw: string, password: string, meta?: { ip?: string; userAgent?: string }) {
    const email = emailRaw.trim().toLowerCase()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.passwordHash) throw new AppError('Invalid credentials', 401)

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) throw new AppError('Invalid credentials', 401)

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        refreshTokenHash: 'temp',
        expiresAt: refreshExpiresAt(),
        ip: meta?.ip,
        userAgent: meta?.userAgent,
      },
    })

    const refreshToken = makeRefreshToken({ sub: user.id, sid: session.id })
    const refreshHash = hashToken(refreshToken)

    await prisma.session.update({
      where: { id: session.id },
      data: { refreshTokenHash: refreshHash },
    })

    const accessToken = makeAccessToken({
      sub: user.id,
      email: user.email ?? null,
      username: user.username ?? null,
    })

    return {
      user: { id: user.id, name: user.name, email: user.email, username: user.username, avatarUrl: user.avatarUrl },
      accessToken,
      refreshToken,
      refreshExpiresAt: session.expiresAt,
    }
  }

  async refresh(refreshToken: string, meta?: { ip?: string; userAgent?: string }) {
    const payload = verifyRefreshToken(refreshToken) // { sub, sid }

    const session = await prisma.session.findUnique({ where: { id: payload.sid } })
    if (!session) throw new AppError('Session not found', 401)
    if (session.revokedAt) throw new AppError('Session revoked', 401)
    if (session.expiresAt.getTime() < Date.now()) throw new AppError('Session expired', 401)

    const incomingHash = hashToken(refreshToken)
    const ok = safeCompare(session.refreshTokenHash, incomingHash)

    if (!ok) {
      await prisma.session.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
      })
      throw new AppError('Refresh invalid', 401)
    }

    const newRefreshToken = makeRefreshToken({ sub: payload.sub, sid: session.id })
    const newHash = hashToken(newRefreshToken)
    const newExpiresAt = refreshExpiresAt()

    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshTokenHash: newHash,
        expiresAt: newExpiresAt,
        ip: meta?.ip,
        userAgent: meta?.userAgent,
      },
    })

    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if (!user) throw new AppError('User not found', 404)

    const newAccessToken = makeAccessToken({
      sub: user.id,
      email: user.email ?? null,
      username: user.username ?? null,
    })

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      refreshExpiresAt: newExpiresAt,
    }
  }

  async logout(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken)
    await prisma.session.update({
      where: { id: payload.sid },
      data: { revokedAt: new Date() },
    })
  }
}
