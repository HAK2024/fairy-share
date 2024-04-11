import { apiClient } from '@/_api'
import { UpdatePaymentsStatusType } from '../types'

export const updatePaymentsStatusApi = async (
  data: UpdatePaymentsStatusType,
) => {
  const response = await apiClient
    .put('/payments/status/per-month', {
      ...data,
    })
    .then((res) => res.data)

  return response
}
