import type { ZodType } from 'zod'

type JsonContentOptions = {
  description: string
  required?: boolean // por defecto false
}

const jsonContent = <T extends ZodType>(schema: T, options: JsonContentOptions) => {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description: options.description,
    required: options.required ?? false, // si no se pasa, falso
  }
}

export default jsonContent
