import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('This is not valid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .max(50, { message: 'Password must be less than 50 characters' }),
})

export type LoginSchema = z.infer<typeof loginSchema>
export const loginResolver = zodResolver(loginSchema)
