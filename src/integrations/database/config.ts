import { PrismaClient } from '@/core/db/generated/prisma/client.js'
import env from '@/env.js'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  port: env.DB_PORT,
})
const prisma = new PrismaClient({ adapter })

export { prisma }
