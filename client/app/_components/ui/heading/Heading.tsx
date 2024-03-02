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
      <p className='text-2xl font-bold text-teal-800 md:text-4xl'>{title}</p>
      {ButtonComponent && <ButtonComponent />}
    </div>
  )
}

export { Heading }
