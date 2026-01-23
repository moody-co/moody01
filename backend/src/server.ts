import Fastify from 'fastify'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'

import { env } from '@/config/env'

import { httpErrorMiddleware } from '@/shared/errors/httpErrorMiddleware'

import { healthRoutes } from '@/modules/health/health.routes'
import { authRoutes } from '@/modules/auth/auth.routes'
import { usersRoutes } from '@/modules/users/users.routes'
import { venuesRoutes } from '@/modules/venues/venues.routes'
import { eventsRoutes } from '@/modules/events/events.routes'
import { checkinsRoutes } from '@/modules/checkins/checkins.routes'
import { reviewsRoutes } from '@/modules/reviews/reviews.routes'
import { ticketsRoutes } from '@/modules/tickets/tickets.routes'
import { paymentsRoutes } from '@/modules/payments/payments.routes'

async function main() {
  const app = Fastify({ logger: true })

  await app.register(cors, { origin: true })

  await app.register(rateLimit, {
    max: 120,
    timeWindow: '1 minute',
  })

  await app.register(healthRoutes, { prefix: '/health' })
  await app.register(authRoutes, { prefix: '/auth' })
  await app.register(usersRoutes, { prefix: '/users' })
  await app.register(venuesRoutes, { prefix: '/venues' })
  await app.register(eventsRoutes, { prefix: '/events' })
  await app.register(checkinsRoutes, { prefix: '/checkins' })
  await app.register(reviewsRoutes, { prefix: '/reviews' })
  await app.register(ticketsRoutes, { prefix: '/tickets' })
  await app.register(paymentsRoutes, { prefix: '/payments' })

  app.setErrorHandler(httpErrorMiddleware)

  await app.listen({ port: env.PORT, host: '0.0.0.0' })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
