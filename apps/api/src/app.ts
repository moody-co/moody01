import fastify from 'fastify';
import cors from '@fastify/cors'; // Instale com: npm install @fastify/cors
import { eventsRoutes } from './routes/events.routes';

export const app = fastify();

// Configuração de CORS para permitir que o App Mobile acesse a API
app.register(cors, {
  origin: true, // Em desenvolvimento podemos deixar true
});

app.get('/health', async (request, reply) => {
  return reply.status(200).send({ 
    message: 'Moody API is running! 🚀', 
    status: 'OK' 
  });
});

app.register(eventsRoutes);