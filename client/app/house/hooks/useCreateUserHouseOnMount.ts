import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { INVITED_HOUSE_ID } from '@/_consts'
import { useGetHouseInfo } from '@/_hooks'
import { useCreateUserHouseMutation } from '@/_hooks/api'
import { toast } from '@/_hooks/useToast'
import { isErrorWithMessage } from '@/_utils'

export const useCreateUserHouseOnMount = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const invitedHouseId = searchParams.get(INVITED_HOUSE_ID)

  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(true)
  const hasMutated = useRef(false)

  const { houseId } = useGetHouseInfo()
  const { mutateAsync } = useCreateUserHouseMutation()

  // NOTE mutate function does not work inside of useEffect for onMount because of strict mode (it runs twice)
  const mutateUserHouse = async (invitedHouseId: string) => {
    try {
      await mutateAsync(invitedHouseId)
      queryClient.invalidateQueries({ queryKey: ['me'] })
      router.push('/')
    } catch (error) {
      let message = 'Please try again later.'

      if (isErrorWithMessage(error) && error.response) {
        message = error.response.data.message
      }

      toast({
        variant: 'destructive',
        title: 'Failed to create house..',
        description: message,
      })

      router.push('/house/create')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (houseId) {
      router.push('/')
    }

    // If user had invitedHouse Id then create user house before showing house setting page
    if (invitedHouseId && !houseId && !hasMutated.current) {
      mutateUserHouse(invitedHouseId)
      hasMutated.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isLoading, invitedHouseId }
}
