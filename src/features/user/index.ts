import defaultHook from '@/core/openapi/default-hook.js'
import UserController from '@/features/user/user.controller.js'
import * as routes from '@/features/user/user.routes.js'
import { OpenAPIHono } from '@hono/zod-openapi'

const router = new OpenAPIHono({ defaultHook })
  .openapi(routes.getAllUsersRoute, UserController.getAllUsers)
  .openapi(routes.getUserByIdRoute, UserController.getUserById)

export default router
