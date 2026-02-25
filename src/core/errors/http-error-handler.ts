import { APP_ERRORS, type AppErrorCode } from '@/core/errors/app-errors.js'
import zodIssuesFormatter from '@/core/errors/zod-issues-formatter.js'
import type { Context } from 'hono'
import type { z } from 'zod'

interface HttpErrorOptions {
  message?: string
  issues?: z.core.$ZodIssue[]
}

export const httpError = <T extends AppErrorCode>(
  c: Context,
  code: T,
  options?: HttpErrorOptions,
) => {
  const err = APP_ERRORS[code]

  return c.json(
    {
      error: {
        code,
        message: options?.message ?? err.message,
        ...(options?.issues && { issues: zodIssuesFormatter(options.issues) }),
      },
    },
    err.status as (typeof APP_ERRORS)[T]['status'],
  )
}
