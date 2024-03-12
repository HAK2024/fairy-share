import { FiAlertTriangle } from 'react-icons/fi'
import { RouterLink } from '@/_components/ui'

type ErrorProps = {
  mainMessage: string
  linkHref: string
  linkText: string
  additionalText?: string
}

const Error = ({
  mainMessage,
  linkHref,
  linkText,
  additionalText = '',
}: ErrorProps) => (
  <div className='flex flex-row gap-6 rounded-sm border-[1px] border-red-400 bg-red-100 px-5 py-6 md:px-8'>
    <FiAlertTriangle className='h-6 w-6 text-red-800' />
    <div className='flex flex-col items-start gap-1 md:gap-3'>
      <p className='md:text-md text-sm font-semibold'>{mainMessage}</p>
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

export { Error }
