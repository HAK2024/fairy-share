import { useRouter, useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { INVITED_HOUSE_ID } from '@/_consts'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useRegisterMutation } from './api'
import { registerResolver, RegisterSchema } from '../schema'

export const useRegister = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const invitedHouseId = searchParams.get(INVITED_HOUSE_ID)

  const form = useForm<RegisterSchema>({
    resolver: registerResolver,
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = useRegisterMutation(invitedHouseId)

  const onRegister = (data: RegisterSchema) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['me'] })
        invitedHouseId ? router.push('/') : router.push('/house/create')

        toast({
          variant: 'success',
          title: 'Successfully created an account!',
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
          title: 'Failed to create an account..',
          description: message,
        })
      },
    })
  }

  return {
    form,
    onSubmit: form.handleSubmit(onRegister),
    isPending,
  }
}
