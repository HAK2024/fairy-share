import { useQuery } from '@tanstack/react-query'
import { getMeApi } from '@/_api'
import { useAuthStore } from '@/_stores'
import { UserType } from '@/_types'

export const useGetMeQuery = () => {
  const csrfToken = useAuthStore((state) => state.csrfToken)
  const accessToken = useAuthStore((state) => state.accessToken)

  const getMe = async () => {
    const response = await getMeApi()
    return response
  }

  const { data, isLoading, isError } = useQuery<UserType>({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
    enabled: !!csrfToken && !!accessToken,
    throwOnError: true,
  })

  return {
    data,
    isLoading,
    isError,
  }
}
