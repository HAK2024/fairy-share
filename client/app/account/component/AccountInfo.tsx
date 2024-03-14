import React from 'react'
import { FiUser } from 'react-icons/fi'
import { colorMap } from '@/_consts/iconColor'
import { UserType } from '@/_types'

type AccountInfoProps = {
  user: UserType
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div className='flex flex-col gap-6 font-semibold'>
      <div className='flex flex-col'>
        <p>Icon</p>
        <div
          className={`h-12 w-12 rounded-full ${colorMap[user.icon]} p-1.5 text-4xl`}
        >
          <FiUser className={`text-4xl`} />
        </div>

        {/* <FiUser className={`text-4xl text-slate-400`} /> */}

        {/* =========================ICON Color Test SRART */}

        {/* <div
          className={`h-12 w-12 rounded-full ${colorMap['RED']} mb-1 p-1.5 text-4xl`}
        >
          <FiUser className={`text-4xl`} />
        </div>
        <div
          className={`h-12 w-12 rounded-full ${colorMap['ORANGE']} mb-1 p-1.5 text-4xl`}
        >
          <FiUser className={`text-4xl`} />
        </div>
        <div
          className={`h-12 w-12 rounded-full ${colorMap['YELLOW']} mb-1 p-1.5 text-4xl`}
        >
          <FiUser className={`text-4xl`} />
        </div>
        <div
          className={`h-12 w-12 rounded-full ${colorMap['GREEN']} mb-1 p-1.5 text-4xl`}
        >
          <FiUser className={`text-4xl`} />
        </div>
        <div
          className={`h-12 w-12 rounded-full ${colorMap['BLUE']} mb-1 p-1.5 text-4xl`}
        >
          <FiUser className={`text-4xl`} />
        </div>
        <div
          className={`h-12 w-12 rounded-full ${colorMap['INDIGO']} mb-1 p-1.5 text-4xl`}
        >
          <FiUser className={`text-4xl`} />
        </div>
        <div
          className={`h-12 w-12 rounded-full ${colorMap['VIOLET']} mb-1 p-1.5 text-4xl`}
        >
          <FiUser className={`text-4xl`} />
        </div>
        <div
          className={`h-12 w-12 rounded-full ${colorMap['SLATE']} mb-1 p-1.5 text-4xl`}
        >
          <FiUser className={`text-4xl`} />
        </div>
        <div
          className={`h-12 w-12 rounded-full ${colorMap['PINK']} mb-1 p-1.5 text-4xl`}
        >
          <FiUser className={`text-4xl`} />
        </div>
        */}
        {/* =========================ICON Color Test FINISH */}
      </div>
      <div>
        <p>Name</p>
        <p className='text-lg'>{user.name}</p>
      </div>
      <div>
        <p>Email</p>
        <p className='text-lg'>{user.email}</p>
      </div>
    </div>
  )
}

export { AccountInfo }
