import { Checkbox } from '@/_components/ui'
import { TaskType } from '@/_types'

const TaskItem = ({ task }: { task: TaskType }) => {
  return (
    <li
      key={task.id}
      className='flex items-center justify-between gap-6 border-b-[1px] border-slate-400 pb-1'
    >
      <p className='max-w-64 truncate text-lg font-semibold md:max-w-36 lg:max-w-72'>
        {task.title}
      </p>
      <Checkbox className='h-6 w-6 md:h-8 md:w-8' />
    </li>
  )
}

export { TaskItem }
