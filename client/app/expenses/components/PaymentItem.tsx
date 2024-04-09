import { Checkbox } from '@/_components/ui'
import { UserDisplay } from './UserDisplay'
import { useUpdatePaymentStatusMutation } from '../hooks/useUpdatePaymentStatus'
import { Payment } from '../types'

type PaymentItemProps = {
  item: Payment
  userId: number
}

const PaymentItem = ({ item, userId }: PaymentItemProps) => {
  const { mutate: updatePaymentStatus, isPending } =
    useUpdatePaymentStatusMutation()

  const handleUpdatePaymentStatus = () => {
    updatePaymentStatus({
      paymentId: item.id,
      isPaid: item.paidDate === null ? true : false,
    })
  }

  return (
    <li className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Checkbox
          className='h-6 w-6'
          checked={item.paidDate === null ? false : true}
          disabled={isPending || item.user.id !== userId}
          onClick={handleUpdatePaymentStatus}
        />
        <UserDisplay name={item.user.name} size={28} />
      </div>
      <span className='md:text-lg'>$ {item.fee}</span>
    </li>
  )
}

export { PaymentItem }
