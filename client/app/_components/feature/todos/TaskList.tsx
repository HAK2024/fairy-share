import { Checkbox } from '@/_components/ui'

type Task = {
  title: string
}

type TaskListProps = {
  title: string
  tasks: Task[]
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks }) => (
  <div className='flex w-full flex-col gap-2'>
    <p className='text-xl font-semibold md:text-2xl'>{title}</p>
    <div className='rounded-sm border-[1px] border-amber-400 bg-amber-100 px-5 py-6 md:px-8 md:py-6'>
      <ul className='hide-scrollbar hide-scrollbar::-webkit-scrollbar flex max-h-32 flex-col gap-3 overflow-y-auto px-1 md:max-h-48'>
        {tasks.map((task, index) => (
          <li
            key={index}
            className='flex items-center justify-between gap-6 border-b-[1px] border-slate-400 pb-1'
          >
            <p className='max-w-64 truncate text-lg font-semibold md:max-w-36 lg:max-w-72'>
              {task.title}
            </p>
            <Checkbox className='h-6 w-6 md:h-8 md:w-8' />
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export { TaskList }
