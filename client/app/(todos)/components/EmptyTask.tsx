import { FiCheckCircle } from 'react-icons/fi'

const EmptyTask = () => {
  return (
    <div className='flex h-32 flex-col items-center justify-center gap-6 md:h-40'>
      <FiCheckCircle className='h-10 w-10 text-teal-600 md:h-12 md:w-12' />
      <p className='text-xl font-semibold'>No tasks</p>
    </div>
  )
}

export { EmptyTask }
