import { FiAlertTriangle } from 'react-icons/fi'
import { RouterLink } from '@/_components/ui'

const ExpenseError = () => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-xl font-semibold md:text-2xl'>Expenses</p>
      <div className='flex flex-row gap-6 rounded-sm border-[1px] border-red-400 bg-red-100 px-5 pb-4 pt-6 md:px-8'>
        <FiAlertTriangle className='h-6 w-6 text-red-800' />
        <div className='flex flex-col items-start gap-3'>
          <p className='text-md font-semibold '>
            You haven&apos;t completed the payment yet!
          </p>

          <RouterLink href='/expense' className='text-sm'>
            Tracking
          </RouterLink>
        </div>
      </div>
    </div>
  )
}

export { ExpenseError }
