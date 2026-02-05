import { APP_ERRORS, type AppErrorCode } from '@/core/errors/app-errors.js'
import { z } from '@hono/zod-openapi'

const ZodIssueSchema = z.object({
  code: z.string(),
  path: z.array(z.union([z.string(), z.number()])),
  message: z.string().optional(),
})

type IssueExample = z.infer<typeof ZodIssueSchema>

function generateIssuesExample(schema: z.ZodType): IssueExample[] {
  const { error } = schema.safeParse({})

  if (error) {
    return error.issues.map((issue) => ({
      code: issue.code,
      path: issue.path.filter((p): p is string | number => typeof p !== 'symbol'),
      message: issue.message,
    }))
  }

  return [
    {
      code: 'invalid_type',
      path: ['fieldName'],
      message: 'Expected string, received undefined',
    },
  ]
}

/**
 * Creates an OpenAPI error response schema
 * @param code - Application error code from APP_ERRORS
 * @param schema - Optional Zod schema to generate validation error examples
 */
export function openApiErrorResponse(code: AppErrorCode, schema?: z.ZodType) {
  const appError = APP_ERRORS[code]

  const baseSchema = z.object({
    error: z.object({
      code: z.string().openapi({ example: code }),
      message: z.string().openapi({ example: appError.message }),
    }),
  })

  if (!schema) {
    return baseSchema
  }

  return z.object({
    error: z.object({
      code: z.string().openapi({ example: 'validation_error' }),
      message: z.string().openapi({ example: 'Validation error' }),
      issues: z.array(ZodIssueSchema).openapi({
        example: generateIssuesExample(schema),
      }),
    }),
  })
}
