import { ItemDisplay } from './ItemDisplay'
import { PaymentItem } from './PaymentItem'
import { UserDisplay } from './UserDisplay'
import { ExpenseDate } from '../types'

type ExpenseItemProps = {
  expense: ExpenseDate
  userId: number
}

const ExpenseItem = ({ expense, userId }: ExpenseItemProps) => {
  return (
    <div className='rounded-sm border-[1px] border-amber-400 bg-amber-100 px-4 py-4 md:px-8 md:py-4'>
      <div className='flex items-center justify-end'>
        <span className='text-md font-bold text-teal-800 md:text-lg'>
          {expense.date}
        </span>
      </div>
      {expense.buyers.map((buyer, index) => (
        <div
          key={`${buyer.buyerId}-${index}`}
          className='mb-4 border-b-2 border-amber-300 pb-4 last:mb-0 last:border-none last:pb-0 md:pb-6'
        >
          <UserDisplay name={buyer.expenses[0].user.name} size={32} />
          {buyer.expenses.map((expense) => (
            <div
              key={expense.id}
              className='mb-4 flex w-full flex-col gap-2 border-b-[1px] border-dashed border-slate-400 pb-4 last:mb-0 last:border-none last:pb-0 md:flex-row md:justify-between md:gap-8'
            >
              <ul className='flex flex-col gap-2 md:w-1/2 '>
                <ItemDisplay item={expense} userId={userId} />
              </ul>
              <div className='md:w-1/2'>
                <p className='font-semibold'>Complete Payment</p>
                <ul className='flex flex-col gap-2 pt-2 md:pt-4'>
                  {expense.payments.map((payment) => (
                    <PaymentItem
                      key={payment.id}
                      item={payment}
                      userId={userId}
                    />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
export { ExpenseItem }
