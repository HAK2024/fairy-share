import React from 'react'

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center justify-center pt-10'>
      <div className='w-[600px] rounded-sm bg-amber-100 shadow-lg'>
        <div className='px-6 pb-10 pt-6'>{children}</div>
      </div>
    </div>
  )
}

export { Container }
