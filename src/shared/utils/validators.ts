import { z } from 'zod'

export const zIntParam = () =>
  z.preprocess(
    (value) => (value == null || value === '' ? undefined : Number(value)),
    z.number().int(),
  )
