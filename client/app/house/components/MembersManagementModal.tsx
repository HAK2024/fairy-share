import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FiPaperclip, FiX } from 'react-icons/fi'
import { MdAccountCircle } from 'react-icons/md'
import { Button, Checkbox } from '@/_components/ui'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/_components/ui/dialog/Dialog'
import { colorMap } from '@/_consts'
import { useToast } from '@/_hooks'
import { HouseType } from '@/_types'
import { useUpdateAdmin } from '../hooks'

type MembersManagementModalProps = {
  userId: number
  house: HouseType
  isOpenModal: boolean
  setIsOpenModal: (isOpenModal: boolean) => void
  isOpenAlert: boolean
  setIsOpenAlert: (isOpenAlert: boolean) => void
  removedMemberId: number | null
  setRemovedMemberId: (removedMemberId: number | null) => void
}

const MembersManagementModal = ({
  userId,
  house,
  isOpenModal,
  setIsOpenModal,
  setIsOpenAlert,
  setRemovedMemberId,
}: MembersManagementModalProps) => {
  const { toast } = useToast()
  const { onUpdate, isPending: isUpdating } = useUpdateAdmin()
  const houseId = house.houseId

  const loggedInMember = house.houseMembers.find(
    (member) => member.id === userId,
  )!

  const sortedOtherMembers = house.houseMembers
    .filter((member) => member.id !== userId)
    .sort((a, b) => a.id - b.id) // Sorted by userId to fix the order

  const houseMembers = [loggedInMember, ...sortedOtherMembers]

  const invitedLink =
    process.env.NEXT_PUBLIC_CLIENT_URL + `/register?invitedHouseId=${houseId}`

  const handleUpdateAdmin = (userId: number, isAdmin: boolean) => {
    const data = {
      userId,
      houseId,
      isAdmin,
    }

    onUpdate(data)
  }

  const handleOpenAlert = (userId: number) => {
    setRemovedMemberId(userId)
    setIsOpenModal(false)
    setTimeout(() => {
      setIsOpenAlert(true)
    }, 200)
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={() => setIsOpenModal(false)}>
      <DialogContent
        // To prevent closing modal when clicking toast
        onPointerDownOutside={(e) => {
          if (
            e.target instanceof Element &&
            e.target.closest('[data-radix-toast-announce-exclude]')
          ) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader className='pb-2'>
          <DialogTitle className='text-lg md:text-xl'>
            Members management
          </DialogTitle>
        </DialogHeader>
        <div className='hide-scrollbar flex max-h-96 flex-col overflow-scroll'>
          <div className='flex items-center justify-end gap-12 pb-2 text-sm font-semibold md:text-lg'>
            <span>Role</span>
            <span>Remove</span>
          </div>
          {houseMembers.map((houseMember) => (
            <div
              className='flex border-separate border-spacing-y-1 items-center justify-between border-b border-slate-400 py-2'
              key={houseMember.id}
            >
              <div className='flex items-center gap-2'>
                <MdAccountCircle
                  className={`text-4xl ${colorMap[houseMember.icon.toString()]}`}
                  size={42}
                />
                <span className='md:text-md max-w-28 overflow-auto break-words text-sm md:max-w-40'>
                  {houseMember.name}
                </span>
              </div>
              <div className='flex items-center gap-4 pr-4 md:gap-12'>
                <div className='flex items-center gap-4'>
                  <Checkbox
                    className='h-5 w-5 text-primary'
                    checked={houseMember.isAdmin}
                    disabled={isUpdating || userId === houseMember.id}
                    onClick={() =>
                      handleUpdateAdmin(houseMember.id, !houseMember.isAdmin)
                    }
                  />
                  <span className='text-sm md:text-lg'>admin</span>
                </div>
                <div className='flex items-center justify-center'>
                  <Button
                    variant='destructiveOutline'
                    size='icon'
                    className='flex-shrink-0'
                    disabled={userId === houseMember.id}
                    type='button'
                    aria-label={`Remove roommate ${houseMember.name}`}
                    onClick={() => handleOpenAlert(houseMember.id)}
                  >
                    <FiX size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className='pt-4'>
            <p className='md:text-md pb-4 text-sm font-semibold'>
              Invite Roommate Via Link
            </p>
            <CopyToClipboard
              text={invitedLink}
              onCopy={() => {
                toast({
                  variant: 'success',
                  title: 'Copied to clipboard!',
                })
              }}
            >
              <Button variant={'outline'} size={'sm'}>
                <FiPaperclip size={18} />
                <span className='md:text-md pl-2 text-sm font-semibold'>
                  Copy link
                </span>
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { MembersManagementModal }
