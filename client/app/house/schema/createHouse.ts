import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const createHouseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  isExpensePerTime: z
    .string({ required_error: 'Please select expense tracking type' })
    .transform((value) => (value === 'eachTime' ? true : false)),
  rules: z.array(
    z.object({
      text: z
        .string()
        .trim()
        .min(1, {
          message: 'Rule text is required or please delete it with X button',
        })
        .max(200, { message: 'Rule must be less than 100 characters' }),
    }),
  ),
})

export type CreateHouseSchema = z.infer<typeof createHouseSchema>
export const createHouseResolver = zodResolver(createHouseSchema)
