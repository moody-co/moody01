import Fastify from 'fastify'
import jwt from '@fastify/jwt'
import { authRoutes } from '@/modules/auth/auth.routes'
import { env } from '@/config/env'
import { usersRoutes } from '@/modules/users/users.routes'

async function bootstrap() {
  const app = Fastify({ logger: true })

  // JWT
  app.register(jwt, {
    secret: env.JWT_SECRET,
  })

  // rotas
  app.register(authRoutes)
  app.register(usersRoutes)

  // health
  app.get('/health', async () => ({ ok: true }))

  await app.listen({ port: env.PORT, host: '0.0.0.0' })
  app.log.info(`Backend running on http://localhost:${env.PORT}`)
}

bootstrap().catch((err) => {
  console.error(err)
  process.exit(1)
})
