import { useMutation } from '@tanstack/react-query'
import { createUserHouseApi } from '@/_api'

export const useCreateUserHouseMutation = () => {
  const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (houseId: string) => {
      return createUserHouseApi(houseId)
    },
  })

  return { mutate, mutateAsync, isPending, isSuccess, isError }
}
