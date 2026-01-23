import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(3).max(24),
  email: z.string().email(),
  password: z.string().min(6).max(72),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(72),
})

export const refreshSchema = z.object({
  refreshToken: z.string().min(10),
})
