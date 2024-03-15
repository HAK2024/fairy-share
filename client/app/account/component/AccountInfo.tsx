import React from 'react'
// import Link from 'next/link'
import { MdAccountCircle } from 'react-icons/md'
import { Loading } from '@/_components/layout'
import { colorMap } from '@/_consts/iconColor'
import { useGetMeQuery } from '@/_hooks/api'

const AccountInfo = () => {
  const { data: user, isLoading } = useGetMeQuery()

  if (isLoading || !user) return <Loading />
  /* TODO: error handling */

  return (
    <div className='flex flex-col gap-6 '>
      <div className='flex flex-col'>
        <h2 className='font-semibold'>Icon</h2>
        <MdAccountCircle
          className={`text-4xl ${colorMap[user.icon]}`}
          size={52}
        />
      </div>
      <div>
        <h2 className='font-semibold'>Name</h2>
        <p className='text-lg'>{user.name}</p>
      </div>
      <div>
        <h2 className='font-semibold'>Email</h2>
        <p className='text-lg'>{user.email}</p>
      </div>
      {/* <div>
        <h2 className='font-semibold'>Password</h2>
        <Link href='/edit-password'>
          <a className='text-lg'>Change Password</a>
        </Link>
      </div> */}
    </div>
  )
}

export { AccountInfo }
