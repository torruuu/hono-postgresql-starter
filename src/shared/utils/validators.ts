import { Decimal } from '@prisma/client/runtime/client.js'
import { z } from 'zod'

export const zDecimal = () =>
  z
    .union([z.string(), z.number()])
    .refine(
      (val) => {
        try {
          new Decimal(val)
          return true
        } catch {
          return false
        }
      },
      { message: 'Invalid decimal value' },
    )
    .transform((val) => new Decimal(val))
    .openapi({ description: 'Decimal number format' })

export const zIntParam = () =>
  z.preprocess(
    (value) => (value == null || value === '' ? undefined : Number(value)),
    z.number().int(),
  )
