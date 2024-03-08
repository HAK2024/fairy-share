import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../../api'
import { LoginSchema } from '../../schema'

export const useLoginMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (req: LoginSchema) => {
      return loginApi(req)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
