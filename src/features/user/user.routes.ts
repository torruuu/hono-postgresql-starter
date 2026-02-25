import * as HttpStatusCodes from '@/constants/http-status-codes.js'
import jsonContent from '@/core/openapi/helpers/json-content.js'
import { openApiErrorResponse } from '@/core/openapi/schemas/error-response.js'
import {
  UserIdParamSchema,
  UserListSchema,
  UserSchema,
} from '@/features/user/user.schema.js'
import { createRoute } from '@hono/zod-openapi'

const tags = ['Users']

export const getAllUsersRoute = createRoute({
  method: 'get',
  path: '/',
  tags,
  summary: 'Get all users',
  description: 'Retrieve a list of all users',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(UserListSchema, {
      description: 'List of users',
    }),
  },
})

export const getUserByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags,
  summary: 'Get user by ID',
  description: 'Retrieve a single user by its ID',
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(UserSchema, {
      description: 'User found',
    }),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(openApiErrorResponse('not_found'), {
      description: 'User not found',
    }),
  },
})

export type GetAllUsersRoute = typeof getAllUsersRoute
export type GetUserByIdRoute = typeof getUserByIdRoute
