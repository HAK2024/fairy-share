import { MdAccountCircle } from 'react-icons/md'

type UserDisplayProps = {
  name: string
  size: number
}

const UserDisplay = ({ name, size }: UserDisplayProps) => (
  <div className='flex items-center gap-2'>
    <MdAccountCircle size={size} />
    <p className='md:text-lg'>{name}</p>
  </div>
)

export { UserDisplay }
