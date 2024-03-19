import { useMutation } from '@tanstack/react-query'
import { accountApi } from '../../api'
import { AccountSchema } from '../../schema'

export const useAccountMutation = () => {
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (req: AccountSchema) => {
      return accountApi(req)
    },
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
