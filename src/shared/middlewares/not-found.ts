import { NOT_FOUND as NOT_FOUND_MESSAGE } from '@/constants/http-status-phrases.js'
import { httpError } from '@/core/errors/http-error-handler.js'
import type { NotFoundHandler } from 'hono'

const notFound: NotFoundHandler = (c) => {
  return httpError(c, 'not_found', { message: `${NOT_FOUND_MESSAGE} - ${c.req.path}` })
}

export default notFound
