import { useState } from 'react'
import { HouseType } from '@/_types'
import { MembersManagementModal, RemoveMemberAlertModal } from '.'

type MembersManagementProps = {
  userId: number
  house: HouseType
  isOpenModal: boolean
  setIsOpenModal: (isOpenModal: boolean) => void
}

const MembersManagement = ({
  userId,
  house,
  isOpenModal,
  setIsOpenModal,
}: MembersManagementProps) => {
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false)
  const [removedMemberId, setRemovedMemberId] = useState<number | null>(null)

  return (
    <>
      <MembersManagementModal
        userId={userId}
        house={house}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        removedMemberId={removedMemberId}
        setRemovedMemberId={setRemovedMemberId}
      />
      <RemoveMemberAlertModal
        house={house}
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        setIsOpenModal={setIsOpenModal}
        removedMemberId={removedMemberId}
      />
    </>
  )
}

export { MembersManagement }
