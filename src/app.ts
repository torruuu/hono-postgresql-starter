import { createApp } from '@/core/factories/create-app.js'
import defineOpenAPI from '@/core/openapi/config.js'
import productRouter from '@/features/product/index.js'

const app = createApp()

defineOpenAPI(app)

app.route('/products', productRouter)

export default app
