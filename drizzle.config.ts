import { config } from 'dotenv';
import {defineConfig} from "drizzle-kit"

config({path:'.env'})

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials:{
    url: process.env.DATA_BASE_URL!,
  },
});
