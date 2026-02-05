import { OpenAPIHono } from '@hono/zod-openapi'
import * as controllers from './product.controller.js'
import * as routes from './product.routes.js'

const router = new OpenAPIHono()
  .openapi(routes.getAllProductsRoute, controllers.getAllProducts)
  .openapi(routes.getProductByIdRoute, controllers.getProductById)

export default router
