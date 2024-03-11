import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(20, { message: 'Email must be less than 50 characters' }),
  email: z
    .string()
    .email('This is not valid email address')
    .max(50, { message: 'Email must be less than 50 characters' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' })
    .max(50, { message: 'Password must be less than 50 characters' }),
})

export type RegisterSchema = z.infer<typeof registerSchema>
export const registerResolver = zodResolver(registerSchema)
