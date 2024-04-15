import Link from 'next/link'
import { Checkbox } from '@/_components/ui'
import { TaskType } from '@/_types'
import { useUpdateStatusMutation } from '../hooks'

const TaskItem = ({ task }: { task: TaskType }) => {
  const { mutate: updateStatus, isPending } = useUpdateStatusMutation()

  const handleUpdateTaskStatus = () => {
    updateStatus({ taskId: task.id, isCompleted: !task.isCompleted })
  }

  return (
    <li className='flex items-center justify-between gap-6 border-b-[1px] border-slate-400 pb-1'>
      <p className='max-w-64 truncate text-base font-semibold hover:opacity-80 md:max-w-36 md:text-lg lg:max-w-72'>
        <Link href={`/tasks?taskId=${task.id}`}>{task.title}</Link>
      </p>
      <Checkbox
        className='h-6 w-6 hover:opacity-80 md:h-8 md:w-8'
        checked={task.isCompleted}
        onClick={handleUpdateTaskStatus}
        disabled={isPending}
      />
    </li>
  )
}

export { TaskItem }
