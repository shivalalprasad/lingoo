import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

import * as schema from '../db/schema'

const sql = neon(process.env.DATA_BASE_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('Reseting the database...')

    await db.delete(schema.courses)
    await db.delete(schema.userProgress)
    await db.delete(schema.units)
    await db.delete(schema.lessons)
    await db.delete(schema.challenges)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)
    await db.delete(schema.userSubscription)

    console.log('Reseting seeded the database!')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to Reset the database!')
  }
}

main()
