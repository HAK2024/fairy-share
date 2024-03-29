import { useMutation } from '@tanstack/react-query'
import { removeMemberApi } from '@/house/api'

export const useRemoveMemberMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ userId, houseId }: { userId: number; houseId: number }) => {
      return removeMemberApi(userId, houseId)
    },
  })

  return {
    mutate,
    isPending,
  }
}
