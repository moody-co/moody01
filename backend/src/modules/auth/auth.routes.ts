import { FastifyInstance } from 'fastify'
import { AuthService } from './auth.service'
import { loginSchema, refreshSchema, registerSchema } from './auth.schemas'

export async function authRoutes(app: FastifyInstance) {
  const service = new AuthService()

  app.post('/register', async (req, reply) => {
    const dto = registerSchema.parse(req.body)

    const result = await service.register(dto)
    return reply.send({ ok: true, ...result })
  })

  app.post('/login', async (req, reply) => {
    const dto = loginSchema.parse(req.body)

    const result = await service.loginWithEmailPassword(dto.email, dto.password, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    })

    return reply.send({ ok: true, ...result })
  })

  app.post('/refresh', async (req, reply) => {
    const dto = refreshSchema.parse(req.body)

    const result = await service.refresh(dto.refreshToken, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    })

    return reply.send({ ok: true, ...result })
  })

  app.post('/logout', async (req, reply) => {
    const dto = refreshSchema.parse(req.body)
    await service.logout(dto.refreshToken)

    return reply.send({ ok: true })
  })
}
