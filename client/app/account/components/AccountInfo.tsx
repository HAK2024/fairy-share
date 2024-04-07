import React from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { Loading } from '@/_components/layout'
// import { RouterLink } from '@/_components/ui'
import { RouterLink } from '@/_components/ui'
import { colorMap } from '@/_consts'
import { useGetMeQuery } from '@/_hooks/api'
import { HouseType } from '@/_types'
import { DeleteAccount } from '.'

const AccountInfo = () => {
  const { data: user, isLoading } = useGetMeQuery()

  if (isLoading || !user) return <Loading />

  const userHouse: HouseType | undefined = user.houses?.[0]

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
      {!userHouse && (
        <RouterLink href='/house/create' className='text-teal-600'>
          Create House
        </RouterLink>
      )}
      {/* TODO: Add functionality for changing password
      <div>
        <h2 className='font-semibold'>Password</h2>
        <RouterLink
          href='/edit-password'
          className='text-lg font-normal underline'
        >
          Change Password
        </RouterLink>
      </div> */}
      <div>
        <DeleteAccount user={user} userHouse={userHouse} />
      </div>
    </div>
  )
}

export { AccountInfo }
