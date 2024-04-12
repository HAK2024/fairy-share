import { FiAlertTriangle } from 'react-icons/fi'
import { RouterLink } from '@/_components/ui'

type AlertProps = {
  mainMessage: string
  linkHref: string
  linkText: string
  additionalText?: string
}

const Alert = ({
  mainMessage,
  linkHref,
  linkText,
  additionalText = '',
}: AlertProps) => (
  <div className='flex flex-row gap-3 rounded-sm border-[1px] border-red-400 bg-red-100 px-5 py-6 md:gap-6 md:px-8'>
    <FiAlertTriangle className='h-6 w-6 text-red-800' />
    <div className='flex flex-col items-start gap-1 md:gap-3'>
      <p className='text-sm font-semibold md:text-base'>{mainMessage}</p>
      <div className='flex'>
        <RouterLink href={linkHref} className='text-sm'>
          {linkText}
        </RouterLink>
        {additionalText && (
          <span className='pl-2 text-sm'>{additionalText}</span>
        )}
      </div>
    </div>
  </div>
)

export { Alert }
