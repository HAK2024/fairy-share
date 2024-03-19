import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../../api'
import { LoginSchema } from '../../schema'

export const useLoginMutation = (invitedHouseId: string | null) => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (req: LoginSchema) => {
      return loginApi(req, invitedHouseId)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
