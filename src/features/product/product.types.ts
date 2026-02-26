import type {
  Prisma,
  Product as PrismaProduct,
} from '@/core/db/generated/prisma/client.js'

export type Product = PrismaProduct

export type CreateProduct = Prisma.ProductCreateInput
