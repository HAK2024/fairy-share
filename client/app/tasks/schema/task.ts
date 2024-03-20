import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  date: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: 'Date is required.',
    }),
  assigneeId: z
    .number()
    .nullable()
    .refine((id) => id !== null, {
      message: 'Assignee is required.',
    }),
  note: z
    .string()
    .trim()
    .max(200, { message: 'Note must be less than 200 characters' })
    .optional(),
})

export type taskSchema = z.infer<typeof taskSchema>
export const createTaskResolver = zodResolver(taskSchema)
