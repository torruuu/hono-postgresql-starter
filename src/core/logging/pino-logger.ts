import env from '@/env.js'
import type { MiddlewareHandler } from 'hono'
import { pinoHttp, type HttpLogger } from 'pino-http'
import pretty from 'pino-pretty'

declare module 'hono' {
  interface ContextVariableMap {
    logger: HttpLogger['logger']
  }
}

const prettyStream = pretty({
  colorize: true,
})

const pinoLogger = (): MiddlewareHandler => {
  const httpLogger = pinoHttp(env.NODE_ENV === 'development' ? prettyStream : undefined)

  return async (c, next) => {
    // Pass hono's request-id to pino-http
    c.env.incoming.id = c.var.requestId

    // Map express style middleware to hono
    await new Promise<void>((resolve) =>
      httpLogger(c.env.incoming, c.env.outgoing, () => resolve()),
    )

    c.set('logger', c.env.incoming.log)

    await next()
  }
}

export default pinoLogger
