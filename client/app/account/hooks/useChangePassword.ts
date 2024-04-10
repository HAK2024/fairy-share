import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useChangePasswordMutation } from './api'
import { PasswordSchema, passwordResolver } from '../schema'

export const useChangePassword = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<PasswordSchema>({
    resolver: passwordResolver,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const { mutate, isPending } = useChangePasswordMutation()

  const onUpdateAccount = (data: PasswordSchema) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['me'] })
        toast({
          variant: 'success',
          title: 'Successfully updated your password!',
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
          title: 'Failed to update the password..',
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
