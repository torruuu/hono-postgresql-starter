import type { z } from 'zod'
import type { ProductSchema } from './product.schema.js'

export type Product = z.infer<typeof ProductSchema>
