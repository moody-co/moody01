import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().min(10),
  DATABASE_URL: z.string().min(1),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('❌ Invalid env:', parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables.')
}

export const env = parsed.data
