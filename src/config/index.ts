import { env } from './env'

export const config = {
  env: env.NODE_ENV,
  port: Number(env.PORT),

  databaseUrl: env.DATABASE_URL,

  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '7d'
  },

  isProd: env.NODE_ENV === 'production',
  isDev: env.NODE_ENV === 'development'
}
