import React from 'react'

const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex  items-center justify-center md:pt-10'>
      <div className='w-full md:min-h-[450px] md:w-[600px] md:rounded-sm md:bg-amber-100 md:shadow-lg'>
        <div className='px-4 pb-10 pt-8 md:px-6 md:pt-6'>{children}</div>
      </div>
    </div>
  )
}

export { FormContainer }
