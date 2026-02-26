import type { CreateProduct, Product } from '@/features/product/product.types.js'
import { prisma } from '@/integrations/database/config.js'

export function getAllProducts(): Promise<Product[]> {
  return prisma.product.findMany()
}

export function getProductById(id: number): Promise<Product | null> {
  return prisma.product.findUnique({ where: { id } })
}

export function createProduct(data: CreateProduct): Promise<Product> {
  return prisma.product.create({ data })
}
