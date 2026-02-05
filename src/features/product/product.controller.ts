import { httpError } from '@/core/errors/http-error-handler.js'
import type { RouteHandler } from '@hono/zod-openapi'
import type { GetAllProductsRoute, GetProductByIdRoute } from './product.routes.js'
import * as productService from './product.service.js'

export const getAllProducts: RouteHandler<GetAllProductsRoute> = (c) => {
  const products = productService.getAllProducts()
  return c.json(products, 200)
}

export const getProductById: RouteHandler<GetProductByIdRoute> = (c) => {
  const { id } = c.req.valid('param')
  const product = productService.getProductById(id)

  if (!product) {
    return httpError(c, 'not_found')
  }

  return c.json(product, 200)
}
