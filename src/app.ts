import pinoLogger from '@/core/logging/pino-logger.js'
import defineOpenAPI from '@/core/openapi/config.js'
import productRouter from '@/features/product/index.js'
import notFound from '@/shared/middlewares/not-found.js'
import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'

const app = new OpenAPIHono()

app.use(requestId())
app.use(pinoLogger())
defineOpenAPI(app)

app.get('/', (c) => c.json({ message: 'Hello Hono!' }))

app.route('/products', productRouter)

app.notFound(notFound)

export default app
