import { httpError } from '@/core/errors/http-error-handler.js'
import type {
  CreateProductRoute,
  GetAllProductsRoute,
  GetProductByIdRoute,
} from '@/features/product/product.routes.js'
import * as productService from '@/features/product/product.service.js'
import type { RouteHandler } from '@hono/zod-openapi'

export const getAllProducts: RouteHandler<GetAllProductsRoute> = async (c) => {
  const products = await productService.getAllProducts()
  return c.json(products, 200)
}

export const getProductById: RouteHandler<GetProductByIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const product = await productService.getProductById(id)

  if (!product) {
    return httpError(c, 'not_found')
  }

  return c.json(product, 200)
}

export const createProduct: RouteHandler<CreateProductRoute> = async (c) => {
  const body = c.req.valid('json')
  const product = await productService.createProduct(body)
  return c.json(product, 201)
}
