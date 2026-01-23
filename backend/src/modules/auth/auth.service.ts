import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { UsersService } from '@/modules/users/users.service'
import { hashToken, safeCompare } from './auth.hash'
import { makeAccessToken, makeRefreshToken, refreshExpiresAt, verifyRefreshToken } from './auth.tokens'

export class AuthService {
  private users = new UsersService()

  async register(input: { name: string; email: string; username: string; password: string }) {
    const user = await this.users.createUser(input)

    // cria sessão + refresh
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        refreshTokenHash: 'temp',
        expiresAt: refreshExpiresAt(),
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
      user,
      accessToken,
      refreshToken,
      refreshExpiresAt: session.expiresAt,
    }
  }

  async loginWithEmailPassword(
    emailRaw: string,
    password: string,
    meta?: { ip?: string; userAgent?: string }
  ) {
    const email = emailRaw.trim().toLowerCase()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.passwordHash) throw new Error('INVALID_CREDENTIALS')

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) throw new Error('INVALID_CREDENTIALS')

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
    if (!session) throw new Error('SESSION_NOT_FOUND')
    if (session.revokedAt) throw new Error('SESSION_REVOKED')
    if (session.expiresAt.getTime() < Date.now()) throw new Error('SESSION_EXPIRED')

    const incomingHash = hashToken(refreshToken)
    const ok = safeCompare(session.refreshTokenHash, incomingHash)

    if (!ok) {
      // segurança: token inválido pro sid → revoga sessão
      await prisma.session.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
      })
      throw new Error('REFRESH_INVALID')
    }

    // ✅ rotation + renovação para +30 dias
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
    if (!user) throw new Error('USER_NOT_FOUND')

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
