// @ts-ignore
import { userProgress } from '@/db/schema';
import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";

import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema"

const sql = neon(process.env.DATA_BASE_URL!)

const db = drizzle(sql,{schema});

const main = async()=>{
  try{
    console.log("seeding data base");

    await db.delete(schema.courses)
    // @ts-ignore
    await db.delete(schema.userProgress)

    console.log("seeding finished");

  } catch(error){
    console.log(error);
    throw new Error("Failed to seed the Database")
  }
}


main()
