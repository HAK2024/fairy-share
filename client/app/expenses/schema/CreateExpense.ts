import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const createExpenseSchema = z.object({
  itemName: z
    .string()
    .trim()
    .min(1, { message: 'Item name is required' })
    .max(100, { message: 'Item name must be less than 100 characters' }),
  fee: z.coerce
    .number()
    .min(0.01, { message: 'Expense must be greater than 0.' })
    .refine((val) => Math.round(val * 100) / 100 === val, {
      message: 'Expense must be a number with up to 2 decimal place.',
    }),

  date: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: 'Date is required.',
    }),
})

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>
export const createExpenseResolver = zodResolver(createExpenseSchema)
