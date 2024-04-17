import React, { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { Button } from '@/_components/ui'
import { HouseType } from '@/_types'
import { AdminWarningModal } from '@/account/components'
import { useLeaveHouse } from '../hooks'
import { LeaveHouseModal } from '.'

type LeaveHouseProps = {
  userHouse: HouseType
  userId: number
}

const LeaveHouse = ({ userHouse, userId }: LeaveHouseProps) => {
  const [isOpenLeaveHouseModal, setIsOpenLeaveHouseModal] = useState(false)
  const [isOpenAdminWarningModal, setIsOpenAdminWarningModal] = useState(false)
  const { onRemove, isPending } = useLeaveHouse()

  const handleLeaveHouse = () => {
    const isAdmin = userHouse.houseMembers.filter((member) => member.isAdmin)

    if (isAdmin.length === 1 && isAdmin[0].id === userId) {
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
        userId={userId}
        houseId={userHouse.houseId}
      />
      <AdminWarningModal
        isOpenAdminWarningModal={isOpenAdminWarningModal}
        setIsOpenAdminWarningModal={setIsOpenAdminWarningModal}
      />
    </>
  )
}

export { LeaveHouse }
