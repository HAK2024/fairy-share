import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { isErrorWithMessage } from '@/_utils'
import { useCreateHouseMutation } from './api'
import { CreateHouseSchema, createHouseResolver } from '../schema'

export const useCreateHouse = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()

  const { mutate, isPending } = useCreateHouseMutation()

  const form = useForm<CreateHouseSchema>({
    resolver: createHouseResolver,
    defaultValues: {
      name: '',
      isExpensePerTime: 'monthly',
      rules: [
        {
          text: '',
        },
      ],
    },
  })

  const onCreate = (data: CreateHouseSchema) => {
    const formattedData = {
      ...data,
      isExpensePerTime: data.isExpensePerTime === 'eachTime' ? true : false,
    }

    mutate(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['me'] })
        toast({
          variant: 'success',
          title: 'Your house has been created successfully',
        })
        router.push('/')
      },
      onError: (error) => {
        let message = 'Please try again later.'
        if (isErrorWithMessage(error) && error.response) {
          message = error.response.data.message
          toast({
            variant: 'destructive',
            title: 'Failed to create house..',
            description: message,
          })
        }
      },
    })
  }

  return {
    form,
    onSubmit: form.handleSubmit(onCreate),
    isPending,
  }
}
