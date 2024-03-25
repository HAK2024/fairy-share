import { useQuery } from '@tanstack/react-query'
import { getCsrfTokenApi } from '@/_api'

export const useGetCsrfTokenQuery = () => {
  const getCsrfToken = async () => {
    const response = await getCsrfTokenApi()
    return response
  }

  const { data, isLoading, isError } = useQuery<{ csrfToken: string }>({
    queryKey: ['csrf-token'],
    queryFn: getCsrfToken,
    throwOnError: true,
  })

  return {
    data,
    isLoading,
    isError,
  }
}
