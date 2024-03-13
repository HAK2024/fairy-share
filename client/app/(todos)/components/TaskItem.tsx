import { Checkbox } from '@/_components/ui'
import { TaskType } from '@/_types'
import { useUpdateStatusMutation } from '../hooks'

const TaskItem = ({ task }: { task: TaskType }) => {
  const { mutate: updateStatus } = useUpdateStatusMutation()

  const handleUpdateTaskStatus = () => {
    updateStatus({ taskId: task.id, isCompleted: !task.isCompleted })
  }

  return (
    <li className='flex items-center justify-between gap-6 border-b-[1px] border-slate-400 pb-1'>
      <p className='max-w-64 truncate text-lg font-semibold md:max-w-36 lg:max-w-72'>
        {task.title}
      </p>
      <Checkbox
        className='h-6 w-6 md:h-8 md:w-8'
        checked={task.isCompleted}
        onClick={handleUpdateTaskStatus}
      />
    </li>
  )
}

export { TaskItem }
