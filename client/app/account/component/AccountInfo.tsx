import React from 'react'
import { FiUser } from 'react-icons/fi'
import { colorMap } from '@/_consts/iconColor'
import { UserType } from '@/_types'

type AccountInfoProps = {
  user: UserType[]
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  const userData = user[0]
  return (
    <div className='flex flex-col gap-6 border border-amber-400'>
      <div className='flex flex-col'>
        <p>Icon</p>
        <div
          className={`h-11 w-11 rounded-full ${colorMap[userData.icon]} p-2 text-4xl`}
        >
          <FiUser className={`text-4xl text-slate-400`} />
        </div>

        {userData.icon}
      </div>
      <div>
        <p>Name</p>
        <p>{userData.name}</p>
      </div>
      <div>
        <p>Email</p>
        <p>{userData.email}</p>
      </div>
    </div>
  )
}

export { AccountInfo }