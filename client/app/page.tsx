import { Button, Heading } from '@/_components/ui'
import { TaskList } from './_components/feature'
import { ExpenseError } from './_components/feature/todos/ExpenseError'
import { Header, Footer } from './_components/layout'

export default function Home() {
  const todayTasks = [
    { title: 'Buy detergents' },
    { title: 'Buy toilet papers' },
    { title: 'Buy tissues' },
    { title: 'Buy food' },
  ]
  const weekTasks = [
    { title: 'Clean the bathroom, the toilet and the kitchen' },
    { title: 'Clean the bathroom' },
    { title: 'Clean toilet' },
    { title: 'Clean the kitchen' },
  ]

  return (
    <>
      <Header />
      <div className='flex flex-col gap-8 px-4 pb-10 pt-8 text-slate-800 md:px-14 md:pb-20 md:pt-10 '>
        <Heading
          title='Fairy share'
          buttonComponent={() => <Button variant={'outline'}>Rules</Button>}
        />
        <div className='flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-24'>
          <TaskList title='Today' tasks={todayTasks} />
          <TaskList title='Coming this week' tasks={weekTasks} />
        </div>
        <ExpenseError />
      </div>
      <Footer />
    </>
  )
}
