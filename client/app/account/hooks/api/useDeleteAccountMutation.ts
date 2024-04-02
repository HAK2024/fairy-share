import { useMutation } from '@tanstack/react-query'
import { deleteAccountApi } from '@/account/api'

export const useDeleteAccountMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (houseId: number) => {
      return deleteAccountApi(houseId)
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
