import pinoLogger from '@/core/logging/pino-logger.js'
import defaultHook from '@/core/openapi/default-hook.js'
import notFound from '@/shared/middlewares/not-found.js'
import onError from '@/shared/middlewares/on-error.js'
import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'

export function createRouter() {
  return new OpenAPIHono({ defaultHook })
}

export function createApp() {
  const app = createRouter()

  app.use(requestId()).use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
