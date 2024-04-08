import { useMutation } from '@tanstack/react-query'
import { updateAdminApi } from '@/house/api'
import { UpdateAdminType } from '../../type'

export const useUpdateAdminMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (req: UpdateAdminType) => {
      return updateAdminApi(req)
    },
  })

  return {
    mutate,
    isPending,
  }
}
