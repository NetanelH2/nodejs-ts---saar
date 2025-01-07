import {z} from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  MONGO_DB_CONNECTION_STRING: z.string({
    required_error: 'MongoDB connection string is required',
  }),
})

type EnvType = z.infer<typeof envSchema>

// Validate environment variables at startup
const env = envSchema.parse(process.env) as EnvType

export const config = {
  mongoUri: env.MONGO_DB_CONNECTION_STRING,
} as const
