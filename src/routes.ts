import { FastifyInstance } from 'fastify'
import { prisma } from './lib/prisma'

export async function myRoutes(app: FastifyInstance) {
  app.get('/habit', async () => {
    const habits = await prisma.habit.findMany()

    return habits
  })
}