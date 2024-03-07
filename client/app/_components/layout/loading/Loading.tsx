import { FiLoader } from 'react-icons/fi'

type LoadingProps = {
  isCenter?: boolean
}

const Loading = ({ isCenter }: LoadingProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${isCenter ? 'min-h-svh' : 'pt-20'}`}
    >
      <FiLoader className='h-14 w-14 animate-spin text-slate-600' />
    </div>
  )
}

export { Loading }
