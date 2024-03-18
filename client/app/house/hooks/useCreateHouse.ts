import { useRouter, useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useToast } from '@/_hooks'
import { useAuthStore } from '@/_stores'
import { isErrorWithMessage } from '@/_utils'
import { useCreateHouseMutation } from './api'
import { CreateHouseSchema, createHouseResolver } from '../schema'

export const useCreateHouse = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const { mutate, isPending } = useCreateHouseMutation()

  const form = useForm<CreateHouseSchema>({
    resolver: createHouseResolver,
    defaultValues: {
      name: '',
      isExpensePerTime: undefined,
      rules: [],
    },
  })

  const onCreate = (data: CreateHouseSchema) => {
    console.log('onSubmit!', data)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onCreate),
    isPending,
  }
}
