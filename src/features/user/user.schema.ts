import { z } from 'zod'

export const UserSchema = z.object({
  id: z.int(),
  email: z.email(),
  name: z.string().nullable(),
})

export const UserListSchema = z.array(UserSchema)

export const UserIdParamSchema = z.object({
  id: z.preprocess(
    (value) => (value == null || value === '' ? undefined : Number(value)),
    z.number().int(),
  ),
})
