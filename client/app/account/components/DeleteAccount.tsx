import React, { useState } from 'react'
import { FiTrash } from 'react-icons/fi'
import { Button } from '@/_components/ui'
import { UserType } from '@/_types'
import { useDeleteAccount } from '../hooks'
import { DeleteAccountModal, AdminWarningModal } from '.'

type DeleteAccountProps = {
  user: UserType
}

const DeleteAccount = ({ user }: DeleteAccountProps) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenAdminWarningModal, setIsOpenAdminWarningModal] = useState(false)
  const { onDelete, isPending } = useDeleteAccount()

  const userHouse = user?.houses[0]

  const handleDeleteAccount = () => {
    if (!userHouse) {
      setIsOpenDeleteModal(true)
    } else if (
      userHouse.currentUserIsAdmin &&
      userHouse.houseMembers.length === 1
    ) {
      setIsOpenAdminWarningModal(true)
    } else if (
      userHouse.currentUserIsAdmin &&
      !userHouse.houseMembers.some((member) => member.isAdmin)
    ) {
      setIsOpenAdminWarningModal(true)
    } else {
      setIsOpenDeleteModal(true)
    }
  }

  return (
    <>
      <Button
        variant={'destructiveOutline'}
        onClick={handleDeleteAccount}
        size='sm'
        className='flex gap-1'
      >
        <FiTrash />
        Delete Your Account
      </Button>
      {isOpenDeleteModal && (
        <DeleteAccountModal
          isOpenDeleteModal={isOpenDeleteModal}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          onDelete={onDelete}
          isPending={isPending}
        />
      )}
      {isOpenAdminWarningModal && (
        <AdminWarningModal
          isOpenAdminWarningModal={isOpenAdminWarningModal}
          setIsOpenAdminWarningModal={setIsOpenAdminWarningModal}
        />
      )}
    </>
  )
}

export { DeleteAccount }
