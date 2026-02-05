import * as Status from '@/constants/http-status-codes.js'
import * as Phrase from '@/constants/http-status-phrases.js'

export const APP_ERRORS = {
  internal_server_error: {
    status: Status.INTERNAL_SERVER_ERROR,
    message: Phrase.INTERNAL_SERVER_ERROR,
  },
  validation_error: {
    status: Status.UNPROCESSABLE_ENTITY,
    message: 'Validation error',
  },
  not_found: {
    status: Status.NOT_FOUND,
    message: 'Not found',
  },
} as const

export type AppErrorCode = keyof typeof APP_ERRORS
