import { useMutation } from '@tanstack/react-query'
import { changePasswordApi } from '@/account/api'
import { PasswordSchema } from '@/account/schema'

export function useChangePasswordMutation() {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (data: PasswordSchema) => {
      return changePasswordApi(data)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
