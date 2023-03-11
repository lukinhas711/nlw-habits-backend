import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const firstHabitId = '0738ddac-d039-4194-9571-01aa2aa0efbd'
const firstHabitCreatedAt = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297'
const secondHabiCreatedAt = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = 'fa1a1bcf-3d83-4626-8c0d-d7fd1255ac00'
const thirdHabitCreatedAt = new Date('2023-01-08T03:00:00.000')

async function main() {
  await prisma.habit.deleteMany()
  await prisma.days.deleteMany()

  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: 'Treinar pelo menos 30 min',
        created_at: firstHabitCreatedAt,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 3 },
            { week_day: 5 }
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: 'correr todos os dias',
        created_at: secondHabiCreatedAt,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 }
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: 'Acordar antes das 8am',
        created_at: thirdHabitCreatedAt,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 }
          ]
        }
      }
    })
  ])

  await Promise.all([
    prisma.days.create({
      data: {
        date: new Date('2023-01-01T00:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: firstHabitId }
          ]
        }
      }
    }),

    prisma.days.create({
      data: {
        date: new Date('2023-01-04T00:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: firstHabitId },
            { habit_id: secondHabitId },
          ]
        }
      }
    }),

    prisma.days.create({
      data: {
        date: new Date('2023-01-06T00:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: firstHabitId },
            { habit_id: secondHabitId },
          ]
        }
      }
    })
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })