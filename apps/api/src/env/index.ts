import 'dotenv/config';
import { z } from 'zod';

// Validamos as variáveis que precisamos para a API rodar
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().default('moody-secret-dev-123'), // Adicionamos depois no .env
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Variáveis de ambiente inválidas:', _env.error.format());
  throw new Error('Variáveis de ambiente inválidas.');
}

export const env = _env.data;