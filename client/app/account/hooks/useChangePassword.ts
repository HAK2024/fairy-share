import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useChangePasswordMutation } from './api'
import { PasswordSchema, passwordResolver } from '../schema'

export const useChangePassword = () => {
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

  const onChansePassword = (data: PasswordSchema) => {
    mutate(data, {
      onSuccess: () => {
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
    onSubmit: form.handleSubmit(onChansePassword),
    isPending,
  }
}
