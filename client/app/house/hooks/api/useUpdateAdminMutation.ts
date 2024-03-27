import { useMutation } from '@tanstack/react-query'
import { updateAdminApi } from '@/house/api'
import { UpdateAdminSchema } from '@/house/schema'

export const useUpdateAdminMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (req: UpdateAdminSchema) => {
      return updateAdminApi(req)
    },
  })

  return {
    mutate,
    isPending,
  }
}
