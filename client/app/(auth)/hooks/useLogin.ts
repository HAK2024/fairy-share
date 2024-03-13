import { useRouter } from 'next/navigation'
import { useGoogleLogin } from '@react-oauth/google'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useLoginMutation, useLoginGoogleMutation } from './api'
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

  const { mutate, isPending: isLoginPending } = useLoginMutation()
  const { mutate: googleLoginMutate, isPending: isGoogleLoginPending } =
    useLoginGoogleMutation()

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

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      googleLoginMutate(codeResponse.code, {
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
    },
  })

  return {
    form,
    onSubmit: form.handleSubmit(onLogin),
    isPending: isLoginPending || isGoogleLoginPending,
    googleLogin,
  }
}
