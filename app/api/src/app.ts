import fastify from 'fastify';

export const app = fastify();

app.get('/health', async (request, reply) => {
  return reply.status(200).send({ 
    message: 'Moody API is running! 🚀', 
    status: 'OK' 
  });
});
