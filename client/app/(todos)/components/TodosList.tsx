import { TodoType } from '@/_types'
import { TaskList, Alert as ExpenseAlert } from '.'

const TodosList = ({ todos }: { todos: TodoType }) => {
  return (
    <>
      <div className='flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-24'>
        <TaskList title='Today' tasks={todos.todayTasks} />
        <TaskList title='Coming this week' tasks={todos.weekTasks} />
      </div>
      {!todos.hasUnpaidPayments && (
        <div className='flex flex-col gap-2'>
          <p className='text-xl font-semibold md:text-2xl'>Expenses</p>
          <ExpenseAlert
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
