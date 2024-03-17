import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  date: z.date({ required_error: 'Date is required.' }),
  assigneeId: z.number({
    required_error: 'Assignee is required',
  }),

  note: z
    .string()
    .trim()
    .max(200, { message: 'Note must be less than 200 characters' })
    .optional(),
})

export type createTaskSchema = z.infer<typeof createTaskSchema>
export const createTaskResolver = zodResolver(createTaskSchema)
