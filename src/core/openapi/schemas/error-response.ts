import { APP_ERRORS, type AppErrorCode } from '@/core/errors/app-errors.js'
import zodIssuesFormatter, {
  type FormattedZodIssue,
} from '@/core/errors/zod-issues-formatter.js'
import { z } from '@hono/zod-openapi'

const ZodIssueSchema = z.object({
  code: z.enum([
    'custom',
    'invalid_type',
    'unrecognized_keys',
    'invalid_union',
    'too_big',
    'too_small',
    'invalid_format',
    'not_multiple_of',
    'invalid_key',
    'invalid_element',
    'invalid_value',
  ]),
  path: z.array(z.union([z.string(), z.number()])),
  message: z.string(),
})

function generateIssuesExample(schema: z.ZodType): FormattedZodIssue[] {
  const { error } = schema.safeParse({})

  if (error) {
    return zodIssuesFormatter(error.issues)
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
