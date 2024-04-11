import { useRouter } from 'next/navigation'
import { FiEdit } from 'react-icons/fi'
import { Button } from '@/_components/ui'
import { DeleteExpense } from './DeleteExpense'
import { Expense } from '../types'

type ItemDisplayPerMonthProps = {
  item: Expense
  userId: number
}

const ItemDisplayPerMonth = ({ item, userId }: ItemDisplayPerMonthProps) => {
  const router = useRouter()
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-2 text-base font-semibold md:text-lg'>
        <p className='overflow-auto truncate'>{item.itemName}</p>
        <span>${item.fee}</span>
      </div>
      <div className='flex items-center justify-end gap-2'>
        {userId === item.buyerId && (
          <>
            <Button
              size={'smIcon'}
              variant={'outline'}
              onClick={() => router.push(`/expenses/${item.id}/edit`)}
            >
              <FiEdit aria-label='edit-icon' />
            </Button>
            <DeleteExpense expenseId={item.id} />
          </>
        )}
      </div>
    </div>
  )
}

export { ItemDisplayPerMonth }
