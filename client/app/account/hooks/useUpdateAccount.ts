import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { UserType } from '@/_types'
import { isErrorWithMessage } from '@/_utils'
import { useUpdateAccountMutation } from './api'
import { AccountSchema, accountResolver } from '../schema'

export const useUpdateAccount = (user: UserType) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<AccountSchema>({
    resolver: accountResolver,
    defaultValues: {
      name: user.name,
      email: user.email,
      icon: user.icon.toString(),
    },
  })

  const { mutate, isPending } = useUpdateAccountMutation()

  const onUpdateAccount = (data: AccountSchema) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['me'] })
        queryClient.invalidateQueries({ queryKey: ['expenses'] })
        toast({
          variant: 'success',
          title: 'Successfully updated your account!',
        })
        router.push('/account')
      },
      onError: (error) => {
        console.error(error)
        let message = 'Please try again later.'

        if (isErrorWithMessage(error) && error.response) {
          message = error.response.data.message
        }
        toast({
          variant: 'destructive',
          title: 'Failed to update the account..',
          description: message,
        })
      },
    })
  }

  return {
    form,
    onSubmit: form.handleSubmit(onUpdateAccount),
    isPending,
  }
}
