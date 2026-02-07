import packageJSON from '@/../package.json' with { type: 'json' }
import type { OpenAPIHono } from '@hono/zod-openapi'
import { Scalar } from '@scalar/hono-api-reference'

export default function defineOpenAPI(app: OpenAPIHono) {
  app.doc('/docs', {
    openapi: '3.0.0',
    info: {
      title: 'Hono Template',
      version: packageJSON.version,
    },
  })

  app.get(
    '/reference',
    Scalar({
      url: '/docs',
      theme: 'deepSpace',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
    }),
  )
}
