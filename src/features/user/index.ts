import { createRouter } from '@/core/factories/create-app.js'
import UserController from '@/features/user/user.controller.js'
import * as routes from '@/features/user/user.routes.js'

const router = createRouter()
  .openapi(routes.getAllUsersRoute, UserController.getAllUsers)
  .openapi(routes.getUserByIdRoute, UserController.getUserById)

export default router
