import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

import * as schema from '../db/schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('Seeding the database...')

    await db.delete(schema.courses)
    await db.delete(schema.userProgress)
    await db.delete(schema.units)
    await db.delete(schema.lessons)
    await db.delete(schema.challenges)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)
    await db.delete(schema.userSubscription)

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Spanish',
        imageSrc: '/es.svg',
      },
      {
        id: 2,
        title: 'English',
        imageSrc: '/us.svg',
      },
      {
        id: 3,
        title: 'France',
        imageSrc: '/fr.svg',
      },
      {
        id: 4,
        title: 'Italian',
        imageSrc: '/it.svg',
      },
      {
        id: 5,
        title: 'Japnese',
        imageSrc: '/jp.svg',
      },
    ])

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Espanhol
        title: 'Capítulo 1',
        description: 'Aprenda o básico de Espanhol',
        order: 1,
      },
    ])

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Capítulo 1 (Aprenda o básico de espanhol)
        title: 'Substantivos',
        order: 1,
      },
      {
        id: 2,
        unitId: 1, // Capítulo 1 (Aprenda o básico de espanhol)
        title: 'Verbos',
        order: 2,
      },
      {
        id: 3,
        unitId: 1, // Capítulo 1 (Aprenda o básico de espanhol)
        title: 'Verbos',
        order: 3,
      },
      {
        id: 4,
        unitId: 1, // Capítulo 1 (Aprenda o básico de espanhol)
        title: 'Verbos',
        order: 4,
      },
      {
        id: 5,
        unitId: 1, // Capítulo 1 (Aprenda o básico de espanhol)
        title: 'Verbos',
        order: 5,
      },
    ])

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Substantivos
        type: 'SELECT',
        question: 'Which of the following means "The Man"?',
        order: 1,
      },
      {
        id: 2,
        lessonId: 1, // Substantivos
        type: 'ASSIST',
        question: '"O homem"',
        order: 2,
      },
      {
        id: 3,
        lessonId: 1, // Substantivos
        type: 'SELECT',
        question: 'Qual das seguintes opções significa "O Robô"?',
        order: 3,
      },
    ])

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // Qual das seguintes opções significa "O Homem"?
        imageSrc: '/man.svg',
        correct: true,
        text: 'El hombre',
        audioSrc: 'es_man.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/woman.svg',
        correct: false,
        text: 'La mujer',
        audioSrc: 'es_woman.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/robot.svg',
        correct: false,
        text: 'El robot',
        audioSrc: 'es_robot.mp3',
      },
    ])

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: true,
        text: 'El hombre',
        audioSrc: 'es_man.mp3',
      },
      {
        challengeId: 2,
        correct: false,
        text: 'La mujer',
        audioSrc: 'es_woman.mp3',
      },
      {
        challengeId: 2,
        correct: false,
        text: 'El robot',
        audioSrc: 'es_robot.mp3',
      },
    ])

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // Qual das seguintes opções significa "O Robô"?
        imageSrc: '/man.svg',
        correct: false,
        text: 'El hombre',
        audioSrc: 'es_man.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/woman.svg',
        correct: false,
        text: 'La mujer',
        audioSrc: 'es_woman.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/robot.svg',
        correct: true,
        text: 'El robot',
        audioSrc: 'es_robot.mp3',
      },
    ])

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, // Verbos
        type: 'SELECT',
        question: 'Qual das seguintes opções significa "O Homem"?',
        order: 1,
      },
      {
        id: 5,
        lessonId: 2, // Verbos
        type: 'ASSIST',
        question: '"O homem"',
        order: 2,
      },
      {
        id: 6,
        lessonId: 2, // Verbos
        type: 'SELECT',
        question: 'Qual das seguintes opções significa "O Robô"?',
        order: 3,
      },
    ])

    console.log('Successfully seeded the database!')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed the database!')
  }
}

main()
