import { APP_ERRORS, type AppErrorCode } from '@/core/errors/app-errors.js'
import type { Context } from 'hono'

export const httpError = <T extends AppErrorCode>(
  c: Context,
  code: T,
  customMessage?: string,
) => {
  const err = APP_ERRORS[code]

  return c.json(
    {
      error: {
        code,
        message: customMessage ?? err.message,
      },
    },
    err.status as (typeof APP_ERRORS)[T]['status'],
  )
}
