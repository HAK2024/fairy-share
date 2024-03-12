import { FiCheckCircle } from 'react-icons/fi'

const EmptyTask = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-6 p-10'>
      <FiCheckCircle className='h-12 w-12 text-teal-600' />
      <p className='text-xl font-semibold'>No tasks</p>
    </div>
  )
}

export { EmptyTask }
