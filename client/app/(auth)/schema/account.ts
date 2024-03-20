import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const accountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(20, { message: 'Name must be less than 20 characters' }),
  email: z
    .string()
    .trim()
    .email('This is not valid email address')
    .max(50, { message: 'Email must be less than 50 characters' }),
  icon: z.string(),
})

export type AccountSchema = z.infer<typeof accountSchema>
export const accountResolver = zodResolver(accountSchema)
