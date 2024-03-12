import { Loading } from '@/_components/layout'
import { useAuthStore } from '@/_stores'
import { useGetTodosQuery } from '../hooks'
import { TaskList, Error as ExpenseError } from '.'

const TodosList = () => {
  const currentUser = useAuthStore((state) => state.currentUser)
  const houseId = currentUser?.houses?.[0]?.houseId

  const {
    data: todos,
    error,
    isFetching,
  } = useGetTodosQuery(
    houseId as number,
  ) /* This Query is only executed when the houseId exists*/

  if (!currentUser || isFetching) {
    return <Loading isCenter />
  }

  // TODO: Replace this with the error component
  if (error || !todos) {
    return <p>Failed to load data.</p>
  }

  return (
    <>
      <div className='flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-24'>
        <TaskList title='Today' tasks={todos.todayTasks} />
        <TaskList title='Coming this week' tasks={todos.weekTasks} />
      </div>
      {todos.hasUnpaidPayments && (
        <div className='flex flex-col gap-2'>
          <p className='text-xl font-semibold md:text-2xl'>Expenses</p>
          <ExpenseError
            mainMessage="You haven't completed the payment yet!"
            linkHref='/expense'
            linkText='Tracking'
          />
        </div>
      )}
    </>
  )
}

export { TodosList }
