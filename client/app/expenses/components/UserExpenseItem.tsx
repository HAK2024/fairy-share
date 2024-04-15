import { ItemDisplayPerMonth } from './ItemDisplayPerMonth'
import { UserDisplay } from './UserDisplay'
import { UserExpense } from '../types'

type UserExpenseItemProps = {
  userExpense: UserExpense
  userId: number
}

const UserExpenseItem = ({ userExpense, userId }: UserExpenseItemProps) => {
  return (
    <div className='w-full rounded-sm border-[1px] border-amber-400 bg-amber-100 px-3 py-4 md:px-8 md:py-4 lg:w-2/3'>
      <div className='flex items-center justify-start border-b-4 border-double border-amber-300 bg-amber-100 pb-2 '>
        <UserDisplay
          name={userExpense.name}
          size={36}
          icon={userExpense.icon}
        />
      </div>
      {userExpense.expenses.map((expense) => (
        <ul
          key={expense.date}
          className='flex flex-col gap-4 border-b-[1px] border-dotted border-slate-400 py-4 last:mb-0 last:border-none last:pb-0'
        >
          <div className='flex items-center justify-end'>
            <span className='text-md mb-2 inline rounded-xl text-base font-bold text-teal-800 md:text-lg'>
              {expense.date}
            </span>
          </div>
          {expense.expenses.map((expense) => (
            <li
              key={expense.id}
              className='flex flex-col gap-4 last:border-none md:flex-row md:justify-between'
            >
              <div className='flex w-full flex-col gap-4'>
                <ItemDisplayPerMonth item={expense} userId={userId} />
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export { UserExpenseItem }
