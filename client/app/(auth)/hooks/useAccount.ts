import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { useGetMeQuery } from '@/_hooks/api'
import { isErrorWithMessage } from '@/_utils'
import { useAccountMutation } from './api'
import { AccountSchema, accountResolver } from '../schema'

export const useAccount = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()

  const { data: user } = useGetMeQuery()

  // Get currect user's info
  // how to handle user undefinded??
  const form = useForm<AccountSchema>({
    resolver: accountResolver,
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  })

  const { mutate, isPending } = useAccountMutation()

  const onEditAccount = (data: AccountSchema) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['account'] })
        router.push('/account')

        toast({
          variant: 'success',
          title: 'Successfully edited the account',
        })
      },
      onError: (error) => {
        console.error(error)
        let message = 'Please try again later.'

        if (isErrorWithMessage(error) && error.response) {
          message = error.response.data.message
        }
        toast({
          variant: 'destructive',
          title: 'Failed to edit the account..',
          description: message,
        })
      },
    })
  }

  return {
    form,
    onSubmit: form.handleSubmit(onEditAccount),
    isPending,
  }
}
