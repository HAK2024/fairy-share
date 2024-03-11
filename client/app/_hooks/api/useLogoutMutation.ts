import { useMutation } from '@tanstack/react-query'
import { logoutApi } from '@/_api'

export const useLogoutMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: () => {
      return logoutApi()
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
