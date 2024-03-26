import { useMutation } from '@tanstack/react-query'
import { updateAccountApi } from '@/account/api'
import { AccountSchema } from '@/account/schema'

export function useUpdateAccountMutation() {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: AccountSchema }) => {
      return updateAccountApi(userId, data)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
