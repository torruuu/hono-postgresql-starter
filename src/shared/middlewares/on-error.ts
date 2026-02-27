import { INTERNAL_SERVER_ERROR, OK } from '@/constants/http-status-codes.js'
import { APP_ERRORS, type AppErrorCode } from '@/core/errors/app-errors.js'
import envConfig from '@/env.js'
import type { ErrorHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

const onError: ErrorHandler = (err, c) => {
  const currentStatus = 'status' in err ? err.status : c.newResponse(null).status
  const statusCode =
    currentStatus !== OK ? (currentStatus as ContentfulStatusCode) : INTERNAL_SERVER_ERROR

  const currentCode = 'code' in err ? (err.code as AppErrorCode) : undefined
  const errorCode: AppErrorCode =
    currentCode && currentCode in APP_ERRORS ? currentCode : 'internal_server_error'

  const env = envConfig.NODE_ENV
  return c.json(
    {
      code: errorCode,
      message: err.message,
      stack: env === 'production' ? undefined : err.stack,
    },
    statusCode,
  )
}

export default onError
