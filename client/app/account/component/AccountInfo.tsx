import React from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { colorMap } from '@/_consts/iconColor'
import { UserType } from '@/_types'

type AccountInfoProps = {
  user: UserType
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div className='flex flex-col gap-6 font-semibold'>
      <div className='flex flex-col'>
        <h2>Icon</h2>
        <MdAccountCircle
          className={`text-4xl ${colorMap[user.icon]}`}
          size={52}
        />
      </div>
      <div>
        <h2>Name</h2>
        <p className='text-lg'>{user.name}</p>
      </div>
      <div>
        <h2>Email</h2>
        <p className='text-lg'>{user.email}</p>
      </div>
    </div>
  )
}

export { AccountInfo }
