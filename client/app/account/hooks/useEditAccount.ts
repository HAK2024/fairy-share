import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { UserType } from '@/_types'
import { isErrorWithMessage } from '@/_utils'
import { useEditAccountMutation } from './api'
import { AccountSchema, accountResolver } from '../schema'

export const useEditAccount = (user: UserType) => {
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

  const { mutate, isPending } = useEditAccountMutation()

  const onEditAccount = (data: AccountSchema) => {
    mutate(
      { userId: user.id, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['me'] })
          toast({
            variant: 'success',
            title: 'Successfully edited your account!',
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
            title: 'Failed to edit the account..',
            description: message,
          })
        },
      },
    )
  }

  return {
    form,
    onSubmit: form.handleSubmit(onEditAccount),
    isPending,
  }
}
