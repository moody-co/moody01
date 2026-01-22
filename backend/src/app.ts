import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import rateLimit from '@fastify/rate-limit'
import { env } from './config/env'
import { registerHttpErrorHandler } from './shared/errors/httpErrorMiddleware'

// routes
import { healthRoutes } from './modules/health/health.routes'
import { authRoutes } from './modules/auth/auth.routes'
import { usersRoutes } from './modules/users/users.routes'
import { venuesRoutes } from './modules/venues/venues.routes'
import { eventsRoutes } from './modules/events/events.routes'
import { checkinsRoutes } from './modules/checkins/checkins.routes'
import { reviewsRoutes } from './modules/reviews/reviews.routes'
import { ticketsRoutes } from './modules/tickets/tickets.routes'
import { paymentsRoutes } from './modules/payments/payments.routes'

export async function buildApp() {
  const app = Fastify({ logger: false })

  await app.register(cors, { origin: true })

  await app.register(rateLimit, {
    max: 120,
    timeWindow: '1 minute',
  })

  await app.register(jwt, { secret: env.JWT_SECRET })

  registerHttpErrorHandler(app)

  // modules
  await app.register(healthRoutes, { prefix: '/health' })
  await app.register(authRoutes, { prefix: '/auth' })
  await app.register(usersRoutes, { prefix: '/users' })
  await app.register(venuesRoutes, { prefix: '/venues' })
  await app.register(eventsRoutes, { prefix: '/events' })
  await app.register(checkinsRoutes, { prefix: '/checkins' })
  await app.register(reviewsRoutes, { prefix: '/reviews' })
  await app.register(ticketsRoutes, { prefix: '/tickets' })
  await app.register(paymentsRoutes, { prefix: '/payments' })

  return app
}
