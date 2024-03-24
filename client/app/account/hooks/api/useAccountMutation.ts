import { useMutation } from '@tanstack/react-query'
import { accountUpdateApi } from '@/account/api'
import { AccountSchema } from '@/account/schema'

export const useAccountMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: AccountSchema }) => {
      return accountUpdateApi(userId, data)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
