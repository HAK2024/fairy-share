import { useMemo, useState } from 'react'
import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import {
  Calendar,
  View,
  dateFnsLocalizer,
  DateLocalizer,
  Culture,
  DateRange,
  NavigateAction,
} from 'react-big-calendar'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../style/task-calendar.css'
import { Loading } from '@/_components/layout'
import { Button } from '@/_components/ui'
import { colorBgMap } from '@/_consts'
import { TaskDetailsModal } from './TaskDetailsModal'
import { useTaskDetailsModal } from '../hooks'
import { useGetTasksQuery } from '../hooks/api'
import { CustomEventType } from '../types'
import events from 'events'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const TasksCalendar = () => {
  const [date, setDate] = useState(new Date())
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const { data: tasks, isLoading } = useGetTasksQuery(year, month)

  const {
    selectedTask,
    isModalOpen,
    onModalClose,
    onModalOpen,
    handleSelectEvent,
  } = useTaskDetailsModal(tasks)

  const handleNavigate = (newDate: Date) => {
    setDate(newDate)
  }

  const formattedTasks = useMemo(() => {
    return tasks?.map((task) => {
      const event: CustomEventType = {
        allDay: true,
        start: new Date(task.date),
        end: new Date(task.date),
        ...task,
      }

      return event
    })
  }, [tasks])

  const formats = {
    weekdayFormat: (date: Date, culture?: Culture, localizer?: DateLocalizer) =>
      localizer?.format(date, 'E', culture) || '',
    dayFormat: (date: Date, culture?: Culture, localizer?: DateLocalizer) =>
      localizer?.format(date, 'E, d', culture) || '',
    dayHeaderFormat: (
      date: Date,
      culture?: Culture,
      localizer?: DateLocalizer,
    ) => localizer?.format(date, 'E, MMM d', culture) || '',
    dayRangeHeaderFormat: (
      { start, end }: DateRange,
      culture?: Culture,
      localizer?: DateLocalizer,
    ) =>
      `${localizer?.format(start, 'MMM d', culture)} - ${localizer?.format(end, 'MMM d', culture)}`,
  }

  if (isLoading || !tasks) return <Loading />

  return (
    <>
      <div className='task-calendar h-[600px] md:h-[700px]'>
        <Calendar
          localizer={localizer}
          events={formattedTasks}
          date={date}
          onNavigate={handleNavigate}
          formats={formats}
          components={{
            event: CustomEvent,
            toolbar: CustomToolbar,
          }}
          popup={true}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {selectedTask && (
        <TaskDetailsModal
          selectedTask={selectedTask}
          onClose={onModalClose}
          onOpen={onModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  )
}

const CustomEvent = ({ event }: { event: CustomEventType }) => {
  return (
    <div
      className={`${colorBgMap[event.user.icon]} overflow-hidden text-ellipsis rounded hover:opacity-80`}
    >
      {event.title}
    </div>
  )
}

const CustomToolbar = ({
  label,
  onNavigate,
}: {
  label: string
  onNavigate: (navigateAction: NavigateAction) => void
  onView: (view: View) => void
}) => {
  return (
    <div className='relative mb-3 flex items-center justify-between md:justify-center'>
      <h2 className='text-lg font-semibold md:text-2xl'>{label}</h2>
      <div className='right-0 flex gap-2 md:absolute'>
        <Button
          variant={'secondary'}
          size={'sm'}
          className='font-semibold'
          onClick={() => onNavigate('PREV')}
        >
          <FiChevronLeft size={20} />
        </Button>
        <Button
          variant={'secondary'}
          size={'sm'}
          className='font-semibold'
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </Button>
        <Button
          variant={'secondary'}
          size={'sm'}
          className='font-semibold'
          onClick={() => onNavigate('NEXT')}
        >
          <FiChevronRight size={20} />
        </Button>
      </div>
    </div>
  )
}

export { TasksCalendar }
