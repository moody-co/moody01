import { PrismaClient } from '@prisma/client';
import { env } from '../env';

// Mostra as queries SQL no terminal apenas se estivermos em desenvolvimento
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
});