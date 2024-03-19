import { useMutation } from '@tanstack/react-query'
import { loginGoogleApi } from '../../api'

export const useLoginGoogleMutation = (invitedHouseId: string | null) => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (code: string) => {
      return loginGoogleApi(code, invitedHouseId)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
