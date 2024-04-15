import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { FiEdit, FiX, FiTrash, FiCheckCircle } from 'react-icons/fi'
import { MdAccountCircle } from 'react-icons/md'
import {
  Dialog,
  DialogContent,
  Drawer,
  DrawerContent,
  Button,
  Badge,
} from '@/_components/ui'
import { colorMap } from '@/_consts'
import { useMediaQuery } from '@/_hooks'
import { TaskTypeWithUser } from '@/_types'
import { DeleteTaskModal } from './DeleteTaskModal'

type TaskDetailsModalProps = {
  selectedTask: TaskTypeWithUser
  isModalOpen: boolean
  onClose: () => void
  onOpen: () => void
}

const TaskDetailsModal = ({
  selectedTask,
  isModalOpen,
  onClose,
  onOpen,
}: TaskDetailsModalProps) => {
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const formattedDate = format(selectedTask.date, 'MMM/dd/yyyy')

  const handleDeleteIcon = () => {
    onClose()
    setTimeout(() => setIsDeleteModalOpen(true), 200)
  }

  const closeDeleteModal = (showTaskModal?: boolean) => {
    setIsDeleteModalOpen(false)
    if (showTaskModal) {
      setTimeout(() => onOpen(), 200)
    }
  }

  const contents = (
    <div className='px-7 pb-10 pt-4 md:p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-teal-800'>{formattedDate}</h2>
        <div className='flex gap-3'>
          <Button
            variant={'outline'}
            size={'icon'}
            onClick={() => router.push(`/tasks/${selectedTask.id}/edit`)}
            aria-label={`Visit ${selectedTask.title}'s edit page`}
          >
            <FiEdit size={18} />
          </Button>
          <Button
            variant={'destructiveOutline'}
            size={'icon'}
            onClick={handleDeleteIcon}
            aria-label={`Delete ${selectedTask.title}`}
          >
            <FiTrash size={18} />
          </Button>
        </div>
      </div>

      <div className='mt-4 flex flex-col gap-3'>
        {selectedTask.isCompleted && (
          <Badge className='flex w-min gap-1 pl-2 '>
            <FiCheckCircle className='text-teal-100' />
            Done
          </Badge>
        )}
        <p className='text-xl font-semibold'>{selectedTask.title}</p>
        <div className='-ml-1 flex items-center gap-2'>
          <MdAccountCircle
            className={`flex-shrink-0 text-4xl ${colorMap[selectedTask.user.icon]}`}
            size={32}
          />
          <span className='text-lg'>{selectedTask.user.name}</span>
        </div>

        {selectedTask.note && (
          <div>
            <span className='font-semibold'>Note</span>
            <p>{selectedTask.note}</p>
          </div>
        )}
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <>
        <Dialog open={isModalOpen} onOpenChange={onClose}>
          <DialogContent overlayBgColor={'bg-black/60'}>
            {contents}
          </DialogContent>
        </Dialog>
        <DeleteTaskModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          taskId={selectedTask.id}
        />
      </>
    )
  }
  return (
    <>
      <Drawer open={isModalOpen} onClose={onClose}>
        <DrawerContent onOverlayClick={onClose} overlayBgColor={'bg-black/60'}>
          <div className='relative'>
            {contents}
            <button
              className='absolute -top-3 right-3'
              aria-label='Close Task Details Modal'
              onClick={onClose}
            >
              <FiX size={18} />
            </button>
          </div>
        </DrawerContent>
      </Drawer>

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        taskId={selectedTask.id}
      />
    </>
  )
}

export { TaskDetailsModal }
