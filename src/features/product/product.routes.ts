import * as HttpStatusCodes from '@/constants/http-status-codes.js'
import jsonContent from '@/core/openapi/helpers/json-content.js'
import { openApiErrorResponse } from '@/core/openapi/schemas/error-response.js'
import {
  CreateProductSchema,
  ProductIdParamSchema,
  ProductListSchema,
  ProductSchema,
} from '@/features/product/product.schema.js'
import { createRoute } from '@hono/zod-openapi'

const tags = ['Products']

export const getAllProductsRoute = createRoute({
  method: 'get',
  path: '/',
  tags,
  summary: 'Get all products',
  description: 'Retrieve a list of all available products',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(ProductListSchema, {
      description: 'List of products',
    }),
  },
})

export const getProductByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags,
  summary: 'Get product by ID',
  description: 'Retrieve a single product by its ID',
  request: {
    params: ProductIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(ProductSchema, {
      description: 'Product found',
    }),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(openApiErrorResponse('not_found'), {
      description: 'Product not found',
    }),
  },
})

export const createProductRoute = createRoute({
  method: 'post',
  path: '/',
  tags,
  summary: 'Create a product',
  description: 'Create a new product',
  request: {
    body: jsonContent(CreateProductSchema, {
      description: 'Product data',
      required: true,
    }),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(ProductSchema, {
      description: 'Product created',
    }),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      openApiErrorResponse('validation_error', CreateProductSchema),
      { description: 'Validation error' },
    ),
  },
})

export type GetAllProductsRoute = typeof getAllProductsRoute
export type GetProductByIdRoute = typeof getProductByIdRoute
export type CreateProductRoute = typeof createProductRoute
