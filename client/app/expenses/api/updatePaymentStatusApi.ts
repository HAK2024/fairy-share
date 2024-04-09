import { apiClient } from '@/_api'

export const updatePaymentStatusApi = async ({
  paymentId,
  isPaid,
}: {
  paymentId: number
  isPaid: boolean
}) => {
  const response = await apiClient
    .put(`/payments/${paymentId}/status`, {
      isPaid,
    })
    .then((res) => res.data)

  return response
}
