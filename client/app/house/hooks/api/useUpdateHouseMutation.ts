import { useMutation } from '@tanstack/react-query'
import { updateHouseApi } from '../../api'
import { UpdateHouseSchema } from '../../schema'
import { HouseApiType } from '../../type'

export const useUpdateHouseMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: ({
      data,
      houseId,
    }: {
      data: HouseApiType<UpdateHouseSchema>
      houseId: number
    }) => {
      return updateHouseApi(data, houseId)
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
