import pinoLogger from '@/core/logging/pino-logger.js'
import defineOpenAPI from '@/core/openapi/config.js'
import defaultHook from '@/core/openapi/default-hook.js'
import userRouter from '@/features/user/index.js'
import notFound from '@/shared/middlewares/not-found.js'
import onError from '@/shared/middlewares/on-error.js'
import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'

const app = new OpenAPIHono({
  defaultHook,
})

app.use(requestId())
app.use(pinoLogger())
defineOpenAPI(app)

app.get('/', (c) => c.json({ message: 'Hello World' }))

app.route('/users', userRouter)

app.notFound(notFound)
app.onError(onError)

export default app
