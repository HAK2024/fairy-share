import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const signInSchema = z.object({
  email: z.string().email('This is not valid email address'),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 character(s)' }),
})

export type SignInSchema = z.infer<typeof signInSchema>
export const signInResolver = zodResolver(signInSchema)
