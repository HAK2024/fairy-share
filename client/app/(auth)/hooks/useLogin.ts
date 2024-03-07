import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useLoginMutation } from './api'
import { loginResolver, LoginSchema } from '../schema'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<LoginSchema>({
    resolver: loginResolver,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = useLoginMutation()

  const onLogin = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['me'] })
        router.push('/')
      },
      onError: (error) => {
        console.error(error)
        let message = 'Please try again later.'

        if (isErrorWithMessage(error) && error.response) {
          message = error.response.data.message
        }
        toast({
          variant: 'destructive',
          title: 'Failed to login..',
          description: message,
        })
      },
    })
  }

  return {
    form,
    onSubmit: form.handleSubmit(onLogin),
    isPending,
  }
}
