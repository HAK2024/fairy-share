import { useMutation } from '@tanstack/react-query'
import { deleteAccountApi } from '@/account/api'

export const useDeleteAccountMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (userId: number, houseId: number) => {
      return deleteAccountApi(userId, houseId)
    },
  })

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  }
}
