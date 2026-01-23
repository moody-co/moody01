import { z } from 'zod'
import 'dotenv/config'

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),

  DATABASE_URL: z.string().min(1),

  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),

  JWT_ISSUER: z.string().default('moody-api'),
  JWT_AUDIENCE: z.string().default('moody-app'),

  ACCESS_TOKEN_TTL_MIN: z.coerce.number().default(15),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().default(30),
})

export const env = schema.parse(process.env)
