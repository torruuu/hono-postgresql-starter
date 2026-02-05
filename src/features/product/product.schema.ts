import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.string(),
})

export const ProductListSchema = z.array(ProductSchema)

export const ProductIdParamSchema = z.object({
  id: z.string(),
})
