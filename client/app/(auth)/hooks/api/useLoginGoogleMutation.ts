import { useMutation } from '@tanstack/react-query'
import { loginGoogleApi } from '../../api'

export const useLoginGoogleMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (code: string) => {
      return loginGoogleApi(code)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
