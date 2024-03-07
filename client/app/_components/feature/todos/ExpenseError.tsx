import Link from 'next/link'
import { FiAlertTriangle } from 'react-icons/fi'

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
          <Link
            href='/expense'
            className='border-b-[1px] border-slate-500 pb-[1px] text-sm font-semibold text-slate-500 hover:opacity-80'
          >
            Tracking
          </Link>
        </div>
      </div>
    </div>
  )
}

export { ExpenseError }
