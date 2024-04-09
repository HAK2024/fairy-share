import { MdAccountCircle } from 'react-icons/md'
import { colorMap } from '@/_consts'

type UserDisplayProps = {
  name: string
  size: number
  icon: string
}

const UserDisplay = ({ name, size, icon }: UserDisplayProps) => (
  <div className='flex items-center gap-2 font-medium '>
    <MdAccountCircle size={size} className={`${colorMap[icon]}`} />
    <h4 className='text-base md:text-lg'>{name}</h4>
  </div>
)

export { UserDisplay }
