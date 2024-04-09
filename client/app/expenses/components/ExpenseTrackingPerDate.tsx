import { Loading } from '@/_components/layout'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/_components/ui'
import { useGetMeQuery } from '@/_hooks/api'
import { ExpenseItem } from './ExpenseItem'
import { useGetExpensePerDateQuery } from '../hooks/api'
import { ExpenseMonthData } from '../types'

const ExpenseTrackingPerDate = () => {
  const { data: expensesData, isLoading: isLoadingExpense } =
    useGetExpensePerDateQuery()
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
      {expensesData.map((expenseMonthData: ExpenseMonthData) => (
        <AccordionItem
          key={expenseMonthData.month}
          value={`expenseMonthData-${expenseMonthData.month}`}
        >
          <AccordionTrigger className='mt-5 h-9 rounded-sm bg-amber-200 px-4 font-semibold text-slate-800'>
            {expenseMonthData.month}
          </AccordionTrigger>

          <AccordionContent className='pt-4 md:mt-6'>
            {expenseMonthData.expenses.length === 0 ? (
              <p className='p-2 text-lg font-bold text-teal-800'>No Expense</p>
            ) : (
              <div className='flex w-full flex-col gap-4'>
                {expenseMonthData.expenses.map((expense, index) => (
                  <ExpenseItem
                    expense={expense}
                    userId={userId}
                    key={`expense-${index}`}
                  />
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { ExpenseTrackingPerDate }
