import { useRouter } from 'next/navigation'
import { FiEdit } from 'react-icons/fi'
import { Button } from '@/_components/ui'
import { DeleteExpense } from './DeleteExpense'
import { Expense } from '../types'

type ItemDisplayProps = {
  item: Expense
  userId: number
}

const ItemDisplay = ({ item, userId }: ItemDisplayProps) => {
  const router = useRouter()
  return (
    <li
      className={`flex flex-col gap-2 ${userId !== item.buyerId && 'md:pt-7'}`}
    >
      <div className='flex items-center justify-end gap-2'>
        {userId === item.buyerId && (
          <>
            <Button
              size={'smIcon'}
              variant={'outline'}
              onClick={() => router.push(`/expenses/${item.id}/edit`)}
            >
              <FiEdit />
            </Button>
            <DeleteExpense expenseId={item.id} />
          </>
        )}
      </div>
      <div className='flex items-center justify-between gap-2 md:text-lg'>
        <p className='overflow-auto truncate'>{item.itemName}</p>
        <span>${item.fee}</span>
      </div>
    </li>
  )
}

export { ItemDisplay }
