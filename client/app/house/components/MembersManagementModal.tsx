import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FiPaperclip, FiX } from 'react-icons/fi'
import { MdAccountCircle } from 'react-icons/md'
import { Loading } from '@/_components/layout'
import { Button, Checkbox } from '@/_components/ui'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/_components/ui/dialog/Dialog'
import { colorMap } from '@/_consts'
import { useToast } from '@/_hooks'
import { useGetHouseQuery, useGetMeQuery } from '@/_hooks/api'
import { useRemoveMember, useUpdateAdmin } from '../hooks'

type MembersManagementModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const MembersManagementModal = ({
  isOpen,
  setIsOpen,
}: MembersManagementModalProps) => {
  // TODO: Need to prevent closing modal when clicking toast
  const { toast } = useToast()
  const { data: house } = useGetHouseQuery()
  const userId = useGetMeQuery()?.data?.id
  const houseMembers = house?.houseMembers || []
  const houseId = house?.houseId
  const invitedLink =
    process.env.NEXT_PUBLIC_CLIENT_URL + `/register?invitedHouseId=${houseId}`
  const { onUpdate, isPending: isUpdating } = useUpdateAdmin()
  const { onRemove, isPending: isRemoving } = useRemoveMember()

  const handleUpdateAdmin = (userId: number, isAdmin: boolean) => {
    if (!houseId) return
    const data = {
      userId,
      houseId,
      isAdmin,
    }

    onUpdate(data)
  }

  const handleRemoveMember = (userId: number) => {
    if (!houseId) return

    onRemove(userId, houseId)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen)
      }}
    >
      <DialogContent>
        {!house || !userId ? (
          <Loading />
        ) : (
          <>
            <DialogHeader className='pb-2'>
              <DialogTitle className='text-xl'>Members management</DialogTitle>
            </DialogHeader>
            <div className='hide-scrollbar flex max-h-96 flex-col overflow-scroll'>
              <div className='flex items-center justify-end gap-12 pb-2 text-lg font-semibold'>
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
                    <p className='text-md'>{houseMember.name}</p>
                  </div>
                  <div className='flex items-center gap-12 pr-4'>
                    {userId !== houseMember.id && (
                      <>
                        <div className='flex items-center gap-4'>
                          <Checkbox
                            className='h-5 w-5 text-primary'
                            checked={houseMember.isAdmin}
                            disabled={isUpdating}
                            onClick={() =>
                              handleUpdateAdmin(
                                houseMember.id,
                                !houseMember.isAdmin,
                              )
                            }
                          />
                          <span>admin</span>
                        </div>
                        <div className='flex items-center justify-center'>
                          <Button
                            variant='destructiveOutline'
                            size='icon'
                            className='flex-shrink-0'
                            type='button'
                            aria-label={`Remove roommate ${houseMember.name}`}
                            onClick={() => handleRemoveMember(houseMember.id)}
                            isLoading={isRemoving}
                          >
                            <FiX size={18} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div className='pt-4'>
                <p className='pb-4 font-semibold'>Invite Roommate Via Link</p>
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
                    <span className='text-md pl-2 font-semibold'>
                      Copy link
                    </span>
                  </Button>
                </CopyToClipboard>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { MembersManagementModal }