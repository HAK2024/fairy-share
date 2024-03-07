import { useQuery } from '@tanstack/react-query'
import { getMeApi } from '@/_api'
import { UserType } from '@/_types'

export const useGetMeQuery = (enabled?: boolean) => {
  const getMe = async () => {
    const response = await getMeApi()
    return response
  }

  const { data, isLoading, isError } = useQuery<UserType>({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
    enabled: enabled,
  })

  return {
    data,
    isLoading,
    isError,
  }
}
