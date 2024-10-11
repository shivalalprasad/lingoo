import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

import * as schema from '../db/schema'

const sql = neon(process.env.DATA_BASE_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('Seeding the database...')

    await db.delete(schema.courses)

    await db.delete(schema.UserProgress)
    await db.delete(schema.units)
    await db.delete(schema.lessons)
    await db.delete(schema.challenges)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Croatian',
        ImageSrc: '/hr.svg',
      },
      {
        id: 2,
        title: 'Spanish',
        ImageSrc: '/es.svg',
      },
      {
        id: 3,
        title: 'French',
        ImageSrc: '/fr.svg',
      },
      {
        id: 4,
        title: 'Italian',
        ImageSrc: '/it.svg',
      },
      {
        id: 5,
        title: 'Japanese',
        ImageSrc: '/jp.svg',
      },
    ])

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Espanhol
        title: 'Spanish 1',
        description: 'Learn the basics of Spanish',
        order: 1,
      },
    ])

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        title: 'Substantivos',
        order: 1,
      },
      {
        id: 2,
        unitId: 1,
        title: 'Verbos',
        order: 2,
      },
      {
        id: 3,
        unitId: 1,
        title: 'Verbos',
        order: 3,
      },
      {
        id: 4,
        unitId: 1,
        title: 'Verbos',
        order: 4,
      },
      {
        id: 5,
        unitId: 1,
        title: 'Verbos',
        order: 5,
      },
    ])

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        question: 'Qual das seguintes opções significa "O Homem"?',
        order: 1,
      },
      {
        id: 2,
        lessonId: 1,
        type: 'ASSIST',
        question: '"O homem"',
        order: 2,
      },
      {
        id: 3,
        lessonId: 1,
        type: 'SELECT',
        question: 'Qual das seguintes opções significa "O Robô"?',
        order: 3,
      },
    ])

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        ImageSrc: '/man.svg',
        correct: true,
        text: 'El hombre',
        audioSrc: 'es_man.mp3',
      },
      {
        challengeId: 1,
        ImageSrc: '/woman.svg',
        correct: false,
        text: 'La mujer',
        audioSrc: 'es_woman.mp3',
      },
      {
        challengeId: 1,
        ImageSrc: '/robot.svg',
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
        challengeId: 3,
        ImageSrc: '/man.svg',
        correct: false,
        text: 'El hombre',
        audioSrc: 'es_man.mp3',
      },
      {
        challengeId: 3,
        ImageSrc: '/woman.svg',
        correct: false,
        text: 'La mujer',
        audioSrc: 'es_woman.mp3',
      },
      {
        challengeId: 3,
        ImageSrc: '/robot.svg',
        correct: true,
        text: 'El robot',
        audioSrc: 'es_robot.mp3',
      },
    ])

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2,
        type: 'SELECT',
        question: 'Qual das seguintes opções significa "O Homem"?',
        order: 1,
      },
      {
        id: 5,
        lessonId: 2,
        type: 'ASSIST',
        question: '"O homem"',
        order: 2,
      },
      {
        id: 6,
        lessonId: 2,
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
