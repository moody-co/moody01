import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import rateLimit from '@fastify/rate-limit'

import { env } from './config/env.js'

import { healthRoutes } from './modules/health/health.routes.js'
import { authRoutes } from './modules/auth/auth.routes.js'
import { usersRoutes } from './modules/users/users.routes.js'
import { venuesRoutes } from './modules/venues/venues.routes.js'
import { eventsRoutes } from './modules/events/events.routes.js'
import { checkinsRoutes } from './modules/checkins/checkins.routes.js'
import { reviewsRoutes } from './modules/reviews/reviews.routes.js'
import { ticketsRoutes } from './modules/tickets/tickets.routes.js'
import { paymentsRoutes } from './modules/payments/payments.routes.js'

import { httpErrorMiddleware } from './shared/errors/httpErrorMiddleware.js'

export async function buildApp() {
  const app = Fastify({
    logger: true,
  })

  await app.register(cors, { origin: true })

  await app.register(rateLimit, {
    max: 120,
    timeWindow: '1 minute',
  })

  await app.register(jwt, {
    secret: env.JWT_SECRET,
  })

  // routes
  await app.register(healthRoutes, { prefix: '/health' })
  await app.register(authRoutes, { prefix: '/auth' })
  await app.register(usersRoutes, { prefix: '/users' })
  await app.register(venuesRoutes, { prefix: '/venues' })
  await app.register(eventsRoutes, { prefix: '/events' })
  await app.register(checkinsRoutes, { prefix: '/checkins' })
  await app.register(reviewsRoutes, { prefix: '/reviews' })
  await app.register(ticketsRoutes, { prefix: '/tickets' })
  await app.register(paymentsRoutes, { prefix: '/payments' })

  // error handler
  app.setErrorHandler(httpErrorMiddleware)

  return app
}
