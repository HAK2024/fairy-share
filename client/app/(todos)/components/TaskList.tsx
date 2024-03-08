import { TaskType } from '@/_types'
import { EmptyTask } from './EmptyTask'
import { TaskItem } from '.'

type TaskListProps = {
  title: string
  tasks: TaskType[]
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks }) => {
  return (
    <div className='flex w-full flex-col gap-2'>
      <p className='text-xl font-semibold md:text-2xl'>{title}</p>
      <div className='rounded-sm border-[1px] border-amber-400 bg-amber-100 px-5 py-6 md:px-8 md:py-6'>
        {tasks.length === 0 ? (
          <EmptyTask />
        ) : (
          <ul className='hide-scrollbar hide-scrollbar::-webkit-scrollbar flex max-h-32 flex-col gap-3 overflow-y-auto px-1 md:max-h-36 md:py-3'>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export { TaskList }
