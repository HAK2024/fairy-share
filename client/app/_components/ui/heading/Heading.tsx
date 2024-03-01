import React from 'react'
import { ButtonProps } from '..'

interface HeadingProps {
  title: string
  buttonComponent?: React.ComponentType<ButtonProps> | null
}

const Heading = ({
  title,
  buttonComponent: ButtonComponent = null,
}: HeadingProps) => {
  return (
    <div className='flex justify-between'>
      <p className='md:text-4xl text-2xl font-bold text-teal-800'>{title}</p>
      {ButtonComponent && <ButtonComponent />}
    </div>
  )
}

export { Heading }
