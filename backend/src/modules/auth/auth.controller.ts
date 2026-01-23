import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { AuthService } from './auth.service'

export async function authRoutes(app: FastifyInstance) {
  const service = new AuthService()

  app.post('/auth/login', async (req, reply) => {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    const { email, password } = schema.parse(req.body)

    const result = await service.loginWithEmailPassword(email, password, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    })

    return reply.send({ ok: true, ...result })
  })

  app.post('/auth/refresh', async (req, reply) => {
    const schema = z.object({
      refreshToken: z.string().min(10),
    })
    const { refreshToken } = schema.parse(req.body)

    const result = await service.refresh(refreshToken, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    })

    return reply.send({ ok: true, ...result })
  })

  app.post('/auth/logout', async (req, reply) => {
    const schema = z.object({
      refreshToken: z.string().min(10),
    })
    const { refreshToken } = schema.parse(req.body)

    await service.logout(refreshToken)
    return reply.send({ ok: true })
  })
}
