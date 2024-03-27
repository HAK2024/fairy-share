import { useMutation } from '@tanstack/react-query'
import { deleteHouseApi } from '../../api'

export const useDeleteHouseMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (houseId: number) => {
      return deleteHouseApi(houseId)
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
