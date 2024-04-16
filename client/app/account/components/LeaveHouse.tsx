import React, { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { Button } from '@/_components/ui'
import { UserType } from '@/_types'
import { useLeaveHouse } from '../hooks'
import { AdminWarningModal, LeaveHouseModal } from '.'

type LeaveHouseProps = {
  user: UserType
}

const LeaveHouse = ({ user }: LeaveHouseProps) => {
  const [isOpenLeaveHouseModal, setIsOpenLeaveHouseModal] = useState(false)
  const [isOpenAdminWarningModal, setIsOpenAdminWarningModal] = useState(false)
  const { onRemove, isPending } = useLeaveHouse()

  const handleLeaveHouse = () => {
    const userHouse = user.houses
    const isAdmin = userHouse[0].houseMembers.filter((member) => member.isAdmin)

    if (isAdmin.length === 1 && isAdmin[0].id === user.id) {
      setIsOpenAdminWarningModal(true)
    } else {
      setIsOpenLeaveHouseModal(true)
    }
  }

  return (
    <>
      <Button
        variant={'destructiveOutline'}
        onClick={handleLeaveHouse}
        size='sm'
        className='flex gap-1'
      >
        <FiLogOut />
        Leave House
      </Button>
      <LeaveHouseModal
        isOpenLeaveHouseModal={isOpenLeaveHouseModal}
        setIsOpenLeaveHouseModal={setIsOpenLeaveHouseModal}
        onRemove={onRemove}
        isPending={isPending}
        userId={user.id}
        houseId={user.houses[0].houseId}
      />
      <AdminWarningModal
        isOpenAdminWarningModal={isOpenAdminWarningModal}
        setIsOpenAdminWarningModal={setIsOpenAdminWarningModal}
      />
    </>
  )
}

export { LeaveHouse }
