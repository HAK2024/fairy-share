import { useMutation } from '@tanstack/react-query'
import { UpdatePaymentsStatusType } from '@/expenses/types'
import { updatePaymentsStatusApi } from './../../api'

export const useUpdatePaymentsStatusMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdatePaymentsStatusType) => {
      return updatePaymentsStatusApi(data)
    },
  })

  return { mutate, isPending }
}
