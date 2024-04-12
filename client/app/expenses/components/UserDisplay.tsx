import { MdAccountCircle } from 'react-icons/md'
import { colorMap } from '@/_consts'

type UserDisplayProps = {
  name: string
  size: number
  icon: string
}

const UserDisplay = ({ name, size, icon }: UserDisplayProps) => (
  <div className='flex items-center gap-2 break-words font-medium'>
    <div>
      <MdAccountCircle
        size={size}
        className={`${colorMap[icon]}`}
        aria-label='user-icon'
      />
    </div>
    <h4 className=' text-sm md:text-base '>{name}</h4>
  </div>
)

export { UserDisplay }
