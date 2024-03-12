import { useMutation } from '@tanstack/react-query'
import { registerApi } from '../../api'
import { RegisterSchema } from '../../schema'

export const useRegisterMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (req: RegisterSchema) => {
      return registerApi(req)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
