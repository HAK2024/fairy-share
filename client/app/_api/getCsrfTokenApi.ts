import apiClient from '@/_api/base'

export const getCsrfTokenApi = async (): Promise<{ csrfToken: string }> => {
  const response = await apiClient.get<{ csrfToken: string }>(
    '/auth/csrf-token',
  )
  return response.data
}
