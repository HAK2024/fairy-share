import { useState } from 'react'
import { useGetHouseQuery } from '@/_hooks/api'
import { MembersManagementModal } from './MembersManagementModal'
import { RemoveMemberAlert } from '.'

type MembersManagementProps = {
  isOpenModal: boolean
  setIsOpenModal: (isOpen: boolean) => void
}

const MembersManagement = ({
  isOpenModal,
  setIsOpenModal,
}: MembersManagementProps) => {
  const { data: house } = useGetHouseQuery()
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [removedMemberId, setRemovedMemberId] = useState(null)

  return (
    <>
      {isOpenModal && (
        <MembersManagementModal
          house={house}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          setIsOpenAlert={setIsOpenAlert}
          setRemovedMemberId={setRemovedMemberId}
        />
      )}
      {isOpenAlert && (
        <RemoveMemberAlert
          house={house}
          isOpenAlert={isOpenAlert}
          setIsOpenAlert={setIsOpenAlert}
          removedMemberId={removedMemberId}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </>
  )
}

export { MembersManagement }
