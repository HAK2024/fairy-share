'use client'

import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/_components/ui/Toast'
import { useToast } from '@/_hooks/useToast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider duration={5000}>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className='flex items-start gap-2'>
              <div className='pt-[2px]'>
                {variant === 'success' && <FiCheckCircle size={20} />}
                {variant === 'destructive' && <FiAlertCircle size={20} />}
              </div>
              <div className='flex flex-col items-start gap-1'>
                {title && <ToastTitle className='text-md'>{title}</ToastTitle>}
                {description && (
                  <ToastDescription className='text-sm'>
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
