import { useMutation } from '@tanstack/react-query'
import { editAccountApi } from '@/account/api'
import { AccountSchema } from '@/account/schema'

export const useEditAccountMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: AccountSchema }) => {
      return editAccountApi(userId, data)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
