import { useMutation } from '@tanstack/react-query'
import { accountUpdateApi } from '@/account/api'
import { AccountSchema } from '@/account/schema'

export const useAccountMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (req: AccountSchema) => {
      return accountUpdateApi(req)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
