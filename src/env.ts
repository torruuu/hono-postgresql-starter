import { z } from 'zod'

if (process.env.NODE_ENV !== 'production') {
  await import('dotenv').then((dotenv) => dotenv.config())
}

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string(),
})

export type env = z.infer<typeof EnvSchema>

let env: env

try {
  env = EnvSchema.parse(process.env)
} catch (e) {
  const error = e as z.ZodError
  console.error('Invalid environment variables:')
  console.error(z.prettifyError(error))
  process.exit(1)
}

export default env
