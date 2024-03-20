import { apiClient } from '@/_api'

export const getTodosApi = async (houseId: number) => {
  const response = await apiClient
    .get(`/houses/${houseId}/todos`)
    .then((res) => res.data)

  return response
}
