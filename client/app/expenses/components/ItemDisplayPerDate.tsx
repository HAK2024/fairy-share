import { useRouter } from 'next/navigation'
import { FiEdit } from 'react-icons/fi'
import { Button } from '@/_components/ui'
import { DeleteExpense } from './DeleteExpense'
import { Expense } from '../types'

type ItemDisplayPerDateProps = {
  item: Expense
  userId: number
}

const ItemDisplayPerDate = ({ item, userId }: ItemDisplayPerDateProps) => {
  const router = useRouter()
  return (
    <div
      className={`flex flex-col gap-2 ${userId !== item.buyerId && 'md:pt-8'}`}
    >
      <div className='flex items-center justify-between gap-2 pt-1 text-base font-semibold md:text-lg'>
        <p className='break-words'>{item.itemName}</p>
        <span>${item.fee}</span>
      </div>
      <div className='flex items-center justify-end gap-2'>
        {userId === item.buyerId && (
          <>
            <Button
              size={'smIcon'}
              variant={'outline'}
              onClick={() => router.push(`/expenses/${item.id}/edit`)}
              aria-label={`Visit ${item.itemName}'s edit page`}
            >
              <FiEdit aria-label='edit-icon' />
            </Button>
            <DeleteExpense expenseId={item.id} name={item.itemName} />
          </>
        )}
      </div>
    </div>
  )
}

export { ItemDisplayPerDate }
