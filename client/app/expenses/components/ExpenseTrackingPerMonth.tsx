import { Loading } from '@/_components/layout'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/_components/ui'
import { useGetMeQuery } from '@/_hooks/api'
import { PaymentSummary } from './PaymentSummary'
import { UserExpenseItem } from './UserExpenseItem'
import { useGetExpensePerMonthQuery } from '../hooks/api'
import { ExpenseMonthPerMonthData as expenseMonthData } from '../types'

const ExpenseTrackingPerMonth = () => {
  const { data: expensesData, isLoading: isLoadingExpense } =
    useGetExpensePerMonthQuery()
  const { data: me, isLoading: isLoadingUser } = useGetMeQuery()
  const userId = me?.id

  if (isLoadingExpense || !expensesData || !userId || isLoadingUser) {
    return <Loading />
  }

  return (
    <Accordion
      type='single'
      collapsible
      className='pt-10'
      defaultValue={`expenseMonthData-${expensesData[0].month}`}
    >
      {expensesData.map((expenseMonthData: expenseMonthData) => (
        <AccordionItem
          key={`${expenseMonthData.month}-perMonth`}
          value={`expenseMonthData-${expenseMonthData.month}`}
        >
          <AccordionTrigger className='mt-5 h-9 rounded-sm bg-amber-200 px-4 font-semibold text-slate-800'>
            {expenseMonthData.month}
          </AccordionTrigger>

          <AccordionContent className='pt-4 md:mt-6'>
            {expenseMonthData.usersExpenses.length === 0 ? (
              <p className='p-2 text-lg font-bold text-teal-800'>No Expense</p>
            ) : (
              <div className='flex w-full flex-col items-center justify-center gap-4 '>
                {expenseMonthData.usersExpenses.map((userExpense, index) => (
                  <UserExpenseItem
                    userExpense={userExpense}
                    userId={userId}
                    key={`usersExpense-${index}`}
                  />
                ))}
                <PaymentSummary
                  balanceSummary={expenseMonthData.balanceSummary}
                  userId={userId}
                  year={expenseMonthData.year}
                  month={expenseMonthData.monthNumber}
                />
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { ExpenseTrackingPerMonth }
