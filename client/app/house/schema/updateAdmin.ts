import * as z from 'zod'

const updateAdminSchema = z.object({
  userId: z.number(),
  houseId: z.number(),
  isAdmin: z.boolean(),
})

export type UpdateAdminSchema = z.infer<typeof updateAdminSchema>
