import { createApp } from '@/core/factories/create-app.js'
import defineOpenAPI from '@/core/openapi/config.js'
import userRouter from '@/features/user/index.js'

const app = createApp()

defineOpenAPI(app)

app.route('/users', userRouter)

export default app
