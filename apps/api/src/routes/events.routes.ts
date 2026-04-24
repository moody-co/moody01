import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma'; 
export async function eventsRoutes(app: FastifyInstance) {
  app.get('/events', async (request, reply) => {
    try {
      const events = await prisma.event.findMany({
        include: {
          venue: {
            select: {
              name: true,
              category: true,
              addressLine: true,
            }
          },
          checkins: {
            where: {
              createdAt: {
                gte: new Date(Date.now() - 2 * 60 * 60 * 1000)
              }
            }
          }
        },
        orderBy: {
          startsAt: 'asc', // Eventos mais próximos primeiro
        },
      });

      return reply.status(200).send({ ok: true, events });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ ok: false, error: 'Internal Server Error' });
    }
  });
}