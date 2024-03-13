'use client'

import * as React from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { cn } from '@/_utils'

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [isShowingPassword, setIsShowingPassword] = React.useState(false)
    return (
      <div className='relative'>
        <input
          type={isShowingPassword ? 'text' : 'password'}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-slate-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
            className,
          )}
          autoComplete='on'
          ref={ref}
          {...props}
        />
        <button
          className='absolute right-3 top-2 text-slate-400'
          onClick={() => setIsShowingPassword((prev) => !prev)}
          type='button'
          aria-label='Toggle password visibility'
        >
          {isShowingPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
        </button>
      </div>
    )
  },
)
PasswordInput.displayName = 'Input'

export { PasswordInput }
