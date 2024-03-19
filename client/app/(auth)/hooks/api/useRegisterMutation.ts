import { useMutation } from '@tanstack/react-query'
import { registerApi } from '../../api'
import { RegisterSchema } from '../../schema'

export const useRegisterMutation = (invitedHouseId: string | null) => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (req: RegisterSchema) => {
      return registerApi(req, invitedHouseId)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
