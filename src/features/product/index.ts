import { createRouter } from '@/core/factories/create-app.js'
import * as controllers from '@/features/product/product.controller.js'
import * as routes from '@/features/product/product.routes.js'

const router = createRouter()
  .openapi(routes.getAllProductsRoute, controllers.getAllProducts)
  .openapi(routes.getProductByIdRoute, controllers.getProductById)
  .openapi(routes.createProductRoute, controllers.createProduct)

export default router
