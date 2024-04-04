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
  Event,
  DateLocalizer,
  Culture,
  DateRange,
} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../style/task-calendar.css'
import { colorBgMap } from '@/_consts'
import { TaskTypeWithUser } from '@/_types'

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

type TasksCalendarProps = {
  tasks: TaskTypeWithUser[]
}

const TasksCalendar = ({ tasks }: TasksCalendarProps) => {
  const [view, setView] = useState<View>('month')
  const [date, setDate] = useState(new Date())

  const handleNavigate = (newDate: Date) => {
    setDate(newDate)
  }

  const handleViewChange = (newView: View) => {
    setView(newView)
  }

  const formattedTasks = useMemo(() => {
    return tasks.map((task) => {
      const event: Event & TaskTypeWithUser = {
        allDay: true,
        start: new Date(task.date),
        end: new Date(task.date),
        ...task,
      }

      return event
    })
  }, [tasks])

  // console.log('formattedTasks:', formattedTasks)

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

  const CustomEvent = ({ event }: { event: Event & TaskTypeWithUser }) => {
    return (
      <div
        className={`${colorBgMap[event.user.icon]} overflow-hidden text-ellipsis rounded`}
      >
        {event.title}
      </div>
    )
  }

  return (
    <div className='task-calendar h-[600px] md:h-[760px]'>
      <Calendar
        localizer={localizer}
        events={formattedTasks}
        views={['month', 'week']}
        toolbar={true}
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        formats={formats}
        components={{
          event: CustomEvent,
        }}
        popup={true}
      />
    </div>
  )
}

export { TasksCalendar }
