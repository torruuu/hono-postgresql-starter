import { PrismaClient } from '@/core/db/generated/prisma/client.js'
import env from '@/env.js'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  port: env.DATABASE_PORT,
})
const prisma = new PrismaClient({ adapter })

export { prisma }
