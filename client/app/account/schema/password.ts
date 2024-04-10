import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .regex(/^[^\s]*$/, {
        message: 'Password cannot contain any empty spaces',
      })
      .min(8, { message: 'Password must be more than 8 characters' })
      .max(50, { message: 'Password must be less than 50 characters' }),
    newPassword: z
      .string()
      .trim()
      .regex(/^[^\s]*$/, {
        message: 'Password cannot contain any empty spaces',
      })
      .min(8, { message: 'Password must be more than 8 characters' })
      .max(50, { message: 'Password must be less than 50 characters' }),
    confirmNewPassword: z
      .string()
      .trim()
      .regex(/^[^\s]*$/, {
        message: 'Password cannot contain any empty spaces',
      })
      .min(8, { message: 'Password must be more than 8 characters' })
      .max(50, { message: 'Password must be less than 50 characters' }),
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    message: 'Confirmation password must match new password exactly',
    path: ['confirmNewPassword'],
  })

export type PasswordSchema = z.infer<typeof passwordSchema>
export const passwordResolver = zodResolver(passwordSchema)
