import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { HouseType } from '@/_types'
import { isErrorWithMessage } from '@/_utils'
import { useUpdateHouseMutation } from './api'
import { UpdateHouseSchema, createHouseResolver } from '../schema'

export const useUpdateHouse = (defaultData: HouseType) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()

  const { mutate, isPending } = useUpdateHouseMutation()

  const formattedRules = defaultData.rules.map((rule) => ({
    id: rule.id,
    text: rule.text,
  }))

  const form = useForm<UpdateHouseSchema>({
    resolver: createHouseResolver,
    defaultValues: {
      name: defaultData.name,
      isExpensePerTime: defaultData.isExpensePerTime ? 'eachTime' : 'monthly',
      rules: formattedRules,
    },
  })

  const onUpdate = (data: UpdateHouseSchema) => {
    const formattedData = {
      ...data,
      rules: form.watch('rules'),
      isExpensePerTime: data.isExpensePerTime === 'eachTime' ? true : false,
    }

    mutate(
      {
        data: formattedData,
        houseId: defaultData.houseId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['me'] })
          queryClient.invalidateQueries({ queryKey: ['house'] })
          queryClient.invalidateQueries({ queryKey: ['expensesPerMonth'] })
          queryClient.invalidateQueries({ queryKey: ['expensesPerDate'] })
          toast({
            variant: 'success',
            title: 'Your house has been updated successfully',
          })
          router.push('/')
        },
        onError: (error) => {
          let message = 'Please try again later.'
          if (isErrorWithMessage(error) && error.response) {
            message = error.response.data.message
            toast({
              variant: 'destructive',
              title: 'Failed to update house..',
              description: message,
            })
          }
        },
      },
    )
  }

  return {
    form,
    onSubmit: form.handleSubmit(onUpdate),
    isPending,
  }
}
