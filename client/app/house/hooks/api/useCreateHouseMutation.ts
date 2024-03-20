import { useMutation } from '@tanstack/react-query'
import { createHouseApi } from '../../api'
import { CreateHouseSchema } from '../../schema'

export const useCreateHouseMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (req: CreateHouseSchema) => {
      return createHouseApi(req)
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
