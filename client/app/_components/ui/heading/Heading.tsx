import React from 'react'
import { ButtonProps } from '..'

interface HeadingProps {
  title: string
  buttonComponent?: React.ReactElement<ButtonProps, 'button'>
}

const Heading = ({ title, buttonComponent }: HeadingProps) => {
  return (
    <div className='flex justify-between'>
      <h1 className='text-2xl font-bold text-teal-800 md:text-4xl'>{title}</h1>
      {buttonComponent && buttonComponent}
    </div>
  )
}

export { Heading }
