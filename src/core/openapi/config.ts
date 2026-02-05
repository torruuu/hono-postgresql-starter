import packageJSON from '@/../package.json' with { type: 'json' }
import type { OpenAPIHono } from '@hono/zod-openapi'

export default function defineOpenAPI(app: OpenAPIHono) {
  app.doc('/docs', {
    openapi: '3.0.0',
    info: {
      title: 'Hono Template',
      version: packageJSON.version,
    },
  })
}
