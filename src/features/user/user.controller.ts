import { httpError } from '@/core/errors/http-error-handler.js'
import type { GetAllUsersRoute, GetUserByIdRoute } from '@/features/user/user.routes.js'
import UserService from '@/features/user/user.service.js'
import type { RouteHandler } from '@hono/zod-openapi'

export default class UserController {
  static getAllUsers: RouteHandler<GetAllUsersRoute> = async (c) => {
    const users = await UserService.getAllUsers()
    return c.json(users, 200)
  }

  static getUserById: RouteHandler<GetUserByIdRoute> = async (c) => {
    const { id } = c.req.valid('param')
    const user = await UserService.getUserById(Number(id))

    if (!user) {
      return httpError(c, 'not_found')
    }

    return c.json(user, 200)
  }
}
