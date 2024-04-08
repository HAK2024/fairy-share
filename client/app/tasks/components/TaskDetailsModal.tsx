import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/_components/ui'
import { useMediaQuery } from '@/_hooks'
import { TaskTypeWithUser } from '@/_types'

type TaskDetailsModalProps = {
  selectedTask: TaskTypeWithUser | null
  onClose: () => void
}

const TaskDetailsModal = ({ selectedTask, onClose }: TaskDetailsModalProps) => {
  const isOpenModal = !!selectedTask
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={isOpenModal} onOpenChange={() => onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Date</DialogTitle>
            <DialogDescription>{selectedTask?.title}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer open={isOpenModal} onClose={onClose}>
      <DrawerContent onOverlayClick={onClose}>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Date</DrawerTitle>
          <DrawerDescription>{selectedTask?.title}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className='pt-2'>
          <button onClick={onClose}>x</button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export { TaskDetailsModal }
