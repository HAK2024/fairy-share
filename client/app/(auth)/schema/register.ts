import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const registerSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .max(5, { message: 'Name must be less than 20 character(s)' }),
  email: z.string().email('This is not valid email address'),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(50, { message: 'Password must be less than 50 character(s)' }),
})

export type RegisterSchema = z.infer<typeof registerSchema>
export const registerResolver = zodResolver(registerSchema)
