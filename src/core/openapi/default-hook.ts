import { httpError } from '@/core/errors/http-error-handler.js'
import type { Hook } from '@hono/zod-openapi'
import type { Env } from 'hono'

const defaultHook: Hook<unknown, Env, string, unknown> = (result, c) => {
  if (!result.success) {
    return httpError(c, 'validation_error', { issues: result.error.issues })
  }
}

export default defaultHook
