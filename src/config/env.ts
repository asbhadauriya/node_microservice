import dotenv from 'dotenv'
import { z } from 'zod'


dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),

  // Optional in non-production; required and must be a URL in production.
  DATABASE_URL: z.string().url().optional(),

  // Optional in non-production; required in production and must be >=10 chars.
  JWT_SECRET: z.string().min(10).optional()
})



const parsed = envSchema.parse(process.env)

export const env = {
  NODE_ENV: parsed.NODE_ENV,
  PORT: parsed.PORT,
  DATABASE_URL: parsed.DATABASE_URL ?? '',
  JWT_SECRET: parsed.JWT_SECRET ?? (parsed.NODE_ENV === 'production' ? undefined : 'dev-secret-please-change')
}

if (env.NODE_ENV === 'production') {
  if (!env.DATABASE_URL) throw new Error('DATABASE_URL is required in production')
  if (!env.JWT_SECRET) throw new Error('JWT_SECRET is required in production')
}

